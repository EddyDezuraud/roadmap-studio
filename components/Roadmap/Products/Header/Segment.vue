<template>
    <div :class="$style.wrapper" :style="{'--primary' : color, height: getHeight}">
        <div :class="$style.name">
            <span>
                {{ segment.name }}
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Segment } from '~/types/roadmap';

interface Props {
    segment: Segment;
    color: string;
}

const props = defineProps<Props>();

const getHeight = computed<string>(() => {
    return `calc(${props.segment.lines.length} * var(--segment-line-height))`;
});
</script>

<style module>
.wrapper {
    display: flex;
    color: var(--primary);
    align-items: center;
    flex: 1;
    border-bottom: var(--border);
}

.name {
    width: var(--segment-width);
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 0 10px;
    font-weight: 600;
    font-size: 13px;
    height: 100%;
}
</style>