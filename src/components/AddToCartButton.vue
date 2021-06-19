<template>
	<button class="button" :disabled="notify" @click="addItemToCart">Add to Cart</button>
	<div v-if="notify" class="message">Product added sucessfully !</div>
</template>

<script>
import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'

export default {
	name: 'AddToCartButton',
	props: {
		product: Object
	},
	setup(props) {
		const store = useStore()
		const cartItems = computed(() => store.getters.getCartItems)
		const notify = ref(false)

		function addItemToCart() {
			if (cartItems.value.find((item) => item.id === props.product.id)) {
				const updatedCartItems = cartItems.value.map((item) =>
					item.id !== props.product.id ? item : { ...props.product, quantity: item.quantity + 1 }
				)
				store.commit('UPDATE_CART_ITEMS', updatedCartItems)
			} else store.commit('UPDATE_CART_ITEMS', [...cartItems.value, { ...props.product, quantity: 1 }])
			notify.value = true
		}

		watch(notify, (curr) => {
			if (curr) setTimeout(() => (notify.value = false), 2000)
		})

		return { addItemToCart, notify }
	}
}
</script>

<style lang="scss" scoped>
button:disabled {
	cursor: not-allowed;
	pointer-events: all !important;
	opacity: 0.5;
}

.message {
	margin: 0.75rem 0;
	color: green;
}
</style>
