<template>
	<div v-if="categories.length > 0" class="categories">
		<div
			:class="['category', { active: activeCategories.includes(category) }]"
			v-for="category in categories"
			:key="category"
			@click="updateCategories(category)"
		>
			{{ category }}
		</div>
		<mdicon name="close" @click="clear" />
	</div>
</template>

<script>
import { ref, computed, watch } from 'vue'
import { useStore } from 'vuex'

export default {
	name: 'ProductCategories',
	props: {
		modelValue: { type: Array, required: true }
	},
	emits: ['update:modelValue'],
	setup(props, { emit }) {
		const store = useStore()
		const categories = computed(() => store.getters.getProductCategories)
		const activeCategories = ref(props.modelValue)

		function updateCategories(category) {
			activeCategories.value = activeCategories.value.includes(category)
				? activeCategories.value.filter((el) => el !== category)
				: [...activeCategories.value, category]
		}

		function clear() {
			activeCategories.value = []
		}

		watch(activeCategories, (curr) => emit('update:modelValue', curr))

		return { categories, activeCategories, updateCategories, clear }
	}
}
</script>
<style lang="scss" scoped>
.categories {
	display: flex;
	justify-content: center;
	margin: 1rem;
}

.category {
	margin: 0 1rem;
	border-radius: 1rem;
	border: 0.125rem solid #43a047;
	padding: 0.25rem 0.5rem;

	&:hover {
		cursor: pointer;
		user-select: none;
	}

	&.active {
		background-color: #43a047;
		color: white;
	}
}

.mdi-close {
	align-items: center;
	display: flex;

	&:hover {
		opacity: 0.75;
		cursor: pointer;
	}
}
</style>
