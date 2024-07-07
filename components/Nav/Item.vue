<template>
  <NuxtLink :to :class="$style.wrapper">
    <div :class="$style.icon">
      <slot name="icon"></slot>
    </div>
    <span :class="$style.label">
      <slot name="label"></slot>
    </span>
  </NuxtLink>
</template>

<script lang="ts" setup>
interface Props {
  to: string;
}

defineProps<Props>();
</script>

<style module>
.wrapper {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  border-radius: 8px;
  transition: background-color 0.2s;
  color: var(--dark-100);
  font-size: 12px;
  font-weight: 500;
}

.wrapper:hover {
  background-color: var(--grey);
}

.icon svg {
  width: 16px;
}
</style>