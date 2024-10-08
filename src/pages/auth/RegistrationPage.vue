<template>
	<Form
		class="form"
		@submit="register"
	>
		<div class="form__field">
			<label
				for="first__name"
				class="form__label"
			>
				First name
			</label>
			<Field
				:rules="validateName"
				id="first__name"
				class="form__input"
				type="name"
				name="first_name"
				placeholder="First name"
				value="Ruslana"
			/>
			<ErrorMessage
				name="first_name"
				class="form__error"
			/>
		</div>
		<div class="form__field">
			<label
				for="last__name"
				class="form__label"
			>
				Last name
			</label>
			<Field
				:rules="validateName"
				id="last__name"
				class="form__input"
				type="name"
				name="last_name"
				placeholder="Last name"
				value="Lauta"
			/>
			<ErrorMessage
				name="last_name"
				class="form__error"
			/>
		</div>
		<div class="form__field">
			<label
				for="number"
				class="form__label"
			>
				Phone number
			</label>
			<Field
				:rules="validatePhone"
				id="number"
				class="form__input"
				type="tel"
				name="number"
				value="+380686463672"
				placeholder=" Phone number"
			/>
			<ErrorMessage
				name="number"
				class="form__error"
			/>
		</div>
		<div class="form__field">
			<label
				for="birth"
				class="form__label"
			>
				Birth date
			</label>
			<Field
				:rules="validateBirth"
				id="birth"
				class="form__input"
				type="date"
				name="birth__date"
				placeholder="Birth date"
			/>
			<ErrorMessage
				name="birth__date"
				class="form__error"
			/>
		</div>
		<div class="form__field form__email">
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
				value="test@gmail.com"
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
				v-model="password"
			/>
			<ErrorMessage
				name="password"
				class="form__error"
			/>
		</div>
		<div class="form__field">
			<label
				for="confirm_password"
				class="form__label"
			>
				Confirm password
			</label>
			<Field
				:rules="validateConfirmPassword"
				id="confirm_password"
				class="form__input"
				type="password"
				name="passwordConfirm"
				placeholder="Confirm password"
				value="123123123"
				v-model="confirmPassword"
			/>
			<ErrorMessage
				name="passwordConfirm"
				class="form__error"
			/>
		</div>
		<div class="form__actions">
			<div class="form__link">Have account?</div>

			<button
				type="submit"
				class="form__button"
			>
				Submit
			</button>
		</div>
	</Form>
</template>

<script>
import { Form, Field, ErrorMessage } from 'vee-validate';

import { useAuthStore } from '@/store/authStore';
import { mapActions } from 'pinia';
export default {
	name: 'RegistrationPage',

	components: {
		Form,
		Field,
		ErrorMessage
	},
	data() {
		return {
			password: '',
			confirmPassword: ''
		};
	},
	methods: {
		...mapActions(useAuthStore, ['register']),
		validateName(name) {
			if (!name) return 'This field is required.';
			const validRegexName = /^[A-Za-zА-Яа-яЁёІіЇїЄє' -]{2,}$/;
			if (!validRegexName.test(name)) {
				return 'This field must be a valid email address.';
			}
			return true;
		},
		validatePhone(number) {
			if (!number) return 'This field is required.';

			const validPhoneRegex = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
			if (!validPhoneRegex.test(number)) {
				return 'Phone number must be 13 digits.';
			}

			return true;
		},
		validateBirth(birthDate) {
			if (!birthDate) return 'This field is required.';
			const birthDateObject = new Date(birthDate);

			// Перевірка на дійсність дати
			if (isNaN(birthDateObject.getTime())) {
				return 'Please enter a valid date.';
			}

			// Отримуємо рік з дати
			const year = birthDateObject.getFullYear();

			// Перевірка на допустимий рік
			if (year < 1950 || year > new Date().getFullYear()) {
				return 'The year must be greater than 1950 but <= to the current year.';
			}
			return true;
		},
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
		},
		validateConfirmPassword() {
			if (!this.confirmPassword) return 'This field is required.';
			if (this.confirmPassword !== this.password) return 'Passwords must match.';
			return true;
		}
	}
};
</script>

<style lang="scss" scoped>
.form {
	min-width: 800px;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 20px;

	&__field {
		position: relative;
	}

	&__email {
		grid-column: 1 / -1;
	}

	&__label {
		font-size: font-rem(12);
		color: $bg-dark;
		display: block;
		margin-bottom: 6px;
		font-weight: 600;
	}

	&__input {
		width: 100%;
		padding: 12px 16px;
		font-size: font-rem(14);
		border: 1px solid $grey;
		border-radius: 4px;
		transition:
			border-color 0.3s ease,
			box-shadow 0.3s ease;

		&:focus {
			border-color: $dark-blue;
			box-shadow: 0 0 5px $grey;
		}
	}

	&__error {
		color: $red;
		font-size: 12px;
		margin-top: 4px;
		position: absolute;
		bottom: -20px;
		left: 0;
	}

	&__actions {
		grid-column: 1 / -1;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	&__link {
		color: $orange;
		font-size: font-rem(12);
		font-weight: 600;
	}

	&__button {
		background-color: $bg-card;
		color: white;
		border: none;
		padding: 8px 36px;
		border-radius: 4px;
		cursor: pointer;
		font-size: 16px;
		font-weight: 600;
		transition: background-color 0.3s ease;

		&:hover {
			background-color: $orange;
		}
	}
}
</style>
