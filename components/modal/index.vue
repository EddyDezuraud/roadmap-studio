<template>
  <Teleport to="body" v-if="model">

    <div :class="$style.wrapper">
      <div :class="$style.overlay" @click="model = false"></div>
      <div :class="$style.inner">
        <div v-if="breadcrumb" :class="$style.breadcrumb">
          <span v-for="(item, index) in breadcrumb" :key="index">
            <span>{{ item }}</span>
            <span v-if="index < breadcrumb.length - 1">></span>
          </span>
        </div>
        <header :class="$style.header" v-if="title || subtitle">
          <h2 v-if="title">{{ title }}</h2>
          <p v-if="subtitle">{{ subtitle }}</p>
        </header>
        <div :class="$style.content">
          <slot />
        </div>
      </div> 
    </div>

  </Teleport>
</template>

<script lang="ts" setup>
interface Props {
  title?: string;
  subtitle?: string;
  breadcrumb?: string[];
}

const model = defineModel<Boolean>();

defineProps<Props>()
</script>

<style module>
.wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
}

.inner {
  position: relative;
  z-index: 1;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  width: 100%;
  max-width: 500px;
}

.header {
  margin-bottom: 20px;
}

.breadcrumb {
  display: flex;
  gap: 5px;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: var(--border);
  font-size: var(--font-size-m);
  font-weight: 500;
  color: var(--dark-100);
}

.breadcrumb > * {
  display: flex;
  gap: 5px;
}
</style>