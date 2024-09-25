import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/store/authStore';

const routes = [
	{
		path: '/',
		component: () => import('@/layouts/MainLayout.vue'),
		meta: {
			requiresAuth: true
		},
		children: [
			{
				path: '',
				name: 'HomePage',
				component: () => import('@/pages/HomePage.vue')
			},
			{
				path: 'characters',
				children: [
					{
						path: '',
						name: 'CharactersPage',
						component: () => import('@/pages/characters/CharactersPage.vue')
					},
					{
						path: ':id',
						name: 'SingelCharacterPage',
						component: () => import('@/pages/characters/SingelCharacterPage.vue')
					}
				]
			},
			{
				path: 'locations',
				children: [
					{
						path: '',
						name: 'LocationsPage',
						component: () => import('@/pages/locations/LocationsPage.vue')
					},
					{
						path: ':id',
						name: 'SingleLocationPage',
						component: () => import('@/pages/locations/SingleLocationPage.vue')
					}
				]
			},
			{
				path: 'episodes',
				children: [
					{
						path: '',
						name: 'EpisodesPage',
						component: () => import('@/pages/episodes/EpisodesPage.vue')
					},
					{
						path: ':id',
						name: 'SingleEpisodePage',
						component: () => import('@/pages/episodes/SingleEpisodePage.vue')
					}
				]
			}
		]
	},
	{
		path: '/auth',
		component: () => import('@/layouts/AuthLayout.vue'),
		redirect: { name: 'LoginPage' },
		children: [
			{
				path: 'login',
				name: 'LoginPage',
				component: () => import('@/pages/auth/LoginPage.vue')
			},
			{
				path: 'registration',
				name: 'RegistrationPage',
				component: () => import('@/pages/auth/RegistrationPage.vue')
			}
		]
	}
];

const router = createRouter({
	history: createWebHistory(),
	routes
});

router.beforeEach(to => {
	// const authStore = useAuthStore();
	// if (!authStore.isLoggedIn && to.meta.requiresAuth) {
	// 	return { name: 'LoginPage' };
	// } else if (authStore.isLoggedIn && !to.meta.requiresAuth) {
	// 	return { name: 'HomePage' };
	// }
});

export default router;
