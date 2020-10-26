import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		userInfo:uni.getStorageSync("_userInfo") || {},
		historys: uni.getStorageSync("_history") || []
	},
	mutations: {
		SET_HISTORY(state, history){
			state.historys = history
		},
		CLEAR_HISTORY(state){
			state.historys = []
		},
		SET_SUER_INFO(state, userInfo){
			state.userInfo = userInfo
		}
	},
	actions: {
		set_history({commit,state}, history){
			let list = state.historys
			list.unshift(history)
			uni.setStorageSync('_history', list)
			commit('SET_HISTORY', list)
		},
		clear_history({commit}){
			uni.setStorageSync('_history', [])
			commit('CLEAR_HISTORY')
		},
		set_user_info({commit}, userInfo){
			uni.setStorageSync('_userInfo', userInfo)
			commit('SET_SUER_INFO', userInfo)
		}
	}
})
export default store