'use strict';
const db = uniCloud.database()
const $ = db.command.aggregate
const dbCmd = db.command
exports.main = async (event, context) => {
	const {
		user_id,
		article_id,
		content,
		comment_id = '',
		reply_id = '',
		is_reply = false,
	} = event

	// 获取用户对象
	let user = await db.collection('user').doc(user_id).get()
	user = user.data[0]

	// 获取文张
	let article = await db.collection('article').doc(article_id).get()
	// 获取评论
	let comments = article.data[0].comments

	let commentObj = {
		comment_id: genID(5),
		comment_content: content,
		create_time: new Date().getTime(),
		is_reply: is_reply, //是否子回复
		author: {
			author_id: user_id,
			author_name: user.author_name,
			avatar: user.avatar,
			professional: user.professional
		},
		replys: []
	}
	// 评论文章
	if (comment_id === '') {
		commentObj.replys = []
		commentObj = dbCmd.unshift(commentObj)
	} else {
		// 评论评论
		let commentIndex = comments.findIndex(item => item.comment_id === comment_id)
		// 获取作者信息
		let commentAuthor = ''
		

		if (is_reply) {
			// 子回复
			commentAuthor = comments[commentIndex].replys.find(item => item.comment_id === reply_id)
		} else {
			// 主回复
			commentAuthor = comments.find(item => item.comment_id === comment_id)
		}
		commentAuthor = commentAuthor.author.author_name
		commentObj.to = commentAuthor
		// 更新回复信息
		commentObj = {
			[commentIndex]: {
				replys: dbCmd.unshift(commentObj)
			}
		}
	}
	await db.collection('article').doc(article_id).update({
		comments: commentObj
	})
	//返回数据给客户端
	return {
		code: 200,
		msg: 'success',
	}
};

function genID(length) {
	return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36)
}
