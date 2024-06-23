<template>
  <div :class="$style.wrapper">
    <div v-for="col in columns" :key="col.name" :class="$style.col">
      <div v-for="week in Array.from({ length: 4 })" :class="$style.week"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Column } from '@/types/data';

interface Props {
    columns: Column[];
}

defineProps<Props>();
</script>

<style module>
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
  width: var(--col-size);
  border-right: var(--border);
  display: flex;
  gap: var(--col-gap);
  padding: 0 1px;
}

.week {
  flex: 1;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.02);
}

</style>