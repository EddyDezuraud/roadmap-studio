<template>
  <div :class="$style.wrapper">
    <div v-for="col in columns" :key="col.name" :class="$style.col"></div>
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
}

</style>