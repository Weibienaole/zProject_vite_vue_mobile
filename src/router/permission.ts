import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import { getToken } from '@/utils/storage'
import router from './index'
import { usePermissionStore } from '@/store/permission'
import { useUserStore } from '@/store/user'
import { staticRoutes } from './staticRoutes'
import { deepClone } from '@/utils'
import { asyncRoutes } from './asyncRoutes'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login']

router.beforeEach(async (to, _, next) => {
	NProgress.start()

	document.title = (to?.meta?.title || 'Mobile Project') as string
	// 全局是否允许进行权限验证
	if (import.meta.env.VITE_OPEN_PERMISSION === 'false') {
		// 全部追加
		addRoute(asyncRoutes)
		next()
		return
	}
	const hasToken = getToken()
	const permissionStore = usePermissionStore()
	const userStore = useUserStore()

	if (hasToken) {
		if (to.path === '/login') {
			next({ path: '/' })
		} else {
			const hasRoutes =
				permissionStore.routes && permissionStore.routes.length > 0
			if (hasRoutes) {
				next()
			} else {
				try {
					const authRoutes = await userStore.getPermission()
					addRoute(authRoutes)
					next({ ...to, replace: true })
				} catch (error) {
					await userStore.resetToken()
					next({
						path: '/login',
						query: {
							redirect: to.path,
							...to.query
						}
					})
				}
			}
		}
	} else {
		if (whiteList.indexOf(to.path) !== -1) {
			next()
		} else {
			next({
				path: '/login'
			})
		}
	}
})

// after
router.afterEach(() => {
	NProgress.done()
})

const addRoute = async (authRoutes) => {
	const permissionStore = usePermissionStore()
	const routes = await permissionStore.generateRoutes(authRoutes)
	const completeRoutes = deepClone(staticRoutes)
	const defaultPathIdx = completeRoutes.findIndex((route) => route.path === '/')
	completeRoutes[defaultPathIdx].children.push(...routes)
	completeRoutes.forEach((route) => {
		router.addRoute(route)
	})
}
