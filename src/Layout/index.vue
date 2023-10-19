<template>
	<div id="Layout_Container">
		<div id="headerBar">
			<!-- header bar 预留位置 -->
		</div>
		<div class="flexContainer">
			<transition name="fade-transform" mode="out-in">
				<slot></slot>
			</transition>
		</div>
	</div>
</template>

<script setup lang="ts">
//import * as api from '@/api/core'

//onMounted(() => {
//	api.testReq({}).then(console.log)
//	setTimeout(() => {
//		api.testReq({}).then(console.log)
//	}, 3000)
//})
</script>

<style scoped lang="scss">
#Layout_Container {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	.flexContainer {
		flex: 1;
		width: 100%;
		background-color: #ffffff;
		overflow-y: auto;
		padding-bottom: env(safe-area-inset-bottom);
	}
}
</style>
