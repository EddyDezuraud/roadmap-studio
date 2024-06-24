<template>
  <Modal v-model="open" @update:model="onClose" :breadcrumb>
    <div :class="$style.wrapper">

      <form>
        <!-- {{ modalStore }} -->
        <div :class="$style.fields">
          <Field v-model="task.name" label="Titre" placeholder="Intitulé de la tâche" />
          <Field v-model="task.subtitle" label="Sous-titre" placeholder="Sous-titre de la tâche" />
          <Field label="Start Date" v-model="task.start_date" type="date"/>
            {{task.start_date}}
          <!-- <Field label="Info" v-model="task.info" /> -->
          <Field label="Ligne n°" v-model="task.line_id" />
          <Field label="Segment n°" v-model="task.segment_id" />
        </div>

       <div :class="$style.footer">
        <Button type="submit">Save</Button>
       </div>


      </form>
      
    </div>
  </Modal>
</template>

<script lang="ts" setup>

import type { Task } from '~/types/roadmap'
import { roadmapStore } from '~/store/roadmap'
import type { Style } from '#build/components';

const store = roadmapStore();

const task = ref({
  name: '',
  subtitle: '',
  start_date: '',
  info: '',
  line_id: 0,
  segment_id: 0,
  id: 0
} as Task);

const open = ref(true) as Ref<boolean>;

const breadcrumb = computed(() => {
  if(task.value.id) {
    return ['Tâches', task.value.name]
  }
  return ['Tâches','Nouvelle tâche']
})

const modalStore = computed(() => store.modal);

const resetData = () => {
  task.value = {
    name: '',
    subtitle: '',
    start_date: '',
    info: '',
    line_id: 0,
    segment_id: 0,
    id: 0
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

</script>

<style module>
.wrapper {
 display: block;
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
</style>