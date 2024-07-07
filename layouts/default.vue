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
  background: linear-gradient(180deg, #FFFFFF, #F6F7F8, #E8E3F3, #F4E6F2, #F4EBEE);
}

.main {
  width: calc(100% - var(--nav-width));
  background: var(--background-2)
}
</style>