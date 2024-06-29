<template>
  <div :class="$style.wrapper">
    <select v-model="stageId">
      <option v-for="option in stagesOptions" :value="option.value">{{option.text}}</option>
    </select>
    <Field v-model="duration" type="number" />
  </div>
</template>

<script lang="ts" setup>

import type { Task, TaskStage } from '~/types/roadmap'
import { roadmapStore } from '~/store/roadmap'

const store = roadmapStore();

const stageId = defineModel('stageId');
const duration = defineModel('duration')

const stagesOptions = computed<{value: number, text: string}[]>(() => {
  return store.stages.map((stage) => {
    return {
      value: stage.id,
      text: stage.name
    }
  })
})

</script>

<style module>
.wrapper {
 display: flex;
}
</style>