<template>
	<div class="wrapper">
		<ProductCategories v-model="activeCategories" />
		<div class="productsList">
			<div class="product" v-for="product in filteredProducts" :key="product.id" @click="$router.push({ path: `/product/${product.id}` })">
				<div class="productImage">
					<img :src="product.image" alt="productImage" />
				</div>
				<div class="info">
					<div class="title">{{ product.title }}</div>
					<div class="price">{{ product.price }} $</div>
					<button class="button">More</button>
				</div>
			</div>
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
.wrapper{
	padding: 1rem;
}

.productsList {
	width: 80rem;
	margin: auto;
	display: flex;
	flex-wrap: wrap;
}

.product {
	width: 36rem;
	margin: 1rem;
	display: flex;
	justify-content: left;
	padding: 1.5rem 1rem;
	border-bottom: 0.0625rem solid rgb(226, 226, 226);
	border-radius: 5px;
	background-color: azure;
	box-shadow: 0px 3px 5px 1px rgba(0, 0, 0, 0.3);

	&:hover {
		cursor: pointer;
		background-color: rgb(231, 231, 231);
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
	text-align: left;
}

.productImage {
	min-width: 6rem;
	img {
		width: 6rem;
		height: 6rem;
	}
}

.info {
	margin-left: 2rem;
	display: flex;
	flex-direction: column;
	align-items: baseline;
}
</style>
