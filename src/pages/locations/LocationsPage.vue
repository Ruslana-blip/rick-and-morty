<template>
	<div class="location">
		<ul class="location__list">
			<li
				v-for="location in locations"
				:key="location.id"
				class="location__item"
			>
				<LocationCard :location="location" />
			</li>
		</ul>
		<ThePagination
			:count-pages="countPagesLocation"
			:get-pages="getLocations"
		/>
	</div>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import { useLocationsStore } from '@/store/locationsStore';

import LocationCard from '@/components/location/LocationCard.vue';
import ThePagination from '@/components/pagination/ThePagination.vue';
export default {
	name: 'LocationsPage',
	components: {
		LocationCard,
		ThePagination
	},
	computed: {
		...mapState(useLocationsStore, ['locations', 'countPagesLocation'])
	},
	methods: {
		...mapActions(useLocationsStore, ['getLocations'])
	},
	async mounted() {
		this.getLocations();
	}
};
</script>

<style lang="scss" scoped>
.location {
	margin: 20px 30px;
	&__list {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(700px, 1fr));
	}
}
</style>
