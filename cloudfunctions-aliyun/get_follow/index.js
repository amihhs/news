'use strict';
const db = uniCloud.database()
const $ = db.command.aggregate

exports.main = async (event, context) => {
	const {user_id} = event
	
	let user = await db.collection('user').doc(user_id).get()
	let article_likes_ids = user.data[0].article_likes_ids
	
	let list = await db.collection('article')
	.aggregate()
	.addFields({
		is_like: $.in(['$_id', article_likes_ids])
	})
	.project({
		content:0
	})
	.match({
		is_like:true
	})
	.end()
	
	
	//返回数据给客户端
	return {
		code:200,
		msg:'success',
		data: list.data
	}
};
