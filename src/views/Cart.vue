<template>
	<div class="wrapper">
		<div class="cartItems">
			<ProductBox v-for="product in cartItems" :key="product.id" :product="product" />
		</div>
	</div>
	<div v-if="cartItems.length === 0" class="message">
		There are no items in the cart. Click <router-link to="/">here</router-link> to go back to the shop.<br />
	</div>
	<div v-else class="wrapper wrapper--bottom">
		<button class="button" @click="$router.push({ path: '/' })">Back to shop</button>
		<div class="price">Total: {{ totalPrice }} $</div>
		<button class="button button--green" @click="$router.push({ path: '/checkout' })">Proceed to checkout</button>
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
	width: 50%;
	display: flex;
	margin: auto;

	&.wrapper--bottom {
		justify-content: space-between;
		align-items: center;
		margin-top: 1rem;
		padding: 1.5rem 1rem;
	}
}

.cartItems {
	width: 100%;
}

.price {
	font-size: 1.15rem;
	font-weight: bold;
}
</style>
