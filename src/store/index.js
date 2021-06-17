import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
	state: {
		products: [],
		productCategories: [],
		cartItems: [],
	},
	mutations: {
		UPDATE_PRODUCTS(state, payload) {
			state.products = payload
		},
		UPDATE_PRODUCT_CATEGORIES(state, payload) {
			state.productCategories = payload
		},
		UPDATE_CART_ITEMS(state, payload) {
			state.cartItems = payload
		},
	},
	actions: {
		async getProducts({ commit }, limit) {
			try {
				const { data } = await axios.get('https://fakestoreapi.com/products', { params: { limit } })
				commit('UPDATE_PRODUCTS', data)
			} catch (e) {
				console.warn(e)
			}
		},
		async getProductCategories({ commit }) {
			try {
				const { data } = await axios.get('https://fakestoreapi.com/products/categories')
				commit('UPDATE_PRODUCT_CATEGORIES', data)
			} catch (e) {
				console.warn(e)
			}
		}
	},
	getters: {
		getProducts: (state) => state.products,
		getProductById: (state) => (id) => state.products.find((product) => product.id === id),
		getProductCategories: (state) => state.productCategories,
		getCartItems: (state) => state.cartItems
	}
})
