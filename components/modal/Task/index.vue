<template>
  <Modal v-model="open" @update:model="onClose" :title="mode === 'create' ? 'Nouvelle tâche' : 'Détail de la tâche'">
    <div :class="$style.wrapper">

      <div v-if="pending" :class="$style.loader">
        <Spinner />
        <span>Chargement...</span>
      </div>

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
      <div :class="$style.footer">
        <Button type="button" danger outline @click="onDeleteTask">
          <span>Supprimer</span>
        </Button>
        <div :class="$style.mainActions">
          <Button type="button" outline @click="onClose">
            <span>Annuler</span>
          </Button>
          <Button type="button" @click="onSubmitForm">
            <span>Enregistrer</span>
          </Button>
        </div>
      </div>
      
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
  logo: '',
  id: useGenerateId()
} as Task);

const stages = ref([]) as Ref<TaskStage[]>;
const isSent = ref(false) as Ref<boolean>;
const open = ref(false) as Ref<boolean>;
const mode = ref<'create' | 'edit'>('create');
const pending = ref<boolean>(false);

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

const initData = async (id: number) => {
  mode.value = 'edit';
  pending.value = true;
  const data = await useFetchRoadmap().getTask(id);

  if(data) {

    task.value.name = data.name;
    task.value.subtitle = data.subtitle || '';
    task.value.start_date = data.start_date || '';
    task.value.info = data.info || '';
    task.value.line_id = data.line_id || 0;
    task.value.segment_id = data.segment_id || 0;
    task.value.id = data.id;
    task.value.logo = data.logo || '';

    const taskStages = await useFetchRoadmap().getTaskStages(id);
    if(taskStages) {
      stages.value = taskStages.map((stage) => {
        return {
          id: stage.id,
          index: stage.index,
          duration: stage.duration,
          task_id: stage.task_id,
          stage_id: stage.stage_id,
          infinite: stage.infinite,
          task_stage_jobs: stage.task_stage_jobs || []
        }
      })
    }
  }

  pending.value = false;
}

// watch store modal show
watch(() => store.modal.show, (value) => {
  open.value = store.modal.show;

  if(value) {
    mode.value = 'create';
    if(modalStore.value.id) {
      initData(modalStore.value.id);
    } else if(modalStore.value.data && modalStore.value.data['start_date']) {
      task.value.segment_id = modalStore.value.data['segment_id'];
      task.value.line_id = modalStore.value.data['line_id'];
      task.value.start_date = modalStore.value.data['start_date'];
    }
  }
})

const resetData = () => {
  task.value.name = '';
  task.value.subtitle = '';
  task.value.start_date = '';
  task.value.info = '';
  task.value.line_id = 0;
  task.value.logo = '';
  task.value.segment_id = 0;
  task.value.id = useGenerateId();
  stages.value = [];
}

const onClose = () => {
  resetData();
  store.setModal({type: 'task', show: false, id: null});
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
  await useFetchRoadmap().createTask(task.value);
  const newTask = {
    ...task.value,
    task_stages: stages.value
  } as Task;
  store.addTask(newTask);
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

const onDeleteTask = async() => {
  await useFetchRoadmap().deleteTask(task.value.id);
  onClose();
}

const updateTask = async() => {
  await useFetchRoadmap().updateTask(task.value);
  store.updateTask(task.value);
}

const onSubmitForm = async() => {

  if(task.value.name === '' || task.value.start_date === '' || stages.value.length === 0) {
    isSent.value = true;
    return;
  }

  if(mode.value === 'edit') {
    await updateTask();

    if(stages.value.length > 0){
      await useFetchRoadmap().deleteTaskStagesFromTask(task.value.id);
      await addNewTaskStages();
    }

  } else {
    await addNewTask();
    await addNewTaskStages();
  }

  onClose();
}

</script>

<style module>
.wrapper {
 display: block;
  position: relative;
 --sideform-width: 350px;
}

.loader {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255,255,255,0.7);
  backdrop-filter: blur(2px);
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
  font-size: 12px;
  font-weight: 500;

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
  justify-content: space-between;
  width: 100%;
}

.mainActions {
  display: flex;
  gap: 10px;
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