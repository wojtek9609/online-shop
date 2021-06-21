<template>
	<div class="product" v-if="product">
		<img :src="product.image" alt="productImage" />
		<div class="title">{{ product.title }}</div>
		<div class="price">{{ product.price }} $</div>
		<div class="description">{{ product.description }}</div>
		<button class="button" :disabled="notify" @click="addItemToCart">Add to Cart</button>
		<div v-if="notify" class="message">Product added sucessfully !</div>
	</div>
</template>

<script>
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { computed, watch, ref } from 'vue'

export default {
	name: 'Product',
	setup() {
		const store = useStore()
		const route = useRoute()

		const product = computed(() => store.getters.getProductById(parseInt(route.params.id)))
		const cartItems = computed(() => store.getters.getCartItems)
		const notify = ref(false)

		function addItemToCart() {
			if (cartItems.value.find((item) => item.id === product.value.id)) {
				const updatedCartItems = cartItems.value.map((item) =>
					item.id !== product.value.id ? item : { ...product.value, quantity: item.quantity + 1 }
				)
				store.commit('UPDATE_CART_ITEMS', updatedCartItems)
			} else store.commit('UPDATE_CART_ITEMS', [...cartItems.value, { ...product.value, quantity: 1 }])
			notify.value = true
		}

		watch(notify, (curr) => {
			if (curr) setTimeout(() => (notify.value = false), 2000)
		})

		return { product, addItemToCart, notify }
	}
}
</script>

<style lang="scss" scoped>
.product {
	width: 42rem;
	margin: 1.5rem auto;
	padding: 1.5rem;
	border: 0.0625rem solid rgb(226, 226, 226);
	border-radius: 0.125rem;
	box-shadow: 0px 3px 5px 1px rgba(0, 0, 0, 0.3);
	text-align: center;

	@media screen and (max-width: 768px) {
		margin: 1.5rem;
		width: unset;
	}
}

img {
	width: 10rem;
	height: 10rem;
}

.title {
	font-size: 1.75rem;
	font-weight: bold;
	margin: 2rem 0;
}

.price {
	font-size: 2rem;
	font-weight: bold;
	margin-bottom: 2rem;
	padding: 1.5rem 0;
	border-top: 0.0625rem solid rgb(226, 226, 226);
	border-bottom: 0.0625rem solid rgb(226, 226, 226);
}

.description {
	width: 100%;
	margin: 0.75rem 0 1.5rem;
}

.message {
	margin-top: 1.5rem;
	color: green;
}
</style>
