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
  color: white;
  font-size: 12px;
  font-weight: 500;
  background-color: rgba(255,255,255,0);
}

.wrapper:focus,
.wrapper:hover {
  background-color: rgba(255,255,255,0.05);
  color: white;
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