<template>
	<div v-if="props.show" class="Loading_Component_Container">
		<van-loading color="#1989fa" size="40" />
	</div>
</template>

<script setup lang="ts">
const props = defineProps<{ show?: boolean; delayTimer?: any }>()
</script>

<style scoped lang="scss">
.Loading_Component_Container {
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.3);
	z-index: 1000;
	overflow: hidden;
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
