<template>
	<div class="location">
		<RouterLink
			:to="{ name: 'SingleLocationPage', params: { id: location.id } }"
			class="location__name"
		>
			{{ location.name }}
		</RouterLink>
		<span>Type: {{ location.type }}</span>
		<span>Dimension: {{ location.dimension }}</span>
		<span>Created: {{ location.created }}</span>
	</div>
</template>

<script>
import SingleLocationPage from '@/pages/locations/SingleLocationPage.vue';
export default {
	name: 'LocationCard',
	components: {
		SingleLocationPage
	},
	props: {
		location: {
			type: Object,
			required: true
		}
	}
};
</script>

<style lang="scss" scoped>
.location {
	box-shadow: 0px -1px 4px rgba(0, 0, 0, 0.2);
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 40px;
	// .location__name
	&__name {
		font-weight: bold;
		font-size: font-rem(20);
		margin-bottom: 8px;
		transition: 0.3s;
		&:hover {
			color: $orange;
		}
	}
	& span {
		font-size: font-rem(16);
		font-weight: 400;
		color: $grey;
	}
}
</style>
