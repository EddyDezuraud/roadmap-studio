<template>
  <div :class="$style.wrapper">
    <div :class="$style.firstEl"></div>
    <div v-for="product in products" :key="product.id">
      <RoadmapProductsHeaderItem :product="product" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product, Column } from '~/types/roadmap';

interface Props {
    products: Product[]; 
}

const props = defineProps<Props>();
</script>

<style module>
.wrapper {
  width: var(--left-col-size);
  border-right: var(--border);
}

.firstEl {
  height: var(--header-cols-height);
  border-bottom: var(--border);
  background: var(--grey);
}
</style>