import $http from '../http.js'

export const get_label = (data) => {
	return $http({
		url: 'get_label',
		data
	})
}

export const get_list = (data) => {
	return $http({
		url: 'get_list',
		data
	})
}

export const updata_likes = (data) => {
	return $http({
		url: 'updata_likes',
		data
	})
}

export const get_search = (data) => {
	return $http({
		url: 'get_search',
		data
	})
}

export const updata_label = (data) => {
	return $http({
		url: 'updata_label',
		data
	})
}

export const get_detail = (data) => {
	return $http({
		url: 'get_detail',
		data
	})
}

export const updata_comment = (data) => {
	return $http({
		url: 'updata_comment',
		data
	})
}

export const get_comment = (data) => {
	return $http({
		url: 'get_comment',
		data
	})
}

export const updata_author = (data) => {
	return $http({
		url: 'updata_author',
		data
	})
}

export const updata_thumbs = (data) => {
	return $http({
		url: 'updata_thumbs',
		data
	})
}

export const get_follow = (data) => {
	return $http({
		url: 'get_follow',
		data
	})
}

export const get_author = (data) => {
	return $http({
		url: 'get_author',
		data
	})
}

export const get_user = (data) => {
	return $http({
		url: 'get_user',
		data
	})
}

export const get_my_article = (data) => {
	return $http({
		url: 'get_my_article',
		data
	})
}

export const updata_feedback = (data) => {
	return $http({
		url: 'updata_feedback',
		data
	})
}