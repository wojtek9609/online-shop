<template>
	<div class="product">
		<div class="productImage">
			<img :src="product.image" alt="productImage" />
		</div>
		<div class="detailsWrapper">
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
	width: 100%;
	padding: 1.5rem 0;
	border-bottom: 0.0625rem solid rgb(226, 226, 226);
	user-select: none;
}

.productImage {
	min-width: 6rem;
	img {
		width: 6rem;
		height: 6rem;
	}
}

.detailsWrapper {
	width: 100%;
	margin-left: 2rem;
}

.title {
	width: 100%;
	font-size: 1.15rem;
	font-weight: bold;
}

.details {
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	margin: 1.5rem 0;

	@media screen and (max-width: 480px) {
		flex-wrap: wrap;
		justify-content: unset;
		margin: 1rem 0;

		& > * {
			margin: 1rem 1.5rem 0 0;
		}
	}
}

.price {
	font-size: 1.1rem;
	min-width: 6rem;
}

.quantity {
	display: flex;
	justify-content: space-between;
	min-width: 5rem;
	padding: 0.5rem;
	border: 0.0625rem solid grey;

	.mdi-minus,
	.mdi-plus {
		&:hover {
			cursor: pointer;
		}
	}
}

.itemCount {
	margin: 0 0.5rem;
	text-align: center;
}

.totalPrice {
	min-width: 7rem;
	font-size: 1.1rem;
	font-weight: bold;

	@media screen and (max-width: 768px) {
		text-align: center;
	}
	@media screen and (max-width: 480px) {
		text-align: left;
	}
}
</style>
