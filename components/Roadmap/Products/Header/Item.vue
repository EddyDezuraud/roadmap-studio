<template>
  <div :class="$style.wrapper">
    <div :class="$style.header" :style="{color: useTransformHue(-5, product.color)}">
        <span>
            {{ product.name }}
        </span>
        <!-- <GdvButtonIcon icon="dots-vertical" size="s" /> -->
    </div>
    <div :class="$style.inner">
        <div :class="$style.product" :style="{background: gradient}"></div>

        <div v-if="props.product.product_segments && props.product.product_segments.length > 0" :class="$style.segments">
            <div v-for="(segment, index) in segmentsOrdered" :key="segment.id" >
                <RoadmapProductsHeaderSegment :segment="segment" :color="segmentColor(index)" />
            </div>
        </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Product } from '~/types/roadmap';
import { GdvButtonIcon } from "@gedivote/gedivote-ui-vuejs";

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
}

.header {
    height: var(--product-header-height);
    position: relative;
    display: flex;
    align-items: center;
    padding: 0 10px;
    font-weight: 600;
    font-size: 12px;
    text-align: left;
    justify-content: space-between;
    gap: 10px;
}

.header::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 1;
    z-index: 0;
    box-sizing: border-box;
    background-color: currentColor;
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