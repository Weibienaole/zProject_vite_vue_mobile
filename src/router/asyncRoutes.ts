import { IRoutes } from '@/types/type'

export const asyncRoutes: IRoutes = [
	{
		path: '/docs',
		name: 'Docs',
		meta: {
			title: 'DocsT'
		},
		children: [
			{
				path: 'docsIndex',
				name: 'DocsIndex',
				component: () => import('@/views/docs/index.vue'),
				meta: {
					title: 'docs index'
				}
			},
			{
				path: 'docsChild',
				name: 'DocsChild',
				meta: {
					title: 'DocsChild'
				},
				children: [
					{
						path: 'docsChild1',
						name: 'DocsChild1',
						component: () => import('@/views/docs/child/index.vue'),
						meta: {
							title: 'docs child index'
						}
					},
					{
						path: '/otherChild',
						name: 'OtherChild',
						meta: {
							title: 'OtherChild'
						},
						children: [
							{
								path: '/docsChild2',
								name: 'DocsChild2',
								component: () => import('@/views/docs/child/child2.vue'),
								meta: {
									title: 'docs child2 index'
								}
							},
							{
								path: '/docsChild3',
								name: 'DocsChild3',
								component: () => import('@/views/docs/child/child3.vue'),
								meta: {
									title: 'docs child3 index'
								}
							},
							{
								path: '/docsChild4',
								name: 'DocsChild4',
								component: () => import('@/views/docs/child/child4.vue'),
								meta: {
									title: 'docs child4 index'
								}
							}
						]
					}
				]
			}
		]
	},
	{
		path: '/add',
		name: 'Add',
		meta: {
			title: 'addd'
		},
		children: [
			{
				path: '/addIndex',
				name: 'AddIndex',
				component: () => import('@/views/add/index.vue'),
				meta: {
					title: 'add index',
					icon: 'https://pic2.zhimg.com/v2-53ef093fe6f4c1c103794e66a31cba91_b.jpg'
				}
			},
			{
				path: '/addDetail',
				name: 'AddDetail',
				component: () => import('@/views/add/detail.vue'),
				meta: {
					title: 'add detail'
				}
			}
		]
	},
	{
		path: '/concatUSa',
		name: 'ConcatUSa',
		component: () => import('@/views/concatUs/index.vue'),
		meta: {
			title: '联系我啊啊啊啊'
		},
		hidden: true
	}
]
