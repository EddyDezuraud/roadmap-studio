<template>
    <div :class="$style.wrapper" :style="{'--primary' : color}">
        <div :class="$style.name">
            <span>
                {{ segment.name }}
            </span>
        </div>
        <div :class="$style.lines">
            <RoadmapLine v-for="(line, index) in segment.lines" :key="index" :line="line" />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Segment } from '~/types/roadmap';

interface Props {
    segment: Segment;
    color: string;
}

defineProps<Props>();
</script>

<style module>
.wrapper {
    display: flex;
    color: var(--primary);
    align-items: center;
    flex: 1
}

.name {
    width: var(--segment-width);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 13px;
    height: 100%;
}

.lines {
    display: flex;
    flex-direction: column;
    gap: 5px;
}
</style>