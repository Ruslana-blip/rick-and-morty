<template>
	<div class="episode">
		<div class="episode__content">
			<h1 class="episode__name">{{ selectedEpisode.name }}</h1>

			<span>Episode: {{ selectedEpisode.episode }}</span>
			<span>Air date: {{ selectedEpisode.air_date }}</span>
			<span>Created: {{ selectedEpisode.created }}</span>
		</div>
		<div class="episode__characters">
			<h2>Residents:</h2>
			<ul class="character__list">
				<li
					v-for="character in characters"
					:key="character.id"
					class="character__item"
				>
					<CharacterCard :character="character" />
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import { useEpisodesStore } from '@/store/episodesStore';
import { useCharactersStore } from '@/store/charactersStore';

import CharacterCard from '@/components/character/CharacterCard.vue';

export default {
	name: 'SingleEpisodePage',
	components: {
		CharacterCard
	},
	computed: {
		...mapState(useEpisodesStore, ['selectedEpisode']),
		...mapState(useCharactersStore, ['selectedCharacter', 'characters'])
	},
	methods: {
		...mapActions(useEpisodesStore, ['getEpisodeById']),
		...mapActions(useCharactersStore, ['getCharactersByIds'])
	},
	async mounted() {
		await this.getEpisodeById(this.$route.params.id);
		const ids = this.selectedEpisode.characters.map(episode => episode.split('/').pop());
		await this.getCharactersByIds(ids);
	}
};
</script>

<style lang="scss" scoped>
.episode {
	margin: 20px;
	box-shadow: 0px 0px 5px $black;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 40px;
	&__name {
		font-weight: bold;
		font-size: font-rem(20);
		margin-bottom: 8px;
	}
	// .episode__content
	&__content {
		& span {
			display: block;
			font-size: font-rem(14);
			color: $bg-dark;
			&:not(:last-child) {
				margin-bottom: 16px;
			}
		}
	}
	& h2 {
		display: flex;
		justify-content: center;
		font-size: font-rem(20);
		margin-bottom: 20px;
	}
}
.character {
	// .character__list
	&__list {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(800px, 1fr));
		gap: 20px;
	}
}
</style>
