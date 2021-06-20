<template>
	<div class="product">
		<div class="productImage">
			<img :src="product.image" alt="productImage" />
		</div>
		<div class="wrapper">
			<div class="title">{{ product.title }}</div>
			<div class="details">
				<div class="price">{{ product.price }} $</div>
				<div class="quantity">
					<mdicon name="minus" size="18" @click="updateQuantity(product.quantity - 1)" />
					<div class="itemCount">
						{{ product.quantity }}
					</div>
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
.price,
.totalPrice {
	min-width: 7rem;
	text-align: left;
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
	display: flex;
	justify-content: space-between;
	min-width: 5rem;
}

.itemCount {
	margin: 0 0.5rem;
	text-align: center;
}

.price {
	font-size: 1.15rem;
	font-weight: bold;
}

.productImage {
	min-width: 6rem;
	img {
		width: 6rem;
		height: 6rem;
	}
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
