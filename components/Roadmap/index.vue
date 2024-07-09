<template>
    <div :class="$style.wrapper">
        <RoadmapProductsHeader :products="products" />
        <div :class="$style.content">
            <div :class="$style.contentInner">
                <RoadmapHeader v-if="columns && columns.length > 0" :columns="columns"/>
                <div :class="$style.inner" v-if="products && products.length > 0">
                    <div :class="$style.product">
                        <RoadmapProduct v-for="(product, index) in products" :key="index" :product="product" />
                    </div> 
                    <RoadmapBackground :columns />
                </div>
            </div>
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
    display: flex;
    height: 100%;
}

.leftSide {
    width: var(--left-col-size);
    background-color: #f0f0f0;
}

.content {
    width: calc(100vw - var(--left-col-size));
    overflow: auto;
}

.contentInner {
    width: fit-content;
}

.inner {
    position: relative;
    display: flex;
    gap: var(--product-gap);
}
</style>