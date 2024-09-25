<template>
	<div class="page">
		<TheHavigation :is-open="isNavOpen" />
		<div class="page__content">
			<TheHeader v-model="isNavOpen" />
			<main class="page__main">
				<RouterView />
			</main>
		</div>
	</div>
</template>

<script>
import TheHavigation from '@/components/TheHavigation.vue';
import TheHeader from '@/components/TheHeader.vue';

export default {
	name: 'MainLayout',
	components: {
		TheHavigation,
		TheHeader
	},
	data() {
		return {
			isNavOpen: false
		};
	}
};
</script>

<style lang="scss" scoped>
.page {
	display: flex;
	align-items: flex-start;
	height: 100%;
	// .page__content
	&__content {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
	}
	// .page__main
	&__main {
		height: 100%;
		flex: 1 1 auto;
	}
}
</style>
