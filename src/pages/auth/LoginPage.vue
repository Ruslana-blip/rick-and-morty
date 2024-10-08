<template>
	<Form
		class="form"
		@submit="logIn"
	>
		<div class="form__field">
			<label
				for="email"
				class="form__label"
			>
				Email
			</label>
			<Field
				:rules="validateEmail"
				id="email"
				class="form__input"
				type="email"
				name="email"
				placeholder="Email"
			/>
			<ErrorMessage
				name="email"
				class="form__error"
			/>
		</div>
		<div class="form__field">
			<label
				for="password"
				class="form__label"
			>
				Password
			</label>
			<Field
				:rules="validatePassword"
				id="password"
				class="form__input"
				type="password"
				name="password"
				placeholder="Password"
			/>
			<ErrorMessage
				name="password"
				class="form__error"
			/>
		</div>
		<div class="form__actions">
			<RouterLink
				:to="{ name: 'RegistrationPage' }"
				class="form__link"
			>
				Create account
			</RouterLink>
			<button
				type="submit"
				class="form__button"
			>
				Log in
			</button>
		</div>
	</Form>
</template>

<script>
import { Form, Field, ErrorMessage } from 'vee-validate';

import { useAuthStore } from '@/store/authStore';
import { mapState, mapActions } from 'pinia';
export default {
	name: 'LoginPage',
	components: {
		Form,
		Field,
		ErrorMessage
	},
	computed: {
		...mapState(useAuthStore, ['user']),
		isData() {
			return Boolean(localStorage.getItem('user'));
		}
	},
	methods: {
		...mapActions(useAuthStore, ['logIn']),
		validateEmail(email) {
			if (!email) return 'This field is required.';
			const validEmailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
			if (!validEmailRegex.test(email)) {
				return 'This field must be a valid email address.';
			}
			return true;
		},
		validatePassword(password) {
			if (!password) return 'This field is required.';
			if (password.length < 8) return 'Password must be at least 8 characters.';
			return true;
		}
	}
};
</script>

<style lang="scss" scoped>
.form {
	// .form__field
	&__field {
		&:not(:last-child) {
			margin-bottom: 20px;
		}
	}
	// .form__label
	&__label {
		display: flex;
		margin-bottom: 4px;
		font-size: font-rem(16);
	}
	// .form__input
	&__input {
		width: 100%;
		height: 56px;
		padding-left: 12px;
		font-size: font-rem(14);
		margin-bottom: 8px;
		border: 1px solid #ccc;
		border-radius: 4px;
		outline: none;
		transition: border-color 0.3s ease;

		&:focus {
			border-color: #007bff;
		}
	}
	// .form__error
	&__error {
		font-size: font-rem(12);
		color: red;
		margin-top: -4px;
		margin-bottom: 8px;
	}
	// .form__actions
	&__actions {
		display: flex;
		justify-content: space-between;
		margin-top: 20px;
	}
	// .form__link
	&__link {
		color: $orange;
		cursor: pointer;
		align-self: center;
		font-size: font-rem(12);
		margin-left: 20px;
	}
	// .form__button
	&__button {
		padding: 8px 40px;
		background-color: $bg-dark;
		color: white;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		font-size: font-rem(16);
		transition: background-color 0.3s ease;
		&:hover {
			background-color: $orange;
		}
	}
}
</style>
