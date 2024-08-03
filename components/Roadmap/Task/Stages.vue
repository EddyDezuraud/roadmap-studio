<template>
  <div :class="[$style.wrapper, $style['size-'+store.getSelectedView.task_size]]">
    <div v-for="stage in orderedTaskStages" :class="$style.stage" :style="{'--primary': stageRef(stage.stage_id)?.color}">
      <div :class="$style.stageBar" :style="{width: stageBarWidth(stage.duration)}"></div>
      <div :class="$style.jobsList" v-if="store.getSelectedView.task_size !== 's'">
        <div v-for="taskJob in stage.task_stage_jobs" :key="taskJob.index" :class="$style.job">
          <span>
            {{ jobName(taskJob.job_id) }}
          </span>
        </div>
      </div>
      <RoadmapTaskStageCursor v-model="stage.duration" @change="onChangeDuration($event, stage)" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { TaskStage } from '~/types/roadmap'
import { roadmapStore } from '~/store/roadmap'
const store = roadmapStore();

interface Props {
  taskStages: TaskStage[]
}

const props = defineProps<Props>()

const stages = computed(() => store.stages);

const orderedTaskStages = computed(() => {
  return props.taskStages.sort((a, b) => a.index - b.index);
})

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

const onChangeDuration = (value: number, stage: TaskStage) => {
  stage.duration = value;
  useFetchRoadmap().updateStageDuration(stage.id, value);
}
</script>

<style module>
.wrapper {
  position: relative;
  z-index: 1;
  display: flex;
  border-radius: 5px;
  user-select: none;
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
  position: relative;
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
  border-radius: 4px;
}

.stageBar {
  height: 3px;
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
  font-size: var(--font-size-s);
  font-weight: 500;
  padding: 3px 5px;
  color: var(--primary);
}

</style>