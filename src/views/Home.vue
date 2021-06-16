<template>
  <div class="home" :key="products">
    <ProductBox
      v-for="product in products"
      :key="product.id"
      :product="product"
    />
    {{ products.length }}
  </div>
</template>

<script>
import { computed } from "vue";
import ProductBox from "../components/ProductBox.vue";
import store from "../store/index";

export default {
  name: "Home",
  components: {
    ProductBox,
  },
  setup() {
    store.dispatch("getProducts", 5);
    const products = computed(() => store.getters.getProducts);
    return { products };
  },
};
</script>
