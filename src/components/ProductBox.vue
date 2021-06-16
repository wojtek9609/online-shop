<template>
  <div>
    {{ product.id }}
    {{ product.title }}
    {{ product.price }}
  </div>
</template>

<script>
export default {
  props: {
      product: Object
  }
};
</script>

<style lang="scss" scoped></style>
