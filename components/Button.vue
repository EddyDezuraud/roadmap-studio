<template>
  <button :class="$style.wrapper">
    <span>
      <slot />
    </span>
  </button>
</template>

<script lang="ts" setup>

</script>

<style module>
.wrapper {
  padding: 12px 24px;
  border-radius: 8px;
  color: white;
  background-color: var(--primary);
  font-size: var(--font-size-l);
  font-weight: 500;
  border: none;
  outline: none;
  cursor: pointer;
  box-shadow: rgba(73, 73, 73,0.5) 0px -2.4px 0px 0px inset;
}

.wrapper:hover {
  opacity: 0.9;
}
</style>