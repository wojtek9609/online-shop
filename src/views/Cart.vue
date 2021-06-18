<template>
	<div class="wrapper">
		<div class="cartItems">
			<ProductInCartBox v-for="product in cartItems" :key="product.id" :product="product" />
		</div>
		<Summary />
	</div>
</template>

<script>
import { computed } from 'vue'
import ProductInCartBox from '../components/ProductInCartBox.vue'
import Summary from '../components/Summary.vue'
import store from '../store/index'

export default {
	components: {
		ProductInCartBox,
		Summary
	},
	setup() {
		const cartItems = computed(() => store.getters.getCartItems)
		return { cartItems }
	}
}
</script>

<style lang="scss" scoped>
.wrapper {
	width: 100%;
	display: flex;
}

.cartItems {
	width: 66%;
  margin-right: 2.5rem;
}
</style>
