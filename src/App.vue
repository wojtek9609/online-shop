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

html {
	font-size: 16px;
	@media screen and (max-width: 768px) {
		font-size: 12px;
	}
}

body {
	margin: 0;
}

#app {
	font-family: 'Montserrat', sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
}

#nav {
	padding: 1.5rem;
	font-size: 1.25rem;
	text-align: center;
	background-color: rgb(247, 251, 243);
	box-shadow: 0 4px 5px -2px gray;

	a {
		margin: 1rem;
		color: #2c3e50;
		font-weight: bold;
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
	padding: 0.5rem 0.75rem;
	color: white;
	border-radius: 0.25rem;
	border-color: transparent;
	background-color: rgb(66, 184, 221);
	text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);

	&:hover {
		cursor: pointer;
		opacity: 0.85;
	}

	&:disabled {
		cursor: not-allowed;
		pointer-events: all !important;
		opacity: 0.5;
	}

	&.button--red {
		background-color: rgb(202, 60, 60);
	}

	&.button--green {
		background-color: rgb(28, 184, 65);
	}
}
</style>
