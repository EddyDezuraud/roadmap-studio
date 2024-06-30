<template>
  <div v-if="task" :class="$style.wrapper">
    <div :class="$style.phantom"></div>
    <div :class="$style.item" :style="taskStyle">
      <div :class="$style.content" 
          @mousedown="startDrag" 
          @touchstart="startDrag"
          @click="onOpenEdit">
        <span :class="$style.title">{{ task.name }}</span>
        <span :class="$style.subtitle">{{ task.subtitle }}</span>
      </div>
      <RoadmapTaskStages :task-stages="task.task_stages" />
    </div>
  </div>
  
</template>

<script lang="ts" setup>
import type { Task } from '@/types/roadmap'
import { roadmapStore } from '~/store/roadmap'

const store = roadmapStore();

interface Props {
  taskId: number
}

const props = defineProps<Props>()

const daySize = computed<number>(() => store.getDaySize);

const task = computed<Task | undefined>(() => store.tasks.find(task => task.id === props.taskId));

const dragController = ref({
  isDragging: false,
  startX: 0,
  accumulatedDiff: 0,
  lastValue: 0
});

const taskLeft = computed<number>(() => {
  if(!task.value) return 0;
  const roadmapStartDate = new Date(store.startDate);
  const taskStartDate = new Date(task.value.start_date);
  
  let workingDays = 0;
  const currentDate = new Date(roadmapStartDate);
  
  while (currentDate <= taskStartDate) {
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
  if(task.value) {
    store.setModal({type: 'task', id: task.value.id, show: true});
  }
};

const stopDrag = () => {
  dragController.value.isDragging = false;
  document.removeEventListener('mousemove', onDrag);
  document.removeEventListener('touchmove', onDrag);
  document.removeEventListener('mouseup', stopDrag);
  document.removeEventListener('touchend', stopDrag);
};

const startDrag = (event: MouseEvent | TouchEvent) => {
  dragController.value.isDragging = true;
  dragController.value.startX = 'touches' in event ? event.touches[0].clientX : event.clientX;
  dragController.value.accumulatedDiff = 0;
  dragController.value.lastValue = taskLeft.value;
  document.addEventListener('mousemove', onDrag);
  document.addEventListener('touchmove', onDrag);
  document.addEventListener('mouseup', stopDrag);
  document.addEventListener('touchend', stopDrag);
};

const updateDate = (diff: number) => {
  if(task.value) {
    const startDate = new Date(task.value.start_date);
    let daysToMove = diff;

    while (daysToMove !== 0) {
      // Avancer ou reculer d'un jour
      startDate.setDate(startDate.getDate() + Math.sign(daysToMove));
      
      // Vérifier si c'est un jour de semaine (lundi à vendredi)
      if (startDate.getDay() !== 0 && startDate.getDay() !== 6) {
        // Si c'est un jour de semaine, décrémenter le compteur
        daysToMove -= Math.sign(daysToMove);
      }
    }

    const newStartDate = startDate.toISOString().split('T')[0]; // Format YYYY-MM-DD
    store.updateTaskStartDate(task.value.id, newStartDate);
  }

}


const onDrag = (event: MouseEvent | TouchEvent) => {
  if (!dragController.value.isDragging) return;

  if(!task.value) return;
  
  const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
  const diffX = clientX - dragController.value.startX;
  dragController.value.accumulatedDiff += diffX;
  
  const steps = Math.floor(Math.abs(dragController.value.accumulatedDiff) / daySize.value) * Math.sign(dragController.value.accumulatedDiff);
  
  if (steps !== 0) {
    const newValue = dragController.value.lastValue + steps;
    if (newValue < 0) return;
    updateDate(newValue);
    dragController.value.lastValue = newValue;
    dragController.value.accumulatedDiff = dragController.value.accumulatedDiff % daySize.value;
  }
  
  dragController.value.startX = clientX;
};

</script>

<style module>
.item {
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

.item::after,
.item::before {
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

.item::after {
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