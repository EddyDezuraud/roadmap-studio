<template>
  <div :class="$style.wrapper" :style="taskStyle">
    <div :class="$style.content">
      <span :class="$style.title">{{ task.name }}</span>
      <span :class="$style.subtitle">{{ task.subtitle }}</span>
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

const nbOfDays = computed<number>(() => {
  // additionner l'ensemble des jours de props.task.task_stages[].duration
  return props.task.task_stages.reduce((acc, stage) => acc + stage.duration, 0);
});

const daySize = computed<number>(() => store.getDaySize);

const taskLeft = computed<number>(() => {
  // compare store date start with task start date
  const roadmapStartDate = store.startDate;
  const taskStartDate = new Date(props.task.start_date);
  // return the number of days between the two dates
  const diffTime = Math.abs(taskStartDate.getTime() - roadmapStartDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays * daySize.value;
});

const taskStyle = computed(() => {
  return {
    left: `${taskLeft.value}px`
  }
})

</script>

<style module>
.wrapper {
  position: absolute;
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
}

.title {
  font-size: 13px;
  font-weight: 600;
  color: var(--primary);
}

.subtitle {
  font-size: 11px;
  font-weight: 600;
  opacity: 0.75;
}
</style>~/store/roadmap