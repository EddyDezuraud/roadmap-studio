<template>
    <div :class="$style.wrapper">
        <RoadmapHeader :columns="data.columns" :meta-data="data.metaData" />
        <div :class="$style.inner">
            <RoadmapProduct v-for="(product, index) in data.products" :key="index" :product="product" />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { DataModel } from '@/types/data';

interface Props {
    data: DataModel; 
}

defineProps<Props>();
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