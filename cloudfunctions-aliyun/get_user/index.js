'use strict';
const db = uniCloud.database()

exports.main = async (event, context) => {
	const {
		user_id = ''
	} = event
	if(!user_id){
		return {
			code:201,
			msg:'fail'
		}
	}
	let user =await db.collection('user').doc(user_id).get()
	
	//返回数据给客户端
	return {
		code:200,
		msg:'success',
		data: user.data[0]
	}
};
