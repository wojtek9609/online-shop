<template>
	<button class="button" @click="addItemToCart">Add to Cart</button>
</template>

<script>
import { computed } from 'vue'
import store from '../store/index'

export default {
	name: 'AddToCartButton',
	props: {
		product: Object
	},
	setup(props) {
		const cartItems = computed(() => store.getters.getCartItems)

		function addItemToCart() {
			if (cartItems.value.find((item) => item.id === props.product.id)) {
				const updatedCartItems = cartItems.value.map((item) =>
					item.id !== props.product.id ? item : { ...props.product, quantity: item.quantity + 1 }
				)
				store.commit('UPDATE_CART_ITEMS', updatedCartItems)
			} else store.commit('UPDATE_CART_ITEMS', [...cartItems.value, { ...props.product, quantity: 1 }])
		}

		return { addItemToCart }
	}
}
</script>

<style lang="scss" scoped></style>
