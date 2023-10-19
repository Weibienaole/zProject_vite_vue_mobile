<template>
	<router-view v-slot="{ Component }">
		<Layout>
			<keep-alive :max="6">
				<van-config-provider theme="light">
					<component :is="Component" />
				</van-config-provider>
			</keep-alive>
		</Layout>
	</router-view>
</template>

<script setup lang="ts">
import Layout from '@/Layout/index.vue'
</script>

<style scoped lang="scss"></style>
