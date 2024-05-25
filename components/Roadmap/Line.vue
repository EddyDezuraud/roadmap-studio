<template>
    <div :class="$style.wrapper">
        <RoadmapTask v-for="(task, index) in line.tasks" :key="index" :task="task" />
    </div>
</template>

<script setup lang="ts">
import type { Line } from '@/types/data';

interface Props {
    line: Line;
}

defineProps<Props>();
</script>

<style module>
.wrapper {
    display: flex;
    gap: 5px;
}
</style>