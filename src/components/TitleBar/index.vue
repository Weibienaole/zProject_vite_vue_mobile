<template>
	<teleport to="#Layout_Container #headerBar" :disabled="false">
		<div class="TitleBar_Component_Container">
			<slot v-if="slots.arrow" name="arrow"></slot>
			<div v-else>
				<svg-icon
					v-if="isValid(props.hasArrow, true)"
					name="arrowLeft"
					class="arrow"
					@click="handleClickArrow"
				/>
			</div>
			<div class="title">
				<slot v-if="slots.title" name="title"></slot>
				<template v-else>{{ isValid(props.title, topBarTitle) }}</template>
			</div>
			<div class="right">
				<slot v-if="slots.right" name="right"></slot>
				<template v-else>right</template>
			</div>
		</div>
	</teleport>
</template>

<script setup lang="ts">
/**
 * @param {String} title - 默认值为 路由表 meta.title
 * @param {Boolean} hasArrow - 是否显示arrow（slot不受影响）
 *
 * @emit arrow 点击arrow出发
 *
 * @slot arrow,title,right
 *
 * @description 默认悬挂Layout组件，需要不固定设置 Teleport组件 disabled 为 true，然后处理css即可
 */
import { computed, useSlots } from 'vue'
import { useRoute } from 'vue-router'

interface IProps {
	title?: string
	hasArrow?: any // 避免默认 false
}

const props = defineProps<IProps>()
const emits = defineEmits(['arrow'])
const route = useRoute()
const slots = useSlots()

const topBarTitle = computed(() => (route.meta.title as string) || '')

const isValid = (val, falseVal) => (val !== undefined ? val : falseVal)

const handleClickArrow = () => {
	emits('arrow')
}
</script>

<style scoped lang="scss">
.TitleBar_Component_Container {
	width: 100vw;
	height: 2.8rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
	position: relative;
	.arrow {
		padding-left: 0.8rem;
	}
	.title {
		font-size: 1.3rem;
		font-weight: 500;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}
	.right {
		padding-right: 1rem;
	}
}
</style>
