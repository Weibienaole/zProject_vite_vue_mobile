import axios from 'axios'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import { closeToast, showFailToast, showLoadingToast, showToast } from 'vant/es'

import { getToken } from '../utils/storage'
import { useUserStore } from '@/store/user'

interface otherAxiosConfig extends AxiosRequestConfig {
	noLoad?: boolean
}

/**
 * 额外参数
 * @param {Boolean} noLoad 是否不显示loading，默认显示
 */

let delayTimer

const request = axios.create({
	// API 请求的默认前缀
	baseURL: `https://${import.meta.env.VITE_REQ_BASE_URL}.${
		import.meta.env.VITE_REQ_DOMAIN
	}.com`,
	timeout: import.meta.env.VITE_REQ_TIMEOUT, // 请求超时时间
	method: 'POST'
})

const requestInterceptor = (config: otherAxiosConfig): any => {
	if (!config.noLoad) {
		delayTimer = setTimeout(() => {
			showLoadingToast({
				message: '加载中...',
				overlay: true,
				forbidClick: true,
				duration: import.meta.env.VITE_REQ_TIMEOUT
			})
			clearTimeout(delayTimer)
		}, 300)
	}
	const path = window.location.hash.slice(1)
	const purePath = path.split('?')[0] || '/home'
	const token = getToken()
	if (token) {
		config.headers.Accept = 'application/json'
		config.headers.Authorization = token
		config.headers.pagePath = purePath
	}
	return config
}

const errorHandler = (error) => {
	if (error.response) {
		const { result_code, result_status, result_msg } = error.response.data
		if ([1].includes(result_code)) {
			// token  无效/过期/为空
			if (!window.location.hash.startsWith('#/login')) {
				closeLoad({ cbText: 'token过期，请重新登录！' })

				const userStore = useUserStore()
				userStore.logout()
			}
		} else if (result_code === 100011 && result_status === 'NO_PAGE_AUTHS') {
			//403
			window.location.replace('#/error?t=403')
		} else {
			closeLoad({
				cbText: `请求错误,${result_msg} 错误码:${result_code}`
			})
		}
	} else {
		closeLoad({ cbText: '请求出错，请稍后重试！' })
	}
	return Promise.reject(error)
}

// 请求拦截
request.interceptors.request.use(requestInterceptor, errorHandler)
// 响应拦截
request.interceptors.response.use((response: AxiosResponse) => {
	// 内部code为200为通过，否则其余都是错误code
	if (response.data.result_code && response.data.result_code !== 0) {
		errorHandler({ response })
		return Promise.reject(response.data.msg)
	}
	if (response.config.responseType === 'blob') {
		return response.data
	} else return response.data.data
}, errorHandler)

// 文件请求 下载
const fileRequest = axios.create({
	// API 请求的默认前缀
	baseURL: `https://${import.meta.env.VITE_REQ_BASE_URL}.${
		import.meta.env.VITE_REQ_DOMAIN
	}.com`,
	timeout: 30000 // 请求超时时间
})

// 请求拦截
fileRequest.interceptors.request.use(requestInterceptor, errorHandler)
// 响应拦截
fileRequest.interceptors.response.use((response: AxiosResponse) => {
	// 内部code为200为通过，否则其余都是错误code
	if (response.status !== 200) {
		errorHandler({ response })
		return Promise.reject(response.data.msg)
	}
	return response.data
}, errorHandler)

export { request, fileRequest }

const closeLoad = ({ closeAll = false, cbText }) => {
	if (delayTimer) {
		clearTimeout(delayTimer)
		delayTimer = null
	}
	closeToast(closeAll)
	if (cbText) {
		showFailToast({
			message: cbText,
			iconSize: '3em'
		})
	}
}
