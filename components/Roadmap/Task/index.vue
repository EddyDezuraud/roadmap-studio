<template>
  <div :class="$style.wrapper" :style="taskStyle">
    <div :class="$style.content">
      <span :class="$style.title">{{ task.name }}</span>
    </div>
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

const taskWidth = computed<number>(() => {
  return daySize.value * nbOfDays.value;
});

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
    left: `${taskLeft.value}px`,
    width: `${taskWidth.value}px`,
  }
})

</script>

<style module>
.wrapper {
  position: absolute;
  display: block;
  border: solid 1px var(--primary);
  border-radius: 8px;
}

.content {
  padding: 10px;
}

.title {
  font-size: 13px;
  font-weight: 600;
  color: var(--primary);
}
</style>~/store/roadmap