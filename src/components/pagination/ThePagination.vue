<template>
	<div class="pagination">
		<ul class="pagination__list">
			<li class="pagination__item">
				<button
					@click.prevent="decrementPage"
					class="pagination__button"
					:disabled="activePage === 1"
					:class="{ disabled: activePage === 1 }"
				>
					&lt;
				</button>
			</li>
			<li
				v-for="page in countPages"
				:key="page"
				@click="changePage(page)"
				class="pagination__item"
			>
				<button
					@click.prevent="changePage(page)"
					class="pagination__button"
					:class="[{ active: page === activePage }]"
				>
					{{ page }}
				</button>
			</li>
			<li class="pagination__item">
				<button
					@click.prevent="incrementPage"
					class="pagination__button"
					:disabled="activePage === countPages"
					:class="{ disabled: activePage === countPages }"
				>
					&gt;
				</button>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	name: 'ThePagination',
	props: {
		countPages: {
			type: Number,
			required: true
		},
		getPages: {
			type: Function,
			required: true
		}
	},
	data() {
		return {
			activePage: 1
		};
	},

	methods: {
		incrementPage() {
			if (this.activePage < this.countPages) {
				this.activePage++;
				this.getPages(this.activePage);
			}
		},
		decrementPage() {
			if (this.activePage > 1) {
				this.activePage--;
				this.getPages(this.activePage);
			}
		},
		changePage(page) {
			this.activePage = page;
			this.getPages(this.activePage);
		}
	}
};
</script>

<style lang="scss" scoped>
.pagination {
	display: flex;
	justify-content: space-around;
	margin: 40px;

	// .pagination__list
	&__list {
		display: flex;
	}
	// .pagination__item
	&__item {
		margin: 0 5px;
	}
	// .pagination__button
	&__button {
		border: none;
		width: 30px;
		height: 30px;
		box-shadow: 0px 0 5px 0 black;
		cursor: pointer;
		background-color: white;
		color: black;
		transition:
			background-color 0.3s ease,
			color 0.3s ease;
		&.disabled {
			background-color: #f0f0f0;
			color: #b0b0b0;
			cursor: not-allowed;
		}
		&.active {
			background-color: #3498db;
			color: white;
			font-weight: bold;
		}
	}
}
</style>
