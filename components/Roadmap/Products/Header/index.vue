<template>
  <div :class="$style.wrapper">
    <div :class="$style.firstEl"></div>
    <div :class="$style.list">
      <div v-for="product in products" :key="product.id">
        <RoadmapProductsHeaderItem :product="product" />
      </div>
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
}

.list {
  display: flex; 
  flex-direction: column;
  gap: var(--products-gap);
}
</style>