<template>
  <div :class="$style.wrapper">
    <select>
      <option v-for="option in stagesOptions" :value="option.value">{{option.text}}</option>
    </select>
  </div>
</template>

<script lang="ts" setup>

import type { Task, TaskStage } from '~/types/roadmap'
import { roadmapStore } from '~/store/roadmap'

const store = roadmapStore();

interface Props {
  stage: TaskStage;
}

</script>

<style module>
.wrapper {
 display: flex;
}
</style>