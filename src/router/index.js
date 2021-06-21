import { createRouter, createWebHistory } from 'vue-router'
import ProductList from '../views/ProductList.vue'
import Cart from '../views/Cart.vue'
import Product from '../views/Product.vue'
import Checkout from '../views/Checkout.vue'
import ThankYouPage from '../views/ThankYouPage.vue'

const routes = [
	{
		path: '/',
		name: 'ProductList',
		component: ProductList
	},
	{
		path: '/cart',
		name: 'Cart',
		component: Cart
	},
	{
		path: '/checkout',
		name: 'Checkout',
		component: Checkout
	},
	{
		path: '/product/:id',
		name: 'Product',
		component: Product
	},
	{
		path: '/thank-you',
		name: 'ThankYouPage',
		component: ThankYouPage
	}
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router
