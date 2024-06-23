<template>
  <div :class="$style.wrapper">
    <div v-for="stage in taskStages" :class="$style.stage" :style="{'--primary': stageRef(stage.stage_id)?.color}">
      <div :class="$style.stageBar" :style="{width: stageBarWidth(stage.duration)}"></div>
      <div :class="$style.jobsList">
        <div v-for="taskJob in stage.task_stage_jobs" :key="taskJob.index" :class="$style.job">
          {{ jobName(taskJob.job_id) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { TaskStage, Job } from '~/types/roadmap'
import type { Database } from '~/types/supabase';
import { roadmapStore } from '~/store/roadmap'

const store = roadmapStore();

const client = useSupabaseClient<Database>();

interface Props {
  taskStages: TaskStage[]
}

const props = defineProps<Props>()

const stages = computed(() => store.stages);

const stageBarWidth = computed(() => {
  return (duration: number) => {
    return store.getDaySize * duration + 'px';
  }
})

const stageRef = computed(() => {
  return (stageId: number) => {
    return stages.value.find(stage => stage.id === stageId);
  }
})

const jobName = computed(() => {
  return (taskJobId: number) => {
    return store.jobs.find(j => j.id === taskJobId)?.name;
  }
})
</script>

<style module>
.wrapper {
  position: relative;
  z-index: 1;
  display: flex;
}

.wrapper > div:first-child .stageBar {
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
}

.wrapper > div:first-child .jobsList {
  padding-left: 10px;
}

.wrapper > div:last-child .stageBar {
  border-top-right-radius: 50px;
  border-bottom-right-radius: 50px;
}

.stage {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.stageBar {
  height: 5px;
  padding-left: 3px;
  background-color: var(--primary);
  color: white;
  
  position: relative;
  display: flex;
  align-items: center;
}

.jobsList {
  display: flex;
  gap: 5px;
  height: 16px;
}

.job {
  position: relative;
  font-size: 10px;
  font-weight: 500;
  padding: 3px 5px;
  color: var(--primary);
}

.job::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--primary);
  opacity: 0.1;
  z-index: -1;
  border-radius: 4px;;
}
</style>