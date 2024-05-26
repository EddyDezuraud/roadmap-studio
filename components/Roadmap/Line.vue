<template>
    <div :class="$style.wrapper" :style="{height: computedHeight}">
        <RoadmapTask v-for="(task, index) in line.tasks" :key="index" :task="task" @init="heightCallback"/>
    </div>
</template>

<script setup lang="ts">
import type { Line } from '@/types/data';

interface Props {
    line: Line;
}

defineProps<Props>();

const height = ref(0);

const computedHeight = computed(() => {
    return `${height.value}px`;
})

const heightCallback = (num: number) => {
    if(num > height.value) {
        height.value = num;
    }
}

</script>

<style module>
.wrapper {
    position: relative;
    width: 100%;
}
</style>