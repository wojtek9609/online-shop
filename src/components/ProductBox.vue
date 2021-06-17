<template>
	<div class="product" @click="$router.push({ path: `/product/${product.id}` })">
		<div class="productImage">
			<img :src="product.image" alt="productImage" />
		</div>
		<div class="productInfo">
			<div class="productTitle">{{ product.title }}</div>
			<div class="productPrice">{{ product.price }} $</div>
			<div class="productDescription">{{ product.description }}</div>
		</div>
		<button class="button" @click="addItemToCart(product)">Add to Cart</button>
	</div>
</template>

<script>
import store from '../store/index'
import { computed } from 'vue'

export default {
	props: {
		product: Object
	},
	setup() {
		const cartItems = computed(() => store.getters.getCartItems)

		function addItemToCart(product) {
			store.commit('UPDATE_CART_ITEMS', [...cartItems, product])
		}

		return { addItemToCart }
	}
}
</script>

<style lang="scss" scoped>
.product {
	display: flex;
	padding: 1.5rem 1rem;
	width: 100%;
	border-bottom: 0.0625rem solid rgb(226, 226, 226);
}

.productTitle {
	font-size: 1.15rem;
	font-weight: bold;
}

.productPrice {
	font-size: 1.15rem;
	font-weight: bold;
	margin: 0 0.5rem;
}

.productImage {
	img {
		width: 6rem;
		height: 6rem;
	}
}

.productInfo {
	width: 60%;
	margin: 0 2rem;
}

.productDescription {
	width: 100%;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	margin-top: 1rem;
}
</style>
