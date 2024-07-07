<template>
  <div :class="$style.wrapper">
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
</style>