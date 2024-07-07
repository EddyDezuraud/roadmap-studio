<template>
  <div :class="$style.wrapper">
    <div :class="$style.inner" v-if="roadmaps && roadmaps.length > 0">
      <Card v-for="roadmap in roadmaps" :key="roadmap.id" :id="roadmap.id" :title="roadmap.title" :subtitle="roadmap.subtitle" />        
    </div>
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
}

.inner {
    display: flex;
    gap: 20px;
    flex-direction: column;
    max-width: 600px;
    margin: 0 auto;
}
</style>