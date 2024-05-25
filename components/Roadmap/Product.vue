<template>
    <div :class="$style.wrapper" :style="{background: product.color + '10', color: product.color}">
        <div :class="$style.product" :style="{background: gradient}">
            <span>
                {{ product.name }}
            </span>
        </div>
        <div :class="$style.segments">
            <div v-for="(segment, index) in product.segments" :key="index" >
                <RoadmapSegment :segment="segment" :color="segmentColor(index)" />
                <div v-if="index !== (product.segments.length - 1)" :class="$style.separator"></div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Product } from '~/types/data';

interface Props {
    product: Product
}

const props = defineProps<Props>();

const gradient = computed(() => {
    if(!props.product.color) return 'transparent';
    return `linear-gradient(to bottom, ${useTransformHue(-5, props.product.color)}, ${props.product.color}, ${useTransformHue(5, props.product.color)})`;
});

const segmentColor = computed(() => {
   return (index: number) => {
    // the colest to the middle is closest to the product color, the more to the edges the more it changes
    const distance = Math.abs(index - props.product.segments.length / 2);
    const maxDistance = props.product.segments.length / 2;
    const maxHueChange = 20;
    const hueChange = (distance / maxDistance) * maxHueChange;
    return useTransformHue(hueChange, props.product.color);
   }
});
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

.product {
    font-weight: 700;
    font-size: 13px;
    color: white;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 7px 14px;
    text-align: center;
    width: var(--product-width);
}

.segments {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.separator {
    width: 100%;
    height: 1px;
    background: currentColor;
    margin-top: 15px;
    opacity: 0.5;
}
</style>