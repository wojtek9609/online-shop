<template>
	<div class="product" v-if="product">
		<img class="productImage" :src="product.image" alt="productImage" />
		<div class="title">{{ product.title }}</div>
		<div class="price">{{ product.price }} $</div>
		Description:
		<div class="description">{{ product.description }}</div>
		<AddToCartButton :product="product" />
	</div>
</template>

<script>
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import AddToCartButton from '../components/AddToCartButton.vue'

export default {
	name: 'Product',
	components: {
		AddToCartButton
	},
	setup() {
		const store = useStore()
		const route = useRoute()
		const product = computed(() => store.getters.getProductById(parseInt(route.params.id)))

		return { product }
	}
}
</script>

<style lang="scss" scoped>
.product {
	width: 80%;
	margin: auto;
	padding: 1.5rem;
	border: 0.0625rem solid rgb(226, 226, 226);
}

img.productImage {
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
}

.description {
	width: 100%;
	margin: 0.75rem 0 1.5rem;
}

.button--add {
	margin: 1rem 0;
}
</style>
