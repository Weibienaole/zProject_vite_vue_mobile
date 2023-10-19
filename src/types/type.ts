import { InjectionKey, Ref } from 'vue'
import { RouteRecordRaw } from 'vue-router'

export interface IRoute {
	path: string
	redirect?: string
	name?: string
	hidden?: boolean
	component?: () => Promise<any>
	meta?: {
		title?: string
		icon?: any
		layout?: boolean // 是否显示layout 默认 true
	}
	children?: IRoutes
}

export type IRoutes = RouteRecordRaw[] & IRoute[]

export interface ILoadingParams {
	delay?: number
}
