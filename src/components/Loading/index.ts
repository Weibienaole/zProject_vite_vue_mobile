import { createApp, reactive } from 'vue'

import Loading from './loading.vue'
import { ILoadingParams } from '@/types/type'
const state = reactive({
	show: false,
	delayTimer: null
})
const $loading = createApp(Loading, { state }).mount(
	document.createElement('div')
)
const load = {
	show(params: ILoadingParams = {}) {
		if (state.show) return
		const { delay } = params
		if (delay) {
			state.delayTimer = setTimeout(() => {
				state.show = true
				document.body.appendChild($loading.$el)
				clearTimeout(state.delayTimer)
			}, delay)
		} else {
			state.show = true
			document.body.appendChild($loading.$el)
		}
	},

	hide() {
		if (state.delayTimer) {
			clearTimeout(state.delayTimer)
			state.delayTimer = null
		}
		state.show = false
	}
}
export default load
