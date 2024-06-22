<template>
    <div :class="$style.wrapper" :style="{background: product.color + '10', color: product.color}">
        <div v-if="product.product_segments && product.product_segments.length > 0" :class="$style.segments">
            <div v-for="(segment, index) in product.product_segments" :key="segment.id" >
                <div v-for="line in segment.lines" :key="line.id" :class="$style.line">
                    {{ line }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Product } from '~/types/roadmap';

interface Props {
    product: Product
}

defineProps<Props>();
</script>

<style module>
.wrapper {
    display: flex;
    gap: var(--product-gap);
    padding: var(--product-padding);
    border-radius: 10px;
    gap: var(--product-gap);
    min-width: 100%;
}


.line {
    height: var(--segment-line-height);
    border-bottom: var(--border);
}

.separator {
    width: 100%;
    height: 1px;
    background: currentColor;
    margin-top: 15px;
    opacity: 0.5;
}
</style>