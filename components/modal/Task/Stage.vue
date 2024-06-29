<template>
  <div :class="$style.wrapper">
    <div :class="$style.main">
      <Select size="small" :class="$style.type" v-model="stageId" :options="stagesOptions" placeholder="Stage" />
      <Field size="small" :class="$style.duration" v-model="duration" type="number" />
    </div>
    <div :class="$style.jobsList">
      <div :class="$style.newJob" ref="newJobButtonRef">
        <button :class="$style.newJobButton" type="button" @click="toggleJobs">
          <div :class="$style.newJobButtonLeft">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
            <span>Métiers</span>
          </div>
          <div :class="$style.newJobButtonRight" v-if="taskJobs && taskJobs.length > 0">
            <div v-for="(job, index) in taskJobs" :key="index" :class="$style.jobElement">
              {{ getJobName(job.job_id) }}
            </div>
          </div>
        </button>
        <div :class="$style.popoverJobsList" v-if="openJobs">
          <div v-for="(job, index) in jobsList" :key="index" :class="$style.popoverJobsListItem" @click="onToggleJob(job.id)">
            <div :class="$style.checkbox">
              <svg v-if="isSelectedJob(job.id)" viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-square-check"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" /><path d="M9 12l2 2l4 -4" /></svg>
              <svg v-else viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-square"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" /></svg>
            </div> 
            <span>
              {{ job.name }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

import type { Task, TaskStage, TaskStageJob } from '~/types/roadmap'
import { roadmapStore } from '~/store/roadmap'

const store = roadmapStore();

const stageId = defineModel('stageId');
const duration = defineModel('duration')
const jobsList = computed(() => store.jobs);
const openJobs = ref(false);
const newJobButtonRef: Ref<HTMLElement | null> = ref(null);

const toggleJobs = () => {
  openJobs.value = !openJobs.value;
}

const handleClickOutside = (event: MouseEvent) => {
  if (newJobButtonRef.value && !newJobButtonRef.value.contains(event.target as Node)) {
    openJobs.value = false;
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
})

interface props {
  taskJobs: TaskStageJob[];
  id: number;
}

const props = defineProps<props>()

const stagesOptions = computed<{value: number, text: string}[]>(() => {
  return store.stages.map((stage) => {
    return {
      value: stage.id,
      text: stage.name
    }
  })
})

const getJobName = (jobId: number) => {
  const job = store.jobs.find((job) => job.id === jobId)
  return job ? job.name : ''
}

const isSelectedJob = (jobId: number) => {
  if(!props.taskJobs) return false
  return props.taskJobs.some((job) => job.job_id === jobId)
}

const emits = defineEmits(['job']);

const onToggleJob = (jobId: number) => {
  emits('job', {jobId, stageId: props.id});
}

</script>

<style module>
.wrapper {
 display: flex;
 flex-direction: column;
 gap: 6px;
 padding: 8px;
 border: var(--border);
 border-radius: 8px;
 width: 100%;
}

.main {
  display: flex;
  gap: 6px;
  width: 100%;
}

.type {
  width: calc(100% - 60px);
}

.duration {
  width: 60px;
}

.newJob {
  position: relative;
}

.newJobButton {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px;
  border: var(--border);
  border-radius: 8px;
  cursor: pointer;
  font-size: 10px;
  background: white;
  font-weight: 500;
}

.newJobButtonLeft {
  display: flex;
  align-items: center;
  gap: 6px;
}

.newJobButtonLeft svg {
  width: 10px;
  height: 10px;
}

.newJobButtonRight {
  padding-left: 6px;
  border-left: var(--border);
  display: flex;
  gap: 6px;
  align-items: center;
}

.jobElement {
  font-size: 10px;
  font-weight: 500;
  color: var(--dark-100);
  background: rgba(0,0,0,0.05);
  padding: 4px;
  border-radius: 4px;
}

.popoverJobsList {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: white;
  border: var(--border);
  border-radius: 8px;
  z-index: 1;
}

.popoverJobsList > *:last-child {
  border-bottom: none;
}

.popoverJobsListItem {
  font-size: 12px;
  font-weight: 500;
  color: var(--dark);
  padding: 8px;
  cursor: pointer;
  border-bottom: var(--border);
  display: flex;
  align-items: center;
  gap: 6px;
}

.popoverJobsListItem:hover {
  background: rgba(0, 0, 0, 0.05);
}

.popoverJobsListItem svg {
  width: 14px;
  height: 14px;
  color: var(--dark-100);
}
</style>