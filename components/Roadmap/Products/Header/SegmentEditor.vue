<template>
  <div :class="$style.wrapper">
    <div :class="$style.item" @click="onDelete">
      <span>
        Supprimer
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { roadmapStore } from '~/store/roadmap';
const store = roadmapStore();

interface Props {
  segmentId: number;
  productId: number;
}

const props = defineProps<Props>();
const emits = defineEmits(['close']);

const onDelete = () => {
  useFetchRoadmap().deleteSegment(props.segmentId);
  store.removeSegment(props.segmentId, props.productId);
  emits('close');
}
</script>

<style module>
.wrapper {
  position: absolute;
  left: calc(100% - 28px);
  top: 30px;
  width: 140px;
  background: var(--bloc-background);
  border: var(--bloc-border);
  border-radius: 5px;
  z-index: 8;
}

.item {
  padding: 8px 15px;
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