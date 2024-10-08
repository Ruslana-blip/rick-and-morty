<template>
	<header class="header">
		<button
			type="button"
			class="header__burger"
			@click="$emit('on-toggle')"
			v-if="isLoggedIn"
		>
			<MenuIcon />
		</button>
		<h2 class="header__title">
			<img
				src="@/assets/images/rick.png"
				alt="Rick"
				title="Rick"
				class="header__image"
			/>
			{{ this.$route.path.slice(1) || title }}
			<img
				src="@/assets/images/morty.png"
				alt="Morty"
				title="Morty"
				class="header__image"
			/>
		</h2>
		<div
			class="header__no-user"
			v-if="!isLoggedIn"
			@click="logOut"
		>
			<Login />
		</div>
		<div
			class="header__user"
			v-else
		>
			<AccountBox />
		</div>
	</header>
</template>

<script>
import MenuIcon from 'vue-material-design-icons/Menu.vue';
import Login from 'vue-material-design-icons/Login.vue';
import AccountBox from 'vue-material-design-icons/AccountBox.vue';
import { useAuthStore } from '@/store/authStore';
import { mapActions, mapState } from 'pinia';

export default {
	name: 'TheHeader',
	components: {
		MenuIcon,
		Login,
		AccountBox
	},
	data() {
		return {
			title: ' The Rick and Morty API'
		};
	},
	emits: ['on-toggle'],
	computed: {
		...mapState(useAuthStore, ['isLoggedIn'])
	},
	methods: {
		...mapActions(useAuthStore, ['logOut'])
	}
};
</script>

<style lang="scss" scoped>
.header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: $bg-light;
	padding: 4px 16px;
	height: 64px;
	width: 100%;
	box-shadow:
		0 2px 4px -1px hsla(0, 0%, 0%, 0.2),
		0 4px 5px 0 hsla(0, 0%, 0%, 0.14),
		0 1px 10px 0 hsla(0, 0%, 0%, 0.12);
	// .header__burger
	&__burger {
		border: none;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		@include hover {
			background-color: $light-grey;
		}
	}
	// .header__title
	&__title {
		font-size: font-rem(20);
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 8px;
	}
	// .header__image
	&__image {
		width: 48px;
		height: 48px;
	}
	// .header__user
	&__user {
		width: 36px;
		height: 36px;
		border-radius: 50%;
		background-color: $light-grey;
		display: flex;
		justify-content: center;
		align-items: center;
	}
}
</style>
