import { asyncRoutes } from '@/router/asyncRoutes'
import { staticRoutes } from '@/router/staticRoutes'
import { IRoutes } from '@/types/type'
import { deepClone } from '@/utils'
import { defineStore } from 'pinia'

export const usePermissionStore = defineStore('permission', {
	state: () => {
		return {
			routes: []
		}
	},
	actions: {
		/**
		 * @method generateRoutes 生成路由
		 */
		generateRoutes(routes): Promise<IRoutes> {
			return new Promise((resolve) => {
				const accessedRoutes = filterAsyncRoutes(deepClone(asyncRoutes), routes)
				const notEmptyRoutes = filterEmptyRoutes(accessedRoutes)
				const concatRoutes = [...accessedRoutes, ...staticRoutes]
				this.routes = notEmptyRoutes
				resolve(concatRoutes)
			})
		}
	}
})

// asyncRoutes, routes
const filterAsyncRoutes = (asyncRoutes, routes) => {
	// 将本地路由表和权限表对比返回可用路由
	console.log(routes)

	return asyncRoutes
}

export const filterEmptyRoutes = (routes) => {
	return routes.filter((route) => {
		if (route.children?.length > 0) {
			route.children = filterEmptyRoutes(route.children)
			return true
		} else if (route.component) {
			return true
		} else return false
	})
}
