<template>
    <div :class="$style.wrapper">
        <RoadmapHeader v-if="columns && columns.length > 0" :columns="columns"/>
        <div :class="$style.inner" v-if="products && products.length > 0">
            <RoadmapProduct v-for="(product, index) in products" :key="index" :product="product" />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Product, Column } from '~/types/roadmap';

interface Props {
    columns: Column[];
    products: Product[]; 
}

const props = defineProps<Props>();
</script>

<style module>
.wrapper {
    width: fit-content;
}

.inner {
    display: flex;
    gap: var(--product-gap);
}
</style>