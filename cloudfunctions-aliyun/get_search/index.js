'use strict';
const db = uniCloud.database()
const $ = db.command.aggregate
exports.main = async (event, context) => {
	// 通过分类筛选
	const {
		user_id,
		value,
	} = event
	
	console.log(user_id)
	const userInfo = await db.collection('user').doc(user_id).get()
	const article_id_ids = userInfo.data[0].article_likes_ids
	// 聚合操作
	const list = await db.collection('article')
		.aggregate()
		.addFields({
			is_like:$.in(['$_id', article_id_ids])
		})
		.project({
			content: false
		})
		.match({
			title: new RegExp(value)
		})
		.end()
	//返回数据给客户端
	return {
		code: 200,
		msg: '请求成功',
		data: list.data
	}
};
