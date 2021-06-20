<template>
	<div id="nav">
		<router-link to="/">Shop</router-link>
		<router-link to="/cart"
			>Cart
			<span v-if="totalItems > 0">({{ totalItems }})</span>
		</router-link>
	</div>
	<router-view />
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
	setup() {
		const store = useStore()
		const totalItems = computed(() => store.getters.getItemsCount)

		async function init() {
			await store.dispatch('getProducts', 20)
			await store.dispatch('getProductCategories')
		}

		init()

		return { totalItems }
	}
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Arvo&family=Montserrat:wght@400;600;800&display=swap');

#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	font-family: 'Montserrat', sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}

body {
	margin: 0;
}

#nav {
	padding: 1.5rem;
	font-size: 1.25rem;
	background-color: rgb(238, 255, 224);
	box-shadow: 0 4px 5px -2px gray;

	a {
		font-weight: bold;
		color: #2c3e50;
		margin: 1rem;
		text-decoration: none;

		&.router-link-exact-active {
			border-bottom: 0.125rem solid #42b983;
		}

		&:hover {
			border-bottom: 0.125rem solid #42b983;
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

	&:hover {
		cursor: pointer;
		opacity: 0.85;
	}

	&.button--red {
		background: rgb(202, 60, 60);
	}

	&.button--green {
		background: rgb(28, 184, 65);
	}
}
</style>
