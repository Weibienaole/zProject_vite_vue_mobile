<template>
	<div id="pageContainer">
		add details

		<br />
		<div @click="add">add</div>
		<br />
		<div>{{ num }}</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, reactive, toRefs } from 'vue'
import * as api from '@/api/core'

onMounted(() => {
	api.testReq({}).then(console.log)
})

const state = reactive({
	num: 1
})
const add = () => {
	state.num++
}
const { num } = toRefs(state)
</script>

<style scoped lang="scss">
#pageContainer {
}
</style>
