import { defineStore } from 'pinia';
export const useAuthStore = defineStore('authStore', {
	state: () => ({
		user: JSON.parse(localStorage.getItem('user')) || null,
		usersList: JSON.parse(localStorage.getItem('usersList')) || null
	}),
	getters: {
		isLoggedIn: state => !!state.user
	},
	actions: {
		logIn(user) {
			const usersList = JSON.parse(localStorage.getItem('usersList'));
			if (usersList?.some(element => user.email === element.email)) {
				this.user = usersList.find(el => el.email === user.email);
				localStorage.setItem('user', JSON.stringify(this.user));
				this.router.push({ name: 'HomePage' });
			} else {
				alert('User not found');
			}
		},
		logOut() {
			this.user = null;
			this.router.push({ name: 'LoginPage' });
		},
		register(user) {
			if (this.usersList?.length) {
				if (!this.usersList.some(element => user.email === element.email)) {
					this.usersList.push(user);
					localStorage.setItem('usersList', JSON.stringify(this.usersList));
				} else {
					alert('User already exists');
					return;
				}
			} else {
				localStorage.setItem('usersList', JSON.stringify([user]));
			}
			this.router.push({ name: 'LoginPage' });
		}
	}
});
