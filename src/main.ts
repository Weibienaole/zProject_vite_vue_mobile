import { createApp } from 'vue'
import { createPinia } from 'pinia'

import 'virtual:svg-icons-register'

import './style.scss'

import 'normalize.css'

import App from '@/App.vue'
// router
import router from './router/index'
// 路由守卫
import './router/permission'
// store
const store = createPinia()
// 事件国际化-中文
import 'dayjs/locale/zh-cn'
import SvgIcon from '@/components/SvgIcon/index.vue'

// 引入css
import 'vant/lib/index.css'

//title bar
import TitleBar from '@/components/TitleBar/index.vue'

const app = createApp(App)

app
	.component('SvgIcon', SvgIcon)
	.component('TitleBar', TitleBar)
	.use(router)
	.use(store)
	.mount('#app')
