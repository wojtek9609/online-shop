import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    products: [],
  },
  mutations: {
    setProducts(state, products) {
      state.products = [...products];
    },
  },
  actions: {
    async getProducts(state, limit) {
      try {
        const response = await axios.get("https://fakestoreapi.com/products", { params: { limit }});
        if (response.status === 200) state.commit("setProducts", response.data);
      } catch (e) {
        console.warn(e);
      }
    },
  },
  getters: {
    getProducts: (state) => state.products,
  },
});
