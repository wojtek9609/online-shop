<template>
	<div class="product" v-if="product">
		<div class="productImage">
			<img :src="product.image" alt="productImage" />
		</div>
		<div class="productTitle">{{ product.title }}</div>
		<div class="productPrice">{{ product.price }} $</div>
		Description:
		<div class="productDescription">{{ product.description }}</div>
		<button class="button button--add" @click="addItemToCart(product)">Add to Cart</button>
	</div>
</template>

<script>
import store from '../store/index'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

export default {
	setup() {
		const route = useRoute()
		const cartItems = computed(() => store.getters.getCartItems)
		const product = computed(() => store.getters.getProductById(parseInt(route.params.id)))

		function addItemToCart(product) {
			store.commit('UPDATE_CART_ITEMS', [...cartItems, product])
		}

		return { addItemToCart, product }
	}
}
</script>

<style lang="scss" scoped>
.product {
	width: 80%;
	margin: auto;
	padding: 1.5rem;
	border: 0.0625rem solid rgb(226, 226, 226);
}

.productImage {
	img {
		width: 10rem;
		height: 10rem;
	}
}

.productTitle {
	font-size: 1.75rem;
	font-weight: bold;
	margin: 2rem 0;
}

.productPrice {
	font-size: 2rem;
	font-weight: bold;
	margin-bottom: 2rem;
}

.productDescription {
	width: 100%;
	margin: 1rem 0;
}
</style>
