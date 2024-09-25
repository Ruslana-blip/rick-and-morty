import { defineStore } from 'pinia';
import axios from '@/axios';

export const useEpisodesStore = defineStore('episodesStore', {
	state: () => ({
		episodes: [],
		pageCountEpisodes: 0,
		selectedEpisode: {},
		episodesCount: localStorage.getItem('episodesCount') || 0
	}),
	actions: {
		async getEpisodes(numberPage = 1) {
			try {
				const { data } = await axios.get(`episode/?page=${numberPage}`);
				this.episodes = data.results;
				this.pageCountEpisodes = data.info.pages;
				this.episodesCount = data.info.count;
				localStorage.setItem('episodesCount', this.episodesCount);
			} catch (error) {
				console.error(error);
			}
		},
		async getEpisodeById(id) {
			try {
				const { data } = await axios.get(`episode/${id}`);
				this.selectedEpisode = data;
			} catch (error) {
				console.error(error);
			}
		},
		async getEpisodesByIds(ids) {
			try {
				const { data } = await axios.get(`episode/${ids}`);
				// Якщо відповідь є об'єктом (один епізод), перетворюємо на масив
				this.episodes = Array.isArray(data) ? data : [data];
			} catch (error) {
				console.error(error);
			}
		}
	}
});
