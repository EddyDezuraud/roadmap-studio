<template>
  <Modal v-model="open" @update:model="onClose" title="Nouvelle tâche">
    <div :class="$style.wrapper">

      <div :class="$style.form">

        <div :class="$style.leftSide">
          <div :class="$style.header">
            <Field v-model="task.name" label="Intitulé" placeholder="Intitulé de la tâche" size="large" :error="isSent && task.name === ''" />
          </div>
          <div :class="$style.fields">
            <Field v-model="task.subtitle" label="Sous-titre" placeholder="Sous-titre de la tâche" />
            <Field label="Informations complémentaires" v-model="task.info" type="textarea" />
            <Field label="Date de début" v-model="task.start_date" type="date"/>
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
      </div>
      
    </div>
    <template v-slot:footer>
      <Button type="button" outline @click="onClose">
        <span>Annuler</span>
      </Button>
      <Button type="button" @click="onSubmitForm">
        <span>Enregistrer</span>
      </Button>
    </template>
  </Modal>
</template>

<script lang="ts" setup>

import type { Task, TaskStage } from '~/types/roadmap'
import { roadmapStore } from '~/store/roadmap'
import type { Database } from '~/types/supabase';

const store = roadmapStore();

const task = ref({
  name: '',
  subtitle: '',
  start_date: '',
  info: '',
  line_id: 0,
  segment_id: 0,
  id: useGenerateId()
} as Task);

const stages = ref([]) as Ref<TaskStage[]>;
const isSent = ref(false) as Ref<boolean>;
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
    id: useGenerateId(), 
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
    id: useGenerateId()
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
      id: useGenerateId(),
      job_id: data.jobId,
      task_stage_id: stage.id,
      index: stage.task_stage_jobs.length
    })
  }
}

const addNewTask = async() => {
  const newTask = {} as Database['public']['Tables']['tasks']['Row'];
  newTask.name = task.value.name;
  newTask.subtitle = task.value.subtitle;
  newTask.line_id = task.value.line_id;
  newTask.segment_id = task.value.segment_id;
  newTask.logo = null;
  newTask.info = task.value.info;
  newTask.start_date = task.value.start_date;
  newTask.id = task.value.id;

  await useFetchRoadmap().createTask(newTask);
}

const addNewTaskStageJobs = async() => {
  const newJobs = [] as Database['public']['Tables']['task_stage_jobs']['Row'][];

  stages.value.forEach((stage) => {
    stage.task_stage_jobs.forEach((job) => {
      const newJob = {} as Database['public']['Tables']['task_stage_jobs']['Row'];
      newJob.id = job.id;
      newJob.job_id = job.job_id;
      newJob.task_stage_id = job.task_stage_id;
      newJob.index = job.index;
      newJobs.push(newJob);
    })
  })

  await useFetchRoadmap().createTaskStageJobs(newJobs);
}

const addNewTaskStages = async() => {
  const newStages = [] as Database['public']['Tables']['task_stages']['Row'][];
  stages.value.forEach((stage) => {
    const newStage = {} as Database['public']['Tables']['task_stages']['Row'];
    newStage.id = stage.id;
    newStage.index = stage.index;
    newStage.task_id = task.value.id;
    newStage.stage_id = stage.stage_id;
    newStage.infinite = stage.infinite;
    newStage.duration = stage.duration;
    newStages.push(newStage);
  })

  await useFetchRoadmap().createTaskStages(newStages);
  await addNewTaskStageJobs();
}

const onSubmitForm = async() => {
  await addNewTask();
  await addNewTaskStages();

  resetData();
  onClose();
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