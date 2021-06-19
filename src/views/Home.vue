<template>
	<div class="home">
		<ProductCategories v-model="activeCategories" />
		<div class="productsList">
			<ProductBox v-for="product in filteredProducts" :key="product.id" :product="product" />
		</div>
	</div>
</template>

<script>
import { computed, ref } from 'vue'
import ProductBox from '../components/ProductBox.vue'
import ProductCategories from '../components/ProductCategories.vue'
import store from '../store/index'

export default {
	name: 'Home',
	components: {
		ProductBox,
		ProductCategories
	},
	setup() {
		const products = computed(() => store.getters.getProducts)
		const activeCategories = ref([])
		const filteredProducts = computed(() =>
			activeCategories.value.length === 0 ? products.value : products.value.filter((product) => activeCategories.value.includes(product.category))
		)

		return { activeCategories, filteredProducts }
	}
}
</script>

<style lang="scss" scoped>
.productsList {
	width: 60%;
	margin: auto;
}
</style>
