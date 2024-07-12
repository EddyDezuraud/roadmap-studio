<template>
    <div :class="$style.wrapper">
        <RoadmapTask v-for="(task, index) in line.tasks" :key="index" :task-id="task.id"/>
        <div :class="$style.cursorsList">
            <div v-for="(cursor, index) in weeks" 
                :key="index" 
                @click="onClickCursor(cursor)"
                :class="$style.cursor" 
                :style="{width: cursor.width + 'px'}">
                <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-circle-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M9 12h6" /><path d="M12 9v6" /></svg>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Line, Week} from '@/types/roadmap';
import { roadmapStore } from '~/store/roadmap'

const store = roadmapStore();

interface Props {
    line: Line;
    segmentId: number;
}

const props = defineProps<Props>();

const weeks = computed(() => store.weeks)

const onClickCursor = (cursor: Week) => {
    const newModal = {
        type: 'task',
        show: true,
        id: 0,
        data: {
            line_id: props.line.id,
            segment_id: props.segmentId,
            start_date: cursor.start,
        },
    };
    store.setModal(newModal);
};


</script>

<style module>
.wrapper {
    position: relative;
    width: 100%;
    height: 100%;
}

.wrapper::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: calc(100% + (var(--line-gap) / 2));
    border-bottom: var(--border-dashed);
    z-index: 1;
    pointer-events: none;
    opacity: 0.2;
}

.cursorsList {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    gap: var(--col-gap);
    z-index: 2;
    padding: 5px 0;
}

.cursor {
    height: 100%;
    top: 0;
    flex: 1;
    border-radius: 5px;
    opacity: 0;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: var(--font-size-m);
    font-weight: 600;
    position: relative;
    gap: 5px;
}

.cursor::before {
    content: '';
    position: absolute;
    top: 0;
    left: calc(var(--col-gap) / 2);
    width: calc(100% - var(--col-gap));
    height: 100%;
    background-color: currentColor;
    border-radius: 5px;
    border-radius: 10px;
    opacity: 0.05;
}

.cursor:hover {
    opacity: 0.75;
}

.cursor svg {
    width: 20px;
}
</style>
