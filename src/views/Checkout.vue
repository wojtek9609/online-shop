<template>
	<div v-if="cartItems.length > 0" class="checkout">
		<div class="header">
			Cart summary
			<mdicon name="cart" />
		</div>
		<div class="item" v-for="item in cartItems" :key="item.id">
			<div class="itemInfo">{{ item.quantity }}x {{ item.title }}</div>
			<div class="totalItemPrice">{{ (item.quantity * item.price).toFixed(2) }} $</div>
		</div>
		<div class="subtotal">
			<span>Subtotal:</span>
			<span>{{ totalPrice }}$</span>
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
				<div class="input--radio">
					<input type="radio" id="free" value="0" v-model="shipping" />
					<label for="free">Free shipping 0.00 $</label>
				</div>
				<div class="input--radio">
					<input type="radio" id="standard" value="10" v-model="shipping" />
					<label for="standard">Standard 10.00 $</label>
				</div>
				<div class="input--radio">
					<input type="radio" id="express" value="25" v-model="shipping" />
					<label for="express">Express 25.00 $</label>
				</div>
			</div>
			<p>By clicking the button you accept the <strong> Terms and contitions </strong>.</p>
			<button class="button button--green">Place order</button>
		</form>
	</div>
</template>

<script>
import { useStore } from 'vuex'
import { computed, ref } from 'vue'

export default {
	setup() {
		const store = useStore()
		const cartItems = computed(() => store.getters.getCartItems)
		const totalPrice = computed(() => store.getters.getTotalPrice)
		const shipping = ref(0)

		return { cartItems, totalPrice, shipping }
	}
}
</script>

<style lang="scss" scoped>
$border-default: solid 0.125px rgb(214, 214, 214);
.checkout {
	width: 35rem;
	margin: auto;
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

.subtotal {
	padding: 1.5rem 0;
	display: flex;
	justify-content: space-between;
	border-bottom: $border-default;
}

.itemInfo {
	margin: 0 0.5rem;
	text-align: left;
}

.totalItemPrice {
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
