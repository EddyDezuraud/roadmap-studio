<template>
  <Modal v-model="open" @update:model="onClose" title="Nouvelle tâche">
    <div :class="$style.wrapper">

      <form :class="$style.form">

        <div :class="$style.leftSide">
          <div :class="$style.header">
            <Field v-model="task.name" label="Intitulé" placeholder="Intitulé de la tâche" size="large" />
          </div>
          <div :class="$style.fields">
            <Field v-model="task.subtitle" label="Sous-titre" placeholder="Sous-titre de la tâche" />
            <Field label="Start Date" v-model="task.start_date" type="date"/>
            <!-- <Field label="Info" v-model="task.info" /> -->
            <Field label="Segment n°" v-model="task.segment_id" />
            <Field label="Ligne n°" v-model="task.line_id" />
          </div>
        </div>
        <div :class="$style.rightSide">
          <span :class="$style.label">Stages</span>
          <div :class="$style.innerSection">

            <div :class="$style.stagesList">
              <div v-for="(stage, index) in stages" :key="index" :class="$style.stage">
                <ModalTaskStage :id="stage.id" v-model:stage-id="stage.stage_id" v-model:duration="stage.duration" :task-jobs="stage.task_stage_jobs" @job="onToggleJob" />
              </div>
              
            </div>

            <Button type="button" icon="add" size="small" outline @click="onAddStage">
              <span>Ajouter un stage</span>
            </Button>


          </div>
        </div>
      </form>
      
    </div>
    <template v-slot:footer>
        <Button type="button" outline @click="onClose">
          <span>Annuler</span>
        </Button>
        <Button type="submit">
          <span>Enregistrer</span>
        </Button>
      </template>
  </Modal>
</template>

<script lang="ts" setup>

import type { Task, TaskStage } from '~/types/roadmap'
import { roadmapStore } from '~/store/roadmap'

const store = roadmapStore();

const generateId = () => {
  return Math.floor(Math.random() * 1000);
}

const task = ref({
  name: '',
  subtitle: '',
  start_date: '',
  info: '',
  line_id: 0,
  segment_id: 0,
  id: generateId()
} as Task);

const stages = ref([]) as Ref<TaskStage[]>;

const open = ref(false) as Ref<boolean>;

const breadcrumb = computed(() => {
  if(task.value.id) {
    return ['Tâches', task.value.name]
  }
  return ['Tâches','Nouvelle tâche']
})

const modalStore = computed(() => store.modal);


const onAddStage = () => {
  stages.value.push({
    id: generateId(), 
    index: stages.value.length, 
    duration: 10, 
    task_id: task.value.id,
    stage_id: 0,
    infinite: false,
    task_stage_jobs: []
  });
}

const resetData = () => {
  task.value = {
    name: '',
    subtitle: '',
    start_date: '',
    info: '',
    line_id: 0,
    segment_id: 0,
    id: generateId()
  }
}

const initData = () => {
  task.value.name = modalStore.value.data?.name || '';
  task.value.subtitle = modalStore.value.data?.subtitle || '';
  //convert date to yyy-dd-mm format
  const date = new Date(modalStore.value.data?.start_date);
  task.value.start_date = date.toISOString().split('T')[0];
  task.value.info = modalStore.value.data?.info || '';
}

// watch store modal show
watch(() => store.modal.show, (value) => {
  console.log(value)
  if(value) {
    open.value = true;
    task.value = modalStore.value.data as Task;
    task.value.start_date = modalStore.value.data?.start_date;
  }
})

const onClose = () => {
  store.setModal({type: 'task', show: false, data: {}});
}

const onToggleJob = (data: {jobId: number, stageId: number}) => {
  const stage = stages.value.find((stage) => stage.id === data.stageId);

  if(stage) {

    const index = stage.task_stage_jobs.findIndex((job) => job.job_id === data.jobId);

    if(index > -1) {
      stage.task_stage_jobs.splice(index, 1);
      return;
    }

    stage.task_stage_jobs.push({
      id: generateId(),
      job_id: data.jobId,
      task_stage_id: stage.id,
      index: stage.task_stage_jobs.length
    })
  }
}

</script>

<style module>
.wrapper {
 display: block;

 --sideform-width: 350px;
}

.titles {
  margin-bottom: 20px;
}

.fields {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.header {
  border-bottom: var(--border);
  padding: 0 0 20px 0;
  margin-bottom: 20px;
}

.section {
  margin-top: 20px;
  padding-bottom: 20px;
  border-bottom: var(--border);
}

.label {
  display: block;
  font-size: var(--font-size-xxl);
  font-weight: 500;
  color: var(--dark);
  margin-bottom: 20px;
}

.form {
  display: flex;
}

.leftSide {
  flex: 1;
  width: calc(100% - var(--sideform-width));
  padding-right: 20px;
}

.rightSide {
  width: var(--sideform-width);
  border-left: var(--border);
  padding-left: 20px;
}

.innerSection,
.stagesList {
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: flex-start;
}

.stage,
.stagesList {
  width: 100%;
}
</style>