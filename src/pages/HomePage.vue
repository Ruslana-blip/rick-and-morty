<template>
	<div class="home">
		<div class="home__bg">
			<h1>The Rick and Morty API</h1>
		</div>
		<ul
			v-if="randomCharacters?.length"
			class="home__list"
		>
			<li
				v-for="character in randomCharacters"
				:key="character.id"
				class="home__item"
			>
				<CharacterCard :character="character" />
			</li>
		</ul>
	</div>

	<TheFooter />
</template>

<script>
import { mapState, mapActions } from 'pinia';
import { useCharactersStore } from '@/store/charactersStore';
import { useLocationsStore } from '@/store/locationsStore';
import { useEpisodesStore } from '@/store/episodesStore';

import CharacterCard from '@/components/character/CharacterCard.vue';
import TheHeader from '@/components/TheHeader.vue';
import TheFooter from '@/components/TheFooter.vue';
export default {
	name: 'HomePage',
	components: {
		TheHeader,
		CharacterCard,
		TheFooter
	},
	computed: {
		...mapState(useCharactersStore, ['randomCharacters', 'charactersCount']),
		...mapState(useEpisodesStore, ['episodesCount']),
		...mapState(useLocationsStore, ['locationsCount']),
		isDataExists() {
			return Boolean(
				localStorage.getItem('charactersCount') &&
					localStorage.getItem('episodesCount') &&
					localStorage.getItem('locationsCount')
			);
		}
	},
	async created() {
		if (!this.isDataExists) {
			await Promise.all([this.getCharacters(), this.getEpisodes(), this.getLocations()]);
		}
		await this.getRandomCharacters(12);
	},
	methods: {
		...mapActions(useCharactersStore, ['getCharacters', 'getRandomCharacters']),
		...mapActions(useEpisodesStore, ['getEpisodes']),
		...mapActions(useLocationsStore, ['getLocations'])
	}
};
</script>

<style lang="scss" scoped>
.home {
	padding-bottom: 60px;
	color: $dark-blue;
	&__bg {
		background: rgb(237, 37, 37, 80%) url('@/assets/images/bg.jpg') top / cover no-repeat;
		height: 312px;
		position: relative;
		&:before {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: hsla(0, 0%, 100%, 0.5);
		}
	}
	& h1 {
		position: relative;
		z-index: 3;
		opacity: 1;
		height: 312px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: black;
		opacity: 1;
		font-size: font-rem(75);
	}
	&__list {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
		gap: 16px;
		padding: 32px 16px;
	}
}
</style>
