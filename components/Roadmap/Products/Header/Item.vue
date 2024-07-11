<template>
  <div :class="$style.wrapper">
    <div :class="$style.header" :style="{color: useTransformHue(-5, product.color)}">
        <span>
            {{ product.name }}
        </span>
    </div>
    <div :class="$style.inner">
        <div :class="$style.product" :style="{background: gradient}"></div>

        <div v-if="segmentsOrdered && segmentsOrdered.length > 0" :class="$style.segments">
            <div v-for="(segment, index) in segmentsOrdered" :key="segment.id" >
                <RoadmapProductsHeaderSegment :segment="segment" :color="segmentColor(index)" />
            </div>
        </div>
    </div>

    <button :class="$style.addProduct">
        <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="1.5"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-circle-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M9 12h6" /><path d="M12 9v6" /></svg>
        <span>
            Nouveau produit
        </span>
    </button>

  </div>
</template>

<script lang="ts" setup>
import type { Product } from '~/types/roadmap';

interface Props {
    product: Product
}

const props = defineProps<Props>();

const segmentsOrdered = computed(() => {
    return props.product.product_segments.sort((a, b) => a.index - b.index);
});

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
    position: relative;
}

.inner {
    display: flex;
    width: 100%;
    padding-bottom: 20px;
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

.addProduct {
    position: absolute;
    top: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    font-size: var(--font-size-m);
    gap: 5px;
    padding: 4px 2px;
    opacity: 0.5;
    cursor: pointer;
    font-weight: 600;
    color: currentColor;
    border: none;
    border: 1px dashed currentColor;
}

.addProduct:hover {
    opacity: 1;
}

.addProduct svg {
    width: 16px;
    height: 16px;
}
</style>