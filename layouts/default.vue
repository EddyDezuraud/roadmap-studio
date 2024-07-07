<template>
  <div :class="$style.wrapper">
    <Nav />
    <main :class="$style.main">
      <slot />
    </main>
  </div>
</template>

<script lang="ts" setup>

</script>

<style module>
.wrapper {
  display: flex;
  height: 100vh;
  /* background: var(--background) */
  background: linear-gradient(180deg, #E8ECF2, #F6F7F8, #f0edf5, #ebf2f5, #e9edf0);
}

.main {
  width: calc(100% - var(--nav-width));
}
</style>