import { defineStore } from 'pinia';
import axios from '@/axios';

export const useLocationsStore = defineStore('locationsStore', {
	state: () => ({
		locations: [],
		countPagesLocation: 0,
		selectedLocation: {},
		locationsCount: localStorage.getItem('locationsCount') || 0
	}),
	actions: {
		async getLocations(numberPage = 1) {
			try {
				const { data } = await axios.get(`location/?page=${numberPage}`);
				this.locations = data.results;
				this.countPagesLocation = data.info.pages;
				this.locationsCount = data.info.count;

				localStorage.setItem('locationsCount', this.locationsCount);
			} catch (error) {
				console.error(error);
			}
		},
		async getLocationById(id) {
			try {
				const { data } = await axios.get(`location/${id}`);
				this.selectedLocation = data;
			} catch (error) {
				console.error(error);
			}
		}
	}
});
