import { defineStore } from 'pinia'
import { resetRouter } from '@/router'
import { asyncRoutes } from '@/router/asyncRoutes'
import {
	getCookies,
	getToken,
	removeCookies,
	removeToken,
	setCookies,
	setToken
} from '@/utils/storage'

export const useUserStore = defineStore('user', {
	state: () => {
		return {
			token: getToken(),
			userInfo: getCookies('userInfo', {})
		}
	},
	getters: {},
	actions: {
		async login() {
			return new Promise((resolve) => {
				// login api
				const token = 'testToken'
				const info = { id: '123', face: 'aaa' }
				this.token = token
				this.userInfo = info
				setToken(token)
				setCookies('userInfo', info)
				resolve({})
			})
		},
		getPermission() {
			return new Promise((resolve) => {
				// get permission api
				const routes = asyncRoutes
				resolve(routes)
			})
		},
		logout() {
			this.token = ''
			this.userInfo = {}
			removeCookies('userInfo', 'token')
			resetRouter()
			window.location.reload()
		},
		resetToken() {
			return new Promise((resolve) => {
				this.token = ''
				removeToken()
				resolve(true)
			})
		}
	}
})
