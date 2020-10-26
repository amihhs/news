'use strict';
const db = uniCloud.database()
const $ = db.command.aggregate
const dbCmd = db.command
exports.main = async (event, context) => {
	// 通过分类筛选
	const {
		user_id,
	} = event

	let user = await db.collection('user').doc(user_id).get()
	user = user.data[0]
	// 聚合操作
	const list = await db.collection('article')
		.aggregate()
		.addFields({
			is_like:$.in(['$_id', user.article_likes_ids])
		})
		.project({
			content:0
		})
		.match({
			id:dbCmd.in(user.article_ids)
		})
		.end()
	//返回数据给客户端
	return {
		code: 200,
		msg: '请求成功',
		data: list.data
	}
};
