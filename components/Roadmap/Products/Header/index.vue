<template>
  <div :class="$style.wrapper">
    <div :class="$style.firstEl">
      <GdvButtonIcon icon="plus" size="s" @click="addProduct" />
    </div>
    <div :class="$style.list">
      <div v-for="product in products" :key="product.id">
        <RoadmapProductsHeaderItem :product="product" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product, Column } from '~/types/roadmap';
import { GdvButtonIcon } from "@gedivote/gedivote-ui-vuejs";
import { roadmapStore } from '~/store/roadmap';

interface Props {
    products: Product[]; 
}

const props = defineProps<Props>();

const store = roadmapStore();

const addProduct = () => {
  store.setModal({
    type: 'product',
    show: true,
    id: 0
  });
}
</script>

<style module>
.wrapper {
  width: var(--left-col-size);
  border-right: var(--border);
}

.firstEl {
  height: var(--header-cols-height);
  display: flex;
  padding: 0 10px;
  align-items: center;
  justify-content: flex-end;
}

.list {
  display: flex; 
  flex-direction: column;
  gap: var(--products-gap);
}
</style>