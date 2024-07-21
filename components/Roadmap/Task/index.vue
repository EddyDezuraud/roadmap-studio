<template>
  <div v-if="task" ref="wrapperRef" :class="[$style.wrapper, {[$style.openTools] : openTools}]">
    <div :class="$style.phantom"></div>
    <div :class="$style.item" :style="taskStyle">
      <button :class="$style.toolButton" @click="openTools = !openTools">
          <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-dots"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M19 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /></svg>
      </button>
      <div :class="$style.content" 
          @mousedown="startDrag" 
          @touchstart="startDrag">
        <span 
          :class="[$style.title, $style.editable]"
          contenteditable="true" 
          @input="updateTaskName"
          v-text="taskName"
          spellcheck="false"
          ></span>
        <span :class="[$style.subtitle, $style.editable]"
          contenteditable="true" 
          @input="updateTaskSubtitle"
          v-text="taskSubtitle"
          spellcheck="false"></span>
      </div>
      <RoadmapTaskStages :task-stages="task.task_stages" />
      <RoadmapTaskEditor v-if="openTools" :task-id="task.id" :line-index="lineIndex" :product-index="productIndex" :segment-index="segmentIndex" :task-index="taskIndex" @close="openTools = false" />
    </div>
  </div>
  
</template>

<script lang="ts" setup>
import type { Task } from '@/types/roadmap'
import { roadmapStore } from '~/store/roadmap'

const store = roadmapStore();

interface Props {
  task: Task,
  taskIndex: number,
  productIndex: number,
  segmentIndex: number,
  lineIndex: number
}

const props = defineProps<Props>()

const daySize = computed<number>(() => store.getDaySize);

// const task = computed<Task | undefined>(() => store.tasks.find(task => task.id === props.task.id));
const openTools = ref(false);
const taskName = ref();
const updateTaskName = (event: InputEvent) => {
  if(props.task) {
    store.updateTaskField('title',taskName.value, props.taskIndex, props.productIndex, props.segmentIndex, props.lineIndex);
  }
};

const taskSubtitle = ref();
const updateTaskSubtitle = (event: InputEvent) => {
  // if(props.task) {
  //   store.updateTaskName(props.task.id, taskName.value);
  // }
};

const dragController = ref({
  isDragging: false,
  startX: 0,
  accumulatedDiff: 0,
  lastValue: 0
});

const stagesWidth = computed(() => {
  if(!props.task) return 0;
  return props.task.task_stages.reduce((acc, stage) => acc + stage.duration, 0) * daySize.value;
})

const taskLeft = computed<number>(() => {
  if(!props.task) return 0;
  const roadmapStartDate = new Date(store.startDate);
  const taskStartDate = new Date(props.task.start_date);
  
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
    left: `${taskLeft.value}px`,
    maxWidth: `${stagesWidth.value}px`
  }
})

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
  if(props.task) {
    const startDate = new Date(props.task.start_date);
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
    store.updateTaskStartDate(props.task.id, newStartDate);
  }

}


const onDrag = (event: MouseEvent | TouchEvent) => {
  if (!dragController.value.isDragging) return;

  if(!props.task) return;
  
  const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
  const diffX = clientX - dragController.value.startX;
  dragController.value.accumulatedDiff += diffX;
  
  const steps = Math.floor(Math.abs(dragController.value.accumulatedDiff) / daySize.value) * Math.sign(dragController.value.accumulatedDiff);
  
  if (steps !== 0) {
    const newValue = dragController.value.lastValue + steps;
    if (newValue < 0) return;
    console.log(newValue, steps, dragController.value.accumulatedDiff, daySize.value);
    // updateDate(newValue);
    dragController.value.lastValue = newValue;
    dragController.value.accumulatedDiff = dragController.value.accumulatedDiff % daySize.value;
  }
  
  dragController.value.startX = clientX;
};

const wrapperRef = ref<HTMLElement | null>(null);

const handleClickOutside = (event: MouseEvent) => {
    if (openTools.value && wrapperRef.value && !wrapperRef.value.contains(event.target as Node)) {
        openTools.value = false;
    }
};

const initData = () => {
  taskName.value = props.task.name;
  taskSubtitle.value = props.task.subtitle;
}

onMounted(() => {
  initData();
    document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
});

watch(() => props.task.name, (newName) => {
  taskName.value = newName;
}, { immediate: true });
</script>

<style module>
.open {
  z-index: 4;
  position: relative;
}

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
  /* box-shadow: 0px 10px 10px -10px rgba(0, 0, 0, 0.1); */
}

.item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* background: var(--bloc-background); */
  border: solid 1px currentColor;
  border-radius: 10px;
  opacity: 0.5;
  z-index: 0;
  transition: opacity 0.3s;
  border-radius: 10px;
  box-sizing: border-box;
}

.item::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--primary);
  opacity: 0.1;
  z-index: 0;
  transition: opacity 0.3s;
  border-radius: 10px;
}


.item:hover::after {
  opacity: 0.05;
}

.content {
  position: relative;
  z-index: 1;
  /* padding: 0 0 10px 0; */
  padding: 5px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: flex-start;
  position: sticky;
  left: 0;
}


.title {
  font-size: var(--font-size-m);
  font-weight: 600;
  color: var(--primary);
}

.subtitle {
  font-size: var(--font-size-s);
  font-weight: 600;
  opacity: 0.75;
}

.toolButton {
    position: absolute;
    top: 2px;
    right: 2px;
    background: transparent;
    border: none;
    cursor: pointer;
    opacity: 0;
    width: 24px;
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    z-index: 3;
    background: rgba(255, 255, 255, 0.5);
    color: var(--dark-100);
    transition: opacity 0.1s;
}

.toolButton svg {
    width: 16px;
    height: 16px;
}

.openTools .toolButton,
.wrapper:hover .toolButton {
    opacity: 1;
}

.openTools .toolButton,
.toolButton:hover {
    background: white;
}

.editable {
  position: relative;
  padding: 4px;
  
  white-space: nowrap;
  overflow: hidden;
  max-width: 100%;
  text-overflow: ellipsis;
}

.editable:focus {
  outline: none;
}
.editable::before {
  position: absolute;
  content: '';
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--primary);
  opacity: 0;
  border-radius: 4px;
  pointer-events: none;
}
.editable:hover::before {
  opacity: 0.05;
}
</style>