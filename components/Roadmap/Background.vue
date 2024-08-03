<template>
  <div :class="$style.wrapper">
    <div :class="$style.currentDay" :style="currentDayStyle">
      <span :class="$style.dayNumber">
        {{ new Date().getDate() }}
      </span>
    </div>
    <div v-for="col in columns" :key="col.date" :class="$style.col" :style="{width: col.size + 'px'}"></div>
    <div :class="$style.weeks">
      <div v-for="week in weeks" :key="week.index" :class="$style.week" :style="{width: week.width + 'px' }" ></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Column, Week } from '@/types/roadmap';

import { roadmapStore} from '~/store/roadmap';

const store = roadmapStore();

const weeks = computed<Week[]>(() => store.weeks);

const currentDayStyle = computed(() => {
  const leftPosition = useDatePosition(new Date(), store.roadmap.date_start, store.getDaySize);
  return {
    left: leftPosition.value + 'px'
  }
})

interface Props {
    columns: Column[];
}

defineProps<Props>();
</script>

<style module>
.weeks,
.wrapper {
  position: absolute;
  display: flex;
  top: 0;
  left: 0;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

.col {
  border-right: var(--border-dashed);
  display: flex;
  gap: var(--col-gap);
}

.week {
  flex: 1;
  height: 100%;
  position: relative
}

.week::before {
  content: '';
  position: absolute;
  top: 0;
  left: 1px;
  width: calc(100% - 2px);
  height: 100%;
  background-color: rgba(0, 0, 0, 0.02);
  z-index: 1;
}

.currentDay {
  position: absolute;
  top: -10px;
  left: 300px;
  width: 1px;
  height: calc(100% + 10px);
  background: var(--primary);
  z-index: 2;
  opacity: 1;
}

.dayNumber {
  position: absolute;
  bottom: 100%;
  left: 1px;
  transform: translateX(-50%);
  color: white;
  font-size: var(--font-size-xs);
  z-index: 3;
  width: 20px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: var(--primary);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>