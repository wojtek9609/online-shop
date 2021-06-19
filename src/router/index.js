import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Cart from "../views/Cart.vue";
import Product from "../views/Product.vue";
import Checkout from "../views/Checkout.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
  },
  {
    path: "/checkout",
    name: "Checkout",
    component: Checkout,
  },
  {
    path: "/product/:id",
    name: "Product",
    component: Product
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
