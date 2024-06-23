<template>
  <Modal v-model="open" :breadcrumb>
    <div :class="$style.wrapper">

      <form>

        <div :class="$style.titles">
          <Field v-model="task.name" mode="title" placeholder="Intitulé de la tâche" />
          <Field v-model="task.subtitle" mode="subtitle" placeholder="Sous-titre de la tâche" />
        </div>
        <div :class="$style.fields">
          <Field label="Start Date" v-model="task.start_date" type="date"/>
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