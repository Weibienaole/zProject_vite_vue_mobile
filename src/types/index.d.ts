/* eslint-disable no-unused-vars */
/// <reference types="vite/client" />
import 'vue-router'
import { ILoadingParams } from './type'

declare module '*.vue' {
	declare module '*.vue' {
		import { DefineComponent } from 'vue'
		// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
		const component: DefineComponent<{}, {}, any>
		export default component
	}
}

// 录入路由原信息（额外参数）
declare module 'vue-router' {
	interface RouteMeta {
		// 是可选的
		isAdmin?: boolean
	}
}

// 环境变量 TypeScript的智能提示
interface ImportMetaEnv {
	VITE_BASE_URL: string
	VITE_REQ_BASE_URL: string
	VITE_REQ_DOMAIN: string
	VITE_REQ_TIMEOUT: number
	VITE_PX_TO_REM: number
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}

declare module 'vue-router' {
	import { _RouteRecordBase } from 'vue-router'
	interface _RouteRecordBase {
		hidden?: boolean
	}
}

declare module 'axios' {
	export interface AxiosRequestConfig {
		noLoad?: boolean
	}
}

declare module 'vue' {
	interface ComponentCustomProperties {
		LOADING?: {
			open?: (props?: ILoadingParams) => void
			close?: () => void
		}
	}
}
