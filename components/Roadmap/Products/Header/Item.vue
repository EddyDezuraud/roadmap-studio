<template>
  <div :class="$style.wrapper">
    <div :class="$style.product" :style="{background: gradient}">
        <span>
            {{ product.name }}
        </span>
    </div>

    <!-- {{ product }} -->

    <div v-if="product.product_segments && product.product_segments.length > 0" :class="$style.segments">
        <div v-for="(segment, index) in product.product_segments" :key="segment.id" >
            <RoadmapProductsHeaderSegment :segment="segment" :color="segmentColor(index)" />
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
  width: 100%;
}

.product {
    font-weight: 700;
    font-size: var(--font-size-l);
    color: white;
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
    flex: 1;
    gap: var(--segment-gap);
    position: relative;
}
</style>