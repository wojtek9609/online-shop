<template>
	<div class="summary">
		<div class="total">Total price: {{ total }} $</div>
		<div class="checkout">Proceed to checkout</div>
	</div>
</template>

<script>
import { computed } from 'vue'
import store from '../store/index'

export default {
	name: 'Summary',
	setup() {
		const total = computed(() => store.getters.getTotalPrice)

		return { total }
	}
}
</script>

<style lang="scss" scoped>
.summary {
	height: 20rem;
	width: 15rem;
	border: 0.125rem solid grey;
}
</style>
