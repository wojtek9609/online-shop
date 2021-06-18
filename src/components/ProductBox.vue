<template>
	<div class="product" @click="$router.push({ path: `/product/${product.id}` })">
		<img class="productImage" :src="product.image" alt="productImage" />
		<div class="info">
			<div class="title">{{ product.title }}</div>
			<div class="price">{{ product.price }} $</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ProductBox',
	props: {
		product: Object
	}
}
</script>

<style lang="scss" scoped>
.product {
	display: flex;
	justify-content: left;
	padding: 1.5rem 1rem;
	border-bottom: 0.0625rem solid rgb(226, 226, 226);

	&:hover {
		cursor: pointer;
		background-color: rgb(224, 224, 224);
	}
}

.title {
	font-size: 1.15rem;
	font-weight: bold;
}

.price {
	font-size: 1.15rem;
	font-weight: bold;
	margin: 0.75rem 0;
}

img.productImage {
	width: 6rem;
	height: 6rem;
}

.info {
	margin-left: 2rem;
}
</style>
