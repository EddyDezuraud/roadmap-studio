<template>
  <div :class="$style.wrapper">
    <div>
      <div :class="$style.item" @click="onEdit">
        <span>
          Modifier
        </span>
      </div>
    </div>
    <div>
      <div :class="$style.item" @click="onDelete">
        <span>
          Supprimer
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { roadmapStore } from '~/store/roadmap';
const store = roadmapStore();

interface Props {
  taskId: number,
  taskIndex: number,
  productIndex: number,
  segmentIndex: number,
  lineIndex: number;
}

const props = defineProps<Props>();
const emits = defineEmits(['close']);

const onDelete = () => {
  useFetchRoadmap().deleteTask(props.taskId);
  store.removeTask(props.taskIndex, props.productIndex, props.segmentIndex, props.lineIndex);
  emits('close');
}

const onEdit = () => {
  emits('close');
}
</script>

<style module>
.wrapper {
  position: absolute;
  right: 5px;
  top: 30px;
  width: 140px;
  background: white;
  border: var(--bloc-border);
  border-radius: 5px;
  z-index: 8;
  padding: 2px;
}

.item {
  padding: 12px 16px;
  cursor: pointer;
  gap: 10px;
  font-size: var(--font-size-m);
  font-weight: 500;
  color: var(--dark);
  border-radius: 5px;
}

.item:hover {
  background: var(--dark-hover)
}

.item svg {
  width: 14px;
}
</style>