<template>
  <div :class="$style.wrapper">
    <section :class="$style.section">
      <header :class="$style.header">
        <h1 :class="$style.title">Mes Roadmaps</h1>
      </header>
      <div :class="$style.inner" v-if="roadmaps && roadmaps.length > 0">
        <Card v-for="roadmap in roadmaps" :key="roadmap.id" :id="roadmap.id" :title="roadmap.title" :subtitle="roadmap.subtitle" />        
      </div>
    </section>
  </div>
</template>    

<script setup lang="ts">
import { globalStore } from '~/store/global';
const store = globalStore();

const roadmaps = store.roadmapList;
</script>

<style module>
.wrapper {
    padding: 65px 35px;
    overflow: auto;
    color: var(--dark);
}

.header {
  padding: 20px 0;
}

.title {
  font-size: 16px;
  font-weight: 600;
}

.inner {
    display: flex;
    gap: 20px;
}
</style>