<template>
  <NuxtLink :to :class="[$style.wrapper, {[$style.color] : color}]">
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
  color: string;
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

.color .icon {
  background: var(--dark);
  width: 24px;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  color: white;
}

.icon svg {
  width: 16px;
}
</style>