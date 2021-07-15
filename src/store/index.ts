import { createStore } from 'vuex'
import ajax from '@/utils/ajax'
import Vrouter from "@/router"


export default createStore({
	state: {
		userId: sessionStorage.getItem('userId'),
		username: sessionStorage.getItem('username'),
		collapse: false
	},
	mutations: {
		setUid(state, user) {
			console.log(user);
			state.userId = user.userId;
		},
		setUserName(state, user) {
			state.username = user.username
		},
		// 侧边栏折叠
		handleCollapse(state, data) {
			state.collapse = data;
		}
	},
	actions: {
		toLogin({ dispatch, commit }, user) {
			return new Promise((resolve, reject) => {
				ajax('/api/user/tologin', user, 'POST').then((result: any) => {
					if (result.data.code === 200) {
						dispatch('getUserInfo').then(() => {
							// 登录后跳转首页
							const router = Vrouter;
							router.push('/home/shop');
						})
						commit('setUid', result.data)
						resolve(result)
					} else {
						reject(result.message);
					}

				})
			})
		},
		getUserInfo({ commit }) {
			return new Promise<void>((resolve, reject) => {
				ajax('/api/user/getUser', '', 'GET').then((result: any) => {
					if (result.data.code === 200) {
						sessionStorage.setItem('userId', result.data.data.userId);
						sessionStorage.setItem('userName', result.data.data.userName);
						// commit('setUid',result.data.data.userId);
						// commit('setUserName',result.data.data.userName);
						resolve();
					} else {
						reject(result.message);
					}
				})
			})
		}
	},
	modules: {
	}
})
