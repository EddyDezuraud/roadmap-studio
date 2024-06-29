<template>
  <button :class="[$style.wrapper, {[$style.small] : size === 'small'}, {[$style.outline] : outline}, {[$style.danger] : danger}]">
    <span :class="$style.inner">
      <svg v-if="icon === 'add'" :class="$style.icon" viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
      <slot />
    </span>
  </button>
</template>

<script lang="ts" setup>
interface Props {
  icon?: string;
  size?: 'small' | 'medium' | 'large';
  outline?: boolean;
  danger?: boolean;
}

defineProps<Props>()
</script>

<style module>
.wrapper {
  padding: 12px 24px;
  border-radius: 8px;
  color: white;
  background-image: var(--primary-gradient);
  font-size: var(--font-size-l);
  font-weight: 500;
  border: none;
  outline: none;
  cursor: pointer;
  box-shadow: rgba(73, 73, 73,0.5) 0px -2.4px 0px 0px inset;
  box-shadow: rgb(255, 255, 255) 0px 0px 0px 0px, rgba(162, 168, 251, 0) 0px 0px 0px 3px, rgba(36, 28, 133, 0.3) 0px 0px 0px 1px inset
}

.small {
  padding: 8px 12px;
  font-size: var(--font-size-m);
  box-shadow: none;
}

.outline {
  background: transparent;
  color: var(--dark);
  border: var(--border);
  box-shadow: none;
  font-weight: 600;
}

.danger {
  color : var(--danger);
  font-size: 12px
}

.wrapper:hover {
  opacity: 0.9;
}

.inner {
  display: flex;
  align-items: center;
  gap: 4px;
}

.icon {
  width: 16px;
  fill: currentColor;
}

.small .icon {
  width: 12px;
}

.outline .icon {
  color: var(--dark-100);
}

</style>