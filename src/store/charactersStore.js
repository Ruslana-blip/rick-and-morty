import { defineStore } from 'pinia';
import axios from '@/axios';

export const useCharactersStore = defineStore('charactersStore', {
	//тут вписуємо дані
	state: () => ({
		characters: [],
		randomCharacters: [],
		countPages: 0,
		selectedCharacter: {},
		charactersCount: localStorage.getItem('charactersCount') || 0
	}),
	actions: {
		async getCharacters(numberPage = 1) {
			try {
				const { data } = await axios.get(`character/?page=${numberPage}`);
				this.characters = data.results;
				this.charactersCount = data.info.count;
				this.countPages = data.info.pages;
				localStorage.setItem('charactersCount', this.charactersCount);
			} catch (error) {
				console.error(error);
			}
		},
		async getRandomCharacters(count) {
			try {
				const { data } = await axios.get(`character/${this.generateRandomIds(count)}`);
				this.randomCharacters = data;
			} catch (error) {
				console.error(error);
			}
		},
		generateRandomIds(count) {
			const numbers = [];
			while (numbers.length < count) {
				const randomNumber = Math.floor(Math.random() * this.charactersCount);
				if (!numbers.includes(randomNumber)) {
					numbers.push(randomNumber);
				}
			}
			return numbers.join(',');
		},
		async getCharacterById(id) {
			try {
				const { data } = await axios.get(`character/${id}`);
				this.selectedCharacter = data;
			} catch (error) {
				console.error(error);
			}
		},
		async getCharactersByIds(ids) {
			try {
				const { data } = await axios.get(`character/${ids}`);
				this.characters = data;
			} catch (error) {
				console.error(error);
			}
		}
	}
});
