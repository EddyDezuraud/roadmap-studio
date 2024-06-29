<template>
  <div :class="$style.wrapper" :style="taskStyle">
    <div :class="$style.content" @click="onOpenEdit">
      <span :class="$style.title">{{ task.name }}</span>
      <span :class="$style.subtitle">{{ task.subtitle }} - {{task.start_date}}</span>
    </div>
    <RoadmapTaskStages :task-stages="task.task_stages" />
  </div>
</template>

<script lang="ts" setup>
import type { Task } from '@/types/roadmap'
import { roadmapStore } from '~/store/roadmap'

const store = roadmapStore();

interface Props {
  task: Task
}

const props = defineProps<Props>()

const daySize = computed<number>(() => store.getDaySize);

const taskLeft = computed<number>(() => {
  const roadmapStartDate = new Date(store.startDate);
  const taskStartDate = new Date(props.task.start_date);
  
  let workingDays = 0;
  const currentDate = new Date(roadmapStartDate);
  
  while (currentDate <= taskStartDate) {
    // getDay() retourne 0 pour dimanche, 1 pour lundi, ..., 6 pour samedi
    if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
      workingDays++;
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return workingDays * daySize.value;
});

const taskStyle = computed(() => {
  return {
    left: `${taskLeft.value}px`
  }
})

const onOpenEdit = () => {
  store.setModal({type: 'task', id: props.task.id, show: true});
}

</script>

<style module>
.wrapper {
  position: absolute;
  z-index: 3;
  top: var(--segment-padding);
  border-radius: 10px;
  color: var(--primary);
  height: var(--product-height);
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.wrapper::after,
.wrapper::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--primary);
  opacity: 0.1;
  z-index: 0;
  border-radius: 10px;
}

.wrapper::after {
  border-radius: 10px;
  border: solid 1px var(--primary);
  background: transparent;
  opacity: 0.75;
  box-sizing: border-box;
}

.content {
  position: relative;
  z-index: 1;
  /* padding: 0 0 10px 0; */
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  cursor: pointer;
}

.title {
  font-size: var(--font-size-l);
  font-weight: 600;
  color: var(--primary);
}

.subtitle {
  font-size: var(--font-size-m);
  font-weight: 600;
  opacity: 0.75;
}
</style>~/store/roadmap