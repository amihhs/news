'use strict';
const db = uniCloud.database()
const $ = db.command.aggregate
exports.main = async (event, context) => {
	const {
		user_id,
	} = event
	
	let user = await db.collection('user').doc(user_id).get()
	let author_likes_ids = user.data[0].author_likes_ids
	
	let list = await db.collection('user')
	.aggregate()
	.addFields({
		is_like:$.in(['$id', author_likes_ids])
	})
	.match({
		is_like: true
	})
	.end()
	
	//返回数据给客户端
	return {
		code:200,
		msg:'success',
		data: list.data
	}
};
