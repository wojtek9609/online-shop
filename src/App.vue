<template>
	<div id="nav">
		<router-link to="/">Shop</router-link>
		<router-link to="/cart">Cart</router-link>
	</div>
	<router-view />
</template>

<script>
import store from './store/index'

export default {
	setup() {
		async function init() {
			await store.dispatch('getProducts', 20)
			await store.dispatch('getProductCategories')
		}

		init()
	}
}
</script>

<style lang="scss">
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}

#nav {
	padding: 30px;

	a {
		font-weight: bold;
		color: #2c3e50;

		&.router-link-exact-active {
			color: #42b983;
		}
	}
}

.button {
	color: white;
	border-radius: 0.25rem;
	text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
	height: 2rem;
	padding: 0.5rem 0.75rem;
	background: rgb(66, 184, 221);
	border-color: transparent;

	&:hover{
		cursor: pointer;
		opacity: 0.75;
	}
}
</style>
