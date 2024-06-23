<template>
    <div :class="$style.wrapper">
        <RoadmapTask v-for="(task, index) in line.tasks" :key="index" :task="task"/>
        <div :class="$style.cursorsList">
            <div v-for="(cursor, index) in cursors" 
                :key="index" 
                :class="$style.cursor" 
                :style="{left: cursor.left + 'px', width: (store.colSize / 4) + 'px'}">
                <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-circle-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M9 12h6" /><path d="M12 9v6" /></svg>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Line } from '@/types/roadmap';
import { roadmapStore } from '~/store/roadmap'

const store = roadmapStore();

interface Props {
    line: Line;
}

const props = defineProps<Props>();

const weekSize = computed(() => store.getWeekSize);
const totalWidth = computed(() => store.width);

const listOfUsedDate = computed<Date[]>(() => useTaskConstraints().arrayOfDatesLine(props.line.tasks) );

const cursors = computed(() => {
    const nbOfWeeks = Math.ceil(totalWidth.value / weekSize.value);

    return Array.from({ length: nbOfWeeks }, (_, index) => {

        const listOfDays = useTaskConstraints().getWeekDaysList(index, store.startDate).map(date => date.toString());
        const strListOfUsedDate = listOfUsedDate.value.map(date => date.toString());
        const hasTaskInWeek = listOfDays.some(date => strListOfUsedDate.includes(date));

        if(index === 3) {
            console.log('getWeekDaysList', JSON.stringify(useTaskConstraints().getWeekDaysList(index + 1, store.startDate)));
            console.log('listOfUsedDate', JSON.stringify(listOfUsedDate.value));
            console.log('hasTaskInWeek', hasTaskInWeek);
        }

        if (!hasTaskInWeek) {
            return {
                week: index + 1,
                left: index * weekSize.value,
            };
        }
        return null;
    }).filter(cursor => cursor !== null);
});


</script>

<style module>
.wrapper {
    position: relative;
    width: 100%;
    height: 100%;
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
    position: absolute;
    gap: 5px;
}

.cursor::before {
    content: '';
    position: absolute;
    top: 50%;
    left: calc(var(--col-gap) / 2);
    width: calc(100% - var(--col-gap));
    aspect-ratio: 1/1;
    background-color: currentColor;
    border-radius: 5px;
    transform: translateY(-50%);
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
