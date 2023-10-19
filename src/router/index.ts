/*
1. 包含两类路由,一类是基础路由,包含重定向,登录,基准页 / 以及保底404,一类是其余页面路由
2.登录后跳转,利用路由守卫判断是否允许跳转,如果有token且没额外的permission路由,则进行请求获取,并与 基础路由合并生成可用的授权路由,将这些路由依次追加进入当前的路由系统内,如果鉴权失败则重置,重定向login
*/
/*
 * name：外层路由name必填，退出登录的时候要根据 name 清除动态添加的路由信息，内层的 name 用于页面缓存使用
 */

import { createRouter, createWebHashHistory } from 'vue-router'
import { staticRoutes } from './staticRoutes'
import { asyncRoutes } from './asyncRoutes'

const router = createRouter({
	history: createWebHashHistory(),
	routes: staticRoutes
})

// 重置路由
export const resetRouter = () => {
	router.getRoutes().forEach(({ name }) => {
		if (name && asyncRoutes.find((item) => item.name === name)) {
			router.removeRoute(name)
		}
	})
}

export default router
