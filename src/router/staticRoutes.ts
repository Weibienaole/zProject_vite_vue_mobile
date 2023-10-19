import { IRoutes } from '@/types/type'

export const staticRoutes: IRoutes = [
	{
		path: '/redirect',
		hidden: true,
		children: [
			{
				path: '/redirect/:path(.*)',
				component: () => import('@/views/redirect/index.vue')
			}
		]
	},
	{
		path: '/login',
		component: () => import('@/views/login/index.vue'),
		hidden: true,
		meta: {
			layout: false
		}
	},
	{
		path: '/',
		name: 'Core',
		redirect: '/home',
		children: [
			{
				path: '/home',
				name: 'Home',
				hidden: true,
				component: () => import('@/views/home/index.vue'),
				meta: {
					title: '首页',
					affix: true
				}
			}
		]
	},
	// 此写法解决动态路由页面刷新的 warning 警告
	{
		path: '/:pathMatch(.*)*',
		component: () => import('@/views/errorPage/404.vue'),
		hidden: true,
		meta: {
			layout: false
		}
	}
]
