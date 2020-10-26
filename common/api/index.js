// 批量自动导出
const requirApi = require.context(
	// api 的相对路径
	'.',
	// 是否查询子目录
	false,
	// 查询文件的一个后缀
	/.js$/
)
let module = {}
requirApi.keys().forEach((key, index) => {
	if (key === './index.js') return
	// console.log(key)
	Object.assign(module, requirApi(key))
})
// console.log(module)
export default module
