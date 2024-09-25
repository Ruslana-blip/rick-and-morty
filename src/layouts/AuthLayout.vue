<template>
	<div class="auth">
		<RouterLink :to="{ name: 'HomePage' }">
			<div class="auth__header">
				<Home class="auth__icon" />
				<span>HOME</span>
			</div>
		</RouterLink>
		<div class="auth__main">
			<h1 class="auth__title">{{ title }}</h1>
			<div class="auth__content">
				<RouterView />
			</div>
		</div>
	</div>
</template>

<script>
import Home from 'vue-material-design-icons/Home.vue';
export default {
	name: 'AuthLayout',
	components: {
		Home
	},
	computed: {
		title() {
			return this.$route.path.includes('login') ? 'Log in' : 'Registration';
		}
	}
};
</script>

<style lang="scss" scoped>
.auth {
	font-size: font-rem(20);
	background-color: $dark-blue;
	padding: 20px;
	height: 100vh;
	width: 100vw;
	display: flex;
	flex-direction: column;
	justify-content: center;

	&__icon {
		display: block;
		margin-left: 10px;
	}
	// .auth__header
	&__header {
		font-size: font-rem(14);
		display: flex;
		margin-left: 10px;
		flex-basis: 5%;
	}
	// .auth__main
	&__main {
		flex-basis: 95%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}
	// .auth__title
	&__title {
		font-weight: 500;
	}
	// .auth__content
	&__content {
		margin-top: 16px;
		min-width: 450px;
		background-color: $bg-light;
		border-radius: 5px;
		box-shadow: 0 0 2px 0 $bg-card;
		padding: 20px;
	}
}
</style>
