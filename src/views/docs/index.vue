<template>
	<div id="pageContainer">
		docs
		<div @click="go('/docs/docsChild/docsChild1')">go child1</div>
	</div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const go = (path) => {
	router.push(path)
}
</script>

<style scoped lang="scss">
#pageContainer {
}
</style>
