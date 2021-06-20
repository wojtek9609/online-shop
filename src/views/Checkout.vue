<template>
	<div v-if="cartItems.length > 0" class="checkout">
		<div class="header">
			Cart summary
			<mdicon name="cart" />
		</div>
		<div class="item" v-for="item in cartItems" :key="item.id">
			<div class="itemInfo">{{ item.quantity }}x {{ item.title }}</div>
			<div class="price">{{ (item.quantity * item.price).toFixed(2) }} $</div>
		</div>
		<div class="subtotal">
			Subtotal:
			<div class="price">{{ subtotalPrice }}$</div>
		</div>
		<form class="billingDetails" @submit.prevent="finalizeTransaction">
			<div class="header">Billing details</div>
			<div class="input">
				<label for="name">Name</label>
				<input type="text" />
			</div>
			<div class="input">
				<label for="email">Email</label>
				<input type="email" />
			</div>
			<div class="shipping">
				Shipping:
				<div class="input input--radio">
					<input type="radio" id="free" value="0" v-model="shipping" />
					<label for="free">Free shipping 0.00 $</label>
				</div>
				<div class="input input--radio">
					<input type="radio" id="standard" value="10" v-model="shipping" />
					<label for="standard">Standard 10.00 $</label>
				</div>
				<div class="input input--radio">
					<input type="radio" id="express" value="25" v-model="shipping" />
					<label for="express">Express 25.00 $</label>
				</div>
			</div>
			<div class="total">
				Total:
				<div class="price">{{ totalPrice }} $</div>
			</div>
			<p>By clicking the button you accept the <strong> Terms and contitions </strong>.</p>
			<button type="submit" class="button button--green">Place order</button>
		</form>
	</div>
</template>

<script>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { computed, ref } from 'vue'

export default {
	setup() {
		const store = useStore()
		const router = useRouter()
		const cartItems = computed(() => store.getters.getCartItems)
		const subtotalPrice = computed(() => store.getters.getTotalPrice)
		const totalPrice = computed(() => (parseFloat(shipping.value) + parseFloat(subtotalPrice.value)).toFixed(2))
		const shipping = ref(0)

		function finalizeTransaction() {
			store.commit('UPDATE_CART_ITEMS', [])
			router.push({ path: `/thank-you` })
		}

		return { cartItems, subtotalPrice, shipping, totalPrice, finalizeTransaction }
	}
}
</script>

<style lang="scss" scoped>
$border-default: solid 0.125px rgb(214, 214, 214);
.checkout {
	width: 35rem;
	margin: 1.5rem auto;
	padding: 1.5rem;
	border: $border-default;
}
.item {
	display: flex;
	justify-content: space-between;
	padding: 1.5rem 0;
	border-bottom: $border-default;
	font-weight: bold;
}

.header {
	display: flex;
	justify-content: center;
	margin: 0.5rem 0;
	font-size: 1.2rem;
	font-weight: bold;
}

.total,
.subtotal {
	padding: 1.5rem 0;
	display: flex;
	justify-content: space-between;
	border-bottom: $border-default;
}

.total {
	font-weight: bold;
}

.itemInfo {
	margin: 0 0.5rem;
	text-align: left;
}

.price {
	min-width: 6rem;
}

.billingDetails {
	margin-top: 1.5rem;
}

.mdi-cart {
	margin: 0 1rem;
}

label {
	font-size: 0.85rem;
	color: rgb(151, 151, 151);
	margin-right: 0.5rem;
}

.input {
	margin: 1.25rem 0;
	input {
		border-radius: 0;
		border: 0.0625rem solid rgb(214, 214, 214);
		font-size: 1.05rem;
		padding: 0.35rem;
		&:focus {
			outline: none;
		}
	}
}

p {
	font-size: 0.8rem;
}
</style>
