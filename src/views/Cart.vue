<template>
	<div class="wrapper">
		<div v-if="cartItems.length > 0">
			<div class="cartItems">
				<ProductBox v-for="product in cartItems" :key="product.id" :product="product" />
			</div>
			<div class="bottomElements">
				<button class="button" @click="$router.push({ path: '/' })">Back to shop</button>
				<div class="price">Total: {{ totalPrice }} $</div>
				<button class="button button--green" @click="$router.push({ path: '/checkout' })">Checkout</button>
			</div>
		</div>
		<div v-else class="message">There are no items in the cart. Click <router-link to="/">here</router-link> to go back to the shop.<br /></div>
	</div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import ProductBox from '../components/ProductBox.vue'

export default {
	components: {
		ProductBox
	},
	setup() {
		const store = useStore()
		const cartItems = computed(() => store.getters.getCartItems)
		const totalPrice = computed(() => store.getters.getTotalPrice)

		return { cartItems, totalPrice }
	}
}
</script>

<style lang="scss" scoped>
.wrapper {
	margin: 0 auto;
	padding: 1.5rem;
}

.cartItems {
	width: 46rem;
	display: flex;
	flex-wrap: wrap;
	margin: 1.5rem auto;

	@media screen and (max-width: 768px) {
		width: unset;
	}
}

.bottomElements {
	width: 46rem;
	margin: 2rem auto 1rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-wrap: wrap;

	@media screen and (max-width: 768px) {
		width: unset;
	}
	@media screen and (max-width: 480px) {
	}
}

.price {
	font-size: 1.15rem;
	font-weight: bold;
}

.message {
	text-align: center;
}
</style>
