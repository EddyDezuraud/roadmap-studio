<template>
  <div :class="$style.wrapper">
    <div :class="$style.header" :style="{color: useTransformHue(-5, product.color)}">
        <span>
            {{ product.name }}
        </span>
    </div>
    <div :class="$style.inner">
        <div :class="$style.product" :style="{background: gradient}"></div>

        <div v-if="product.product_segments && product.product_segments.length > 0" :class="$style.segments">
            <div v-for="(segment, index) in product.product_segments" :key="segment.id" >
                <RoadmapProductsHeaderSegment :segment="segment" :color="segmentColor(index)" />
            </div>
        </div>
    </div>
    
  </div>
</template>

<script lang="ts" setup>
import type { Product } from '~/types/roadmap';

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
    return useSegmentColor(index, props.product.color, props.product.product_segments.length);
   }
});
</script>

<style module>
.wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.inner {
    display: flex;
    width: 100%;
}

.header {
    height: var(--product-header-height);
    position: relative;
    display: flex;
    align-items: center;
    padding-left: 5px;
    font-weight: 600;
    font-size: 10px;
    text-align: center;
    text-transform: uppercase;
    justify-content: center;
}

.header::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: currentColor;
    opacity: 1;
    z-index: 0;
    border-radius: 5px 0 0 0;
}

.header > span {
    position: relative;
    color: white;
    z-index: 1;
}

.product {
    font-weight: 700;
    font-size: var(--font-size-l);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: var(--product-width);
    font-size: 0;
    border-radius: 0 0 0 5px;
}

.segments {
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: var(--segment-gap);
    position: relative;
}
</style>