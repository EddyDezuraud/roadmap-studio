<template>
    <div :class="$style.wrapper" :style="{color: product.color, width: roadmapWidth}">
        <div v-if="product.product_segments && product.product_segments.length > 0" :class="$style.segments">
            <div v-for="(segment, index) in product.product_segments" :key="segment.id" :style="{'--primary' : segmentColor(index), color: 'var(--primary)'}" :class="$style.segment">
                <div v-for="line in segment.lines" :key="line.id" :class="$style.line">
                    <RoadmapLine :line="line" :segment-id="segment.id" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Product } from '~/types/roadmap';

const store = roadmapStore();

interface Props {
    product: Product
}

const props = defineProps<Props>();

const segmentColor = computed(() => {
   return (index: number) => {
    return useSegmentColor(index, props.product.color, props.product.product_segments.length);
   }
});

const roadmapWidth = computed(() => {
    return `${store.width}px`;
});

</script>

<style module>
.wrapper {
    display: flex;
    gap: var(--product-gap);
    padding: var(--product-padding);
    border-radius: 10px;
    gap: var(--product-gap);
    width: 100%;
}

.wrapper {
    padding-top: var(--product-header-height);
}

.segments,
.segment,
.line {
    width: 100%;
}


.line {
    height: var(--segment-line-height);
    /* border-bottom: var(--border); */
}

.separator {
    width: 100%;
    height: 1px;
    background: currentColor;
    margin-top: 15px;
    opacity: 0.5;
}

.segments {
    display: flex;
    flex-direction: column;
    gap: var(--segment-gap);
    flex: 1;
}

.segment {
    position: relative;
}

.segment::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--primary);
    opacity: 0.05;
    z-index: 0;
}

.segment > * {
    position: relative;
    z-index: 1;
}

.segment .line:not(:last-child) {
    /* border-bottom: var(--border); */
}
</style>