


export const parseTime = (time) => {
	const format = '{y}-{m}-{d} {h}:{m}:{s}'
	if(typeof time === 'string'){
		time = parseInt(time)
	}
	let date = null
	date = new Date(time)
	const formatObj = {
		y: date.getFullYear(),
		m: date.getMonth() + 1,
		d: date.getDate(),
		h: date.getHours(),
		i: date.getMinutes(),
		s: date.getSeconds()
	}
	const strTime = format.replace(/{(y|m|d|h|i|s)+}/g,(result, key) => {
		let val = formatObj[key]
		if(result.length > 0 && val < 10){
			val = '0' + val
		}
		return val
	})
	return strTime
}