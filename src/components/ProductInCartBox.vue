<template>
	<div class="product">
		<img :src="product.image" alt="productImage" />
		<div class="wrapper">
			<div class="title">{{ product.title }}</div>
			<div class="details">
				<div class="price">{{ product.price }} $</div>
				<div class="quantity">
					<mdicon name="minus" size="18" @click="updateQuantity(product.quantity - 1)" />
					{{ product.quantity }}
					<mdicon name="plus" size="18" @click="updateQuantity(product.quantity + 1)" />
				</div>
				<div class="totalPrice">{{ (product.price * product.quantity).toFixed(2) }} $</div>
				<button class="button button--red" @click="deleteItem">Delete</button>
			</div>
		</div>
	</div>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
	name: 'ProductBox',
	props: {
		product: Object
	},
	setup(props) {
		const store = useStore()
		const cartItems = computed(() => store.getters.getCartItems)

		function updateQuantity(quantity) {
			if (quantity === 0) deleteItem()
			else {
				const updatedCartItems = cartItems.value.map((item) => (item.id !== props.product.id ? item : { ...props.product, quantity }))
				store.commit('UPDATE_CART_ITEMS', updatedCartItems)
			}
		}

		function deleteItem() {
			store.commit(
				'UPDATE_CART_ITEMS',
				cartItems.value.filter((item) => item.id !== props.product.id)
			)
		}
		return { updateQuantity, deleteItem }
	}
}
</script>

<style lang="scss" scoped>
.product {
	display: flex;
	padding: 1.5rem 1rem;
	width: 100%;
	border-bottom: 0.0625rem solid rgb(226, 226, 226);
	user-select: none;
}

.title {
	text-align: left;
	font-size: 1.15rem;
	font-weight: bold;
	width: 100%;
}

.details {
	margin: 1.5rem 0;
	display: flex;
	width: 100%;
	justify-content: space-between;
	align-items: center;
}

.quantity {
	border: 0.0625rem solid grey;
	padding: 0.5rem;
}

.price {
	font-size: 1.15rem;
	font-weight: bold;
}

img {
	width: 6rem;
	height: 6rem;
}

.wrapper {
	width: 100%;
	margin: 0 2rem;
}

.mdi-minus,
.mdi-plus {
	&:hover {
		cursor: pointer;
	}
}
</style>
