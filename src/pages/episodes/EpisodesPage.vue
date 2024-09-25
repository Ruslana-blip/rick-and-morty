<template>
	<div class="episodes">
		<ul class="episodes__list">
			<li
				v-for="episode in episodes"
				:key="episode.id"
				class="episodes__item"
			>
				<EpisodeCard :episode="episode" />
			</li>
		</ul>
		<ThePagination
			:count-pages="pageCountEpisodes"
			:get-pages="getEpisodes"
		/>
	</div>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import { useEpisodesStore } from '@/store/episodesStore';

import EpisodeCard from '@/components/episodes/EpisodeCard.vue';
import ThePagination from '@/components/pagination/ThePagination.vue';
export default {
	name: 'EpisodesPage',
	components: {
		EpisodeCard,
		ThePagination
	},
	computed: {
		...mapState(useEpisodesStore, ['episodes', 'pageCountEpisodes'])
	},
	methods: {
		...mapActions(useEpisodesStore, ['getEpisodes'])
	},
	async mounted() {
		await this.getEpisodes();
	}
};
</script>

<style lang="scss" scoped>
.episodes {
	margin: 20px 60px;
	// .episodes__list
	&__list {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(700px, 1fr));
		gap: 40px;
	}
}
</style>
