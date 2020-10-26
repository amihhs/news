'use strict';
const db = uniCloud.database()
const $ = db.command.aggregate
exports.main = async (event, context) => {
	// 通过分类筛选
	const {
		user_id,
		name,
		page,
		pageSize
	} = event
	let matchObjc = {}
	if(name !== '全部'){
		matchObjc = {
			classify:name
		}
	}
	const userInfo = await db.collection('user').doc(user_id).get()
	const article_id_ids = userInfo.data[0].article_likes_ids
	// 聚合操作
	const list = await db.collection('article')
		.aggregate()
		.addFields({
			is_like:$.in(['$_id', article_id_ids])
		})
		.match(matchObjc)
		.project({
			content: false
		})
		// 跳过多少数据
		.skip(pageSize*(page-1))
		.limit(pageSize)
		.end()
	//返回数据给客户端
	return {
		code: 200,
		msg: '请求成功',
		data: list.data
	}
};
