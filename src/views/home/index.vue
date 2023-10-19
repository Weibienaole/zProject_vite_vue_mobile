<template>
	<div id="Home_Page_Container">
		<TitleBar :has-arrow="true" @arrow="handleArrow">
			<!--<template #arrow> 123123 </template>-->
			<template #title> titleeeee </template>
			<template #right> rrrr </template>
		</TitleBar>
		container
		<van-button type="primary">asas</van-button>
		<br />
		<div @click="goRoute('/docs/docsIndex')">go docs</div>
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />s
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		asd
	</div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const goRoute = (path) => {
	router.push({
		path: path
	})
}

const handleArrow = () => {}
</script>

<style scoped lang="scss">
#Home_Page_Container {
}
</style>
