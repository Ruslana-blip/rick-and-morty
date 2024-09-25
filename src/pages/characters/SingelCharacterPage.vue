<template>
	<div class="character">
		<div class="character__image">
			<img
				:src="selectedCharacter.image"
				:alt="selectedCharacter.name"
				:title="selectedCharacter.name"
			/>
		</div>

		<div class="character__content">
			<h1 class="character__title">{{ selectedCharacter.name }}</h1>
			<div class="character__status">
				<span
					:class="`character__color--${characterStatusColor}`"
					class="character__color"
				></span>
				{{ selectedCharacter.status }} - {{ selectedCharacter.species }}
			</div>
			<div class="character__main">
				<span>Gender: {{ selectedCharacter.gender }}</span>
				<span>
					Origin:
					<RouterLink
						class="character__location"
						:to="{
							name: 'SingleLocationPage',
							params: { id: selectedCharacter?.origin?.url.split('/').pop() }
						}"
					>
						{{ selectedCharacter?.origin?.name || 'Unknown' }}
					</RouterLink>
				</span>
				<span>
					Last known location:
					<RouterLink
						class="character__location"
						:to="{
							name: 'SingleLocationPage',
							params: { id: selectedCharacter.location?.url.split('/').pop() }
						}"
					>
						{{ selectedCharacter.location?.name || 'Unknown' }}
					</RouterLink>
				</span>
				<span>Created: {{ selectedCharacter.created }}</span>
			</div>
		</div>
	</div>
	<h2>Episodes with: {{ selectedCharacter.name }}</h2>
	<ul>
		<div
			v-if="Array.isArray(episodes)"
			class="character__list"
		>
			<li
				v-for="episode in episodes"
				:key="episode.id"
				class="episodes__item"
			>
				<EpisodeCard :episode="episode" />
			</li>
		</div>
		<div
			v-else
			class="character__list"
		>
			<li class="episodes__item">
				<EpisodeCard :episode="episodes" />
			</li>
		</div>
	</ul>
</template>

<script>
import { mapState, mapActions } from 'pinia';

import { useCharactersStore } from '@/store/charactersStore';
import { useEpisodesStore } from '@/store/episodesStore';
import { useLocationsStore } from '@/store/locationsStore';

import EpisodeCard from '@/components/episodes/EpisodeCard.vue';

export default {
	name: 'SingelCharacterPage',
	components: {
		EpisodeCard
	},
	props: {},
	data() {
		return {};
	},
	computed: {
		...mapState(useCharactersStore, ['selectedCharacter']),
		...mapState(useEpisodesStore, ['selectedEpisode', 'episodes']),
		...mapState(useLocationsStore, ['selectedLocation']),
		characterStatusColor() {
			switch (this.selectedCharacter.status) {
				case 'Alive':
					return 'green';
				case 'Dead':
					return 'red';
				default:
					return 'grey';
			}
		}
	},
	watch: {},
	methods: {
		...mapActions(useCharactersStore, ['getCharacterById']),
		...mapActions(useEpisodesStore, ['getEpisodesByIds'])
	},
	async mounted() {
		await this.getCharacterById(this.$route.params.id);
		const ids = this.selectedCharacter.episode.map(epis => epis.split('/').pop()).join(',');
		await this.getEpisodesByIds(ids);
	}
};
</script>

<style lang="scss" scoped>
.character {
	display: flex;
	margin: 20px;
	// .character__image
	&__image {
		width: 400px;
		height: 400px;
		& img {
			width: 100%;
			height: 100%;
		}
	}
	// .character__content
	&__content {
		margin-left: 30px;
		align-self: center;
		font-weight: 400;
		color: $bg-dark;
	}
	// .character__title
	&__title {
		margin-bottom: 20px;
	}
	// .character__status
	&__status {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: font-rem(18);
		margin-bottom: 20px;
	}
	// .character__color
	&__color {
		display: block;
		min-width: 10px;
		min-height: 10px;
		border-radius: 50%;
		&--green {
			background-color: $green;
		}
		&--red {
			background-color: $red;
		}
		&--grey {
			background-color: $grey;
		}
	}
	// .character__main
	&__main {
		display: flex;
		flex-direction: column;
		font-size: font-rem(14);
		& span {
			&:not(:last-child) {
				margin-bottom: 20px;
			}
		}
	}
	&__list {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(700px, 1fr));
		gap: 40px;
	}
	&__location {
		transition: $time;
		@include hover {
			color: $orange;
		}
	}
}
h2 {
	display: flex;
	justify-content: center;
	margin-bottom: 40px;
}
</style>
