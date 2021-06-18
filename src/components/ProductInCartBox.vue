<template>
	<div class="product">
		<img :src="product.image" alt="productImage" />
		<div class="info">
			<div class="title">{{ product.title }}</div>
			<div class="price">{{ product.price }} $</div>

			<div class="quantity">
				<mdicon name="minus" @click="updateQuantity(product.quantity - 1)" />
				{{ product.quantity }}
				<mdicon name="plus" @click="updateQuantity(product.quantity + 1)" />
			</div>
			<div class="totalPrice">{{ (product.price * product.quantity).toFixed(2) }} $</div>
		</div>
		<button class="button button--delete">Delete</button>
	</div>
</template>

<script>
import store from '../store/index'
import { computed } from 'vue'

export default {
	name: 'ProductBox',
	props: {
		product: Object
	},
	setup(props) {
		const cartItems = computed(() => store.getters.getCartItems)

		function updateQuantity(quantity) {
			if (quantity === 0) {
				store.commit('UPDATE_CART_ITEMS', cartItems.value.filter((item) => item.id !== props.product.id))
			} else {
				const updatedCartItems = cartItems.value.map((item) => (item.id !== props.product.id ? item : { ...props.product, quantity }))
				store.commit('UPDATE_CART_ITEMS', updatedCartItems)
			}
		}
		return { updateQuantity }
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

.title {
	font-size: 1.15rem;
	font-weight: bold;
}

.price {
	font-size: 1.15rem;
	font-weight: bold;
	margin: 0 0.5rem;
}

img {
	width: 6rem;
	height: 6rem;
}

.info {
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

.button--delete {
	background: rgb(202, 60, 60);
}

.mdi:hover {
	cursor: pointer;
}
</style>
