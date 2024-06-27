<template>
  <div :class="[$style.wrapper, {[$style.dragging] : isDragging}]" @mousedown="startDrag" @touchstart="startDrag">
    <div :class="$style.inner">
      {{ modelValue }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { roadmapStore } from '~/store/roadmap'

const store = roadmapStore();

const props = defineProps<{
  modelValue: number
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
  (e: 'change', value: number): void
}>();

const startX = ref(0);
const isDragging = ref(false);
const currentValue = ref(props.modelValue);
const accumulatedDiff = ref(0);
const sensitivity = computed(() => store.getDaySize);

const startDrag = (event: MouseEvent | TouchEvent) => {
  isDragging.value = true;
  startX.value = 'touches' in event ? event.touches[0].clientX : event.clientX;
  accumulatedDiff.value = 0;
  document.addEventListener('mousemove', onDrag);
  document.addEventListener('touchmove', onDrag);
  document.addEventListener('mouseup', stopDrag);
  document.addEventListener('touchend', stopDrag);
};

const onDrag = (event: MouseEvent | TouchEvent) => {
  if (!isDragging.value) return;
  
  const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
  const diffX = clientX - startX.value;
  accumulatedDiff.value += diffX;
  
  const steps = Math.floor(Math.abs(accumulatedDiff.value) / sensitivity.value) * Math.sign(accumulatedDiff.value);
  
  if (steps !== 0) {
    currentValue.value += steps;
    if(currentValue.value < 1) currentValue.value = 1;
    emit('update:modelValue', currentValue.value);
    accumulatedDiff.value = accumulatedDiff.value % sensitivity.value;
  }
  
  startX.value = clientX;
};

const stopDrag = () => {
  isDragging.value = false;
  emit('change', currentValue.value);
  document.removeEventListener('mousemove', onDrag);
  document.removeEventListener('touchmove', onDrag);
  document.removeEventListener('mouseup', stopDrag);
  document.removeEventListener('touchend', stopDrag);
};

watch(() => props.modelValue, (newValue) => {
  currentValue.value = newValue;
});
</script>

<style module>
.wrapper {
  position: absolute;
  left: 100%;
  z-index: 2;
  width: 20px;
  aspect-ratio: 1;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  cursor: ew-resize;
  touch-action: none;
}

.wrapper::before {
  position: absolute;
  content: '';
  top: -20px;
  left: calc(50% - 4px);
  width: 8px;
  height: 78px;
  background: var(--primary);
  border-radius: 4px;
  opacity: 0;
  transform: scale(0.6);
  transition: opacity 0.3s;
}

.wrapper:hover::before {
  opacity: 0.2;
}

.inner {
  pointer-events: none;
  position: absolute;
  left: 50%;
  width: 30px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  top: -30px;
  right: 0;
  z-index: 2;
  font-weight: 600;
  font-size: 11px;
  transform: translate(-50%, 0) scale(0.5);
  color: var(--primary);
  opacity: 0;
  transition: transform 0.3s, opacity 0.3s;
}

.wrapper.dragging .inner {
  transform: translate(-50%, 0) scale(1);
  opacity: 1;
}
</style>