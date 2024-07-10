<template>
    <div :class="$style.wrapper" :style="{'--primary' : color, height: getHeight}">
        <div :class="$style.name">
            <span>
                {{ segment.name }}
            </span>
        </div>
        <button :class="$style.addSegment">
            <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="1.5"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-circle-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M9 12h6" /><path d="M12 9v6" /></svg>
            <span>
                Nouveau segment
            </span>
        </button>
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
    /* border-bottom: var(--border); */
    position: relative;
}

.wrapper:hover {
    z-index: 4;
}

.wrapper::before {
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

.name {
    width: var(--segment-width);
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 0 10px;
    font-weight: 600;
    font-size: var(--font-size-m);
    height: 100%;
}

.addSegment {
    position: absolute;
    top: calc(100% + (var(--segment-gap) / 2));
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    font-size: var(--font-size-s);
    gap: 5px;
    padding: 4px 2px;
    transform: translateY(-50%);
    opacity: 0;
    cursor: pointer;
    font-weight: 600;
    color: currentColor;
    border: none;
    background: white;
}

.addSegment:hover {
    opacity: 1;
}

.addSegment svg {
    width: 16px;
    height: 16px;
}
</style>