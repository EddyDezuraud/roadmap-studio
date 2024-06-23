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
  border: none;
  outline: none;
  cursor: pointer;
}

.wrapper:hover {
  opacity: 0.9;
}
</style>