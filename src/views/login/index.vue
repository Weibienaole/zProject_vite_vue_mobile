<template>
	<div id="Login_Page_Container">
		login

		<br />
		<br />
		<br />
		<br />
		<div class="login" @click="loginIn">LOGIN</div>
	</div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/user.ts'
import { decodeContent } from '@/utils'
import { onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
const userStore = useUserStore()
const router = useRouter()
const route = useRoute()

const state = reactive({
	redirect: undefined,
	otherQuery: {}
})

onMounted(() => {
	const { query } = route
	if (query) {
		state.redirect = decodeContent(query.redirect)
		state.otherQuery = getOtherQuery(query)
	}
})
const getOtherQuery = (query) => {
	return Object.keys(query).reduce((acc, cur) => {
		if (cur !== 'redirect') {
			acc[cur] = query[cur]
		}
		return acc
	}, {})
}
const loginIn = async () => {
	await userStore.login()

	router.push({ path: state.redirect || '/', query: state.otherQuery })
}
</script>

<style scoped lang="scss">
#Login_Page_Container {
}
</style>
