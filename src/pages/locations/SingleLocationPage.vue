<template>
	<div class="location">
		<div class="location__info">
			<span class="location__name">Name: {{ selectedLocation.name }}</span>
			<div class="location__content">
				<span>Type: {{ selectedLocation.type }}</span>
				<span>Dimension: {{ selectedLocation.dimension }}</span>
				<span>Created: {{ selectedLocation.created }}</span>
			</div>
		</div>
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
</template>

<script>
import { mapState, mapActions } from 'pinia';
import { useLocationsStore } from '@/store/locationsStore';
import { useCharactersStore } from '@/store/charactersStore';

import CharacterCard from '@/components/character/CharacterCard.vue';

export default {
	name: 'SingleLocationPage',
	components: {
		CharacterCard
	},
	props: {},
	computed: {
		...mapState(useLocationsStore, ['selectedLocation']),
		...mapState(useCharactersStore, ['selectedCharacter', 'characters'])
	},
	methods: {
		...mapActions(useLocationsStore, ['getLocationById']),
		...mapActions(useCharactersStore, ['getCharactersByIds'])
	},
	async mounted() {
		await this.getLocationById(this.$route.params.id);
		const ids = this.selectedLocation.residents.map(episode => episode.split('/').pop());
		await this.getCharactersByIds(ids);
	}
};
</script>

<style lang="scss" scoped>
.location {
	margin: 20px;
	padding: 20px;
	box-shadow: 0 0 5px 0 black;
	// .location__name
	&__name {
		font-size: font-rem(18);
		font-weight: 600;
		color: $black;
		display: block;
		margin-bottom: 12px;
	}
	// .location__content
	&__content {
		& span {
			display: block;
			font-size: font-rem(14);
			color: $bg-dark;
			margin-bottom: 16px;
		}
	}
	& h2 {
		display: flex;
		justify-content: center;
	}
}

.character {
	margin-top: 40px;
	// .character__list
	&__list {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
		gap: 20px;
	}
}
</style>
