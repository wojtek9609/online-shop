<template>
	<div class="wrapper">
		<div v-if="filteredProducts.length > 0" class="productsList">
			<ProductCategories v-model="activeCategories" />
			<div class="product" v-for="product in filteredProducts" :key="product.id" @click="$router.push({ path: `/product/${product.id}` })">
				<div class="productImage">
					<img :src="product.image" alt="productImage" />
				</div>
				<div class="info">
					<div class="title">{{ product.title }}</div>
					<div class="price">{{ product.price }} $</div>
					<button class="button moreButton">More</button>
				</div>
			</div>
		</div>
		<div v-else class="noProductsMessage">
			Sorry there are no products to display. Sorry for the inconvenience.
		</div>
	</div>
</template>

<script>
import { computed, ref } from 'vue'
import ProductCategories from '../components/ProductCategories.vue'
import store from '../store/index'

export default {
	name: 'Home',
	components: {
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
.wrapper {
	padding: 1rem;
}

.productsList {
	width: 72rem;
	margin: auto;
	display: flex;
	flex-wrap: wrap;
	@media screen and (max-width: 1200px) {
		width: 100%;
	}
}

.product {
	width: 32.5rem;
	margin: 0.75rem;
	display: flex;
	justify-content: left;
	padding: 1.5rem 1rem;
	border-bottom: 0.0625rem solid rgb(226, 226, 226);
	border-radius: 0.125rem;
	box-shadow: 0px 3px 5px 1px rgba(0, 0, 0, 0.3);

	@media screen and (max-width: 1200px) {
		width: 100%;
	}

	&:hover {
		cursor: pointer;
		background-color: rgb(243, 243, 243);
	}
}

.title,
.price {
	font-size: 1.15rem;
	font-weight: bold;
}

.price {
	margin: 0.75rem 0;
}

.title {
	width: 100%;
	text-align: left;
	padding-bottom: 0.75rem;
	border-bottom: 0.125rem solid rgb(156, 156, 156);
}

.productImage {
	min-width: 6rem;
	img {
		width: 6rem;
		height: 6rem;
	}
}

.info {
	width: 100%;
	margin-left: 2rem;
	display: flex;
	flex-direction: column;
	align-items: baseline;
}

.noProductsMessage {
	font-size: 1.25rem;
	font-weight: 600;
	text-align: center;
}

.moreButton {
	margin-top: auto;

	@media screen and (max-width: 1200px) {
		margin: auto 0 0 auto;
	}
}
</style>
