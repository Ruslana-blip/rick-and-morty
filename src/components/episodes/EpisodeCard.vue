<template>
	<div class="episode">
		<RouterLink
			:to="{ name: 'SingleEpisodePage', params: { id: episode.id } }"
			class="episode__name"
		>
			{{ episode.name }}
		</RouterLink>
		<span class="episode__episode">Episode: {{ episode.episode }}</span>
		<span class="episode__data">Air date: {{ episode.air_date }}</span>
	</div>
</template>

<script>
export default {
	name: 'EpisodeCard',
	props: {
		episode: {
			type: Object,
			required: true
		}
	}
};
</script>

<style lang="scss" scoped>
.episode {
	box-shadow: 0px -1px 4px rgba(0, 0, 0, 0.2);
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 40px;
	&__name {
		font-weight: bold;
		font-size: font-rem(20);
		margin-bottom: 8px;
		transition: 0.3s;
		&:hover {
			color: $orange;
		}
	}

	&__episode {
		font-size: font-rem(16);
		font-weight: 400;
		color: $grey;
		margin-bottom: 4px;
	}

	&__data {
		font-size: font-rem(16);
		color: $grey;
	}
}
</style>
