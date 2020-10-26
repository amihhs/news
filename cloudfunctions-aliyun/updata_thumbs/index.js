//* 点赞文章 */

'use strict';
const db = uniCloud.database()
const dbCmd = db.command
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const {
		user_id,
		article_id
	} = event

	let user = await db.collection('user').doc(user_id).get()
	let thumbs_up_article_ids = user.data[0].thumbs_up_article_ids

	let thumbs_ids = null
	if (thumbs_up_article_ids.includes(article_id)) {
		thumbs_ids = dbCmd.pull(article_id)
	} else {
		thumbs_ids = dbCmd.addToSet(article_id)
	}

	await db.collection('user').doc(user_id).update({
		thumbs_up_article_ids: thumbs_ids
	})

	//返回数据给客户端
	return {
		code: 200,
		msg: 'success'
	}
};
