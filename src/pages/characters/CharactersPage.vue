<template>
	<div class="character">
		<ul class="character__list">
			<li
				v-for="character in characters"
				:key="character.id"
				class="character__item"
			>
				<CharacterCard :character="character" />
			</li>
		</ul>
		<ThePagination
			:count-pages="countPages"
			:get-pages="getCharacters"
		/>
	</div>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import { useCharactersStore } from '@/store/charactersStore';

import CharacterCard from '@/components/character/CharacterCard.vue';
import ThePagination from '@/components/pagination/ThePagination.vue';

export default {
	name: 'CharactersPage',
	components: {
		CharacterCard,
		ThePagination
	},
	data() {
		return {};
	},
	computed: {
		...mapState(useCharactersStore, ['characters', 'countPages'])
	},

	methods: {
		...mapActions(useCharactersStore, ['getCharacters'])
	},
	async mounted() {
		await this.getCharacters();
	}
};
</script>

<style lang="scss" scoped>
.character {
	padding: 20px;
	// .character__list
	&__list {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(600px, 1fr));
		gap: 20px;
	}
}
</style>
