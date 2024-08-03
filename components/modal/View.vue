<template>
  <GdvModal v-if="open" @close="onClose()" 
    :title="mode === 'create' ? 'Nouvelle vue' : 'Détail de la vue'" buttonConfirmLabel="Valider"
    @click="onValidate">
    <form :class="$style.form">
      <GdvInput label="Nom de la vue" v-model="view.name" />  
      <GdvInput label="Largeur des colonnes" v-model="view.day_width" :options="sizeOptions" id="1" />  
      <GdvInput label="Tâches" v-model="view.task_size" :options="taskSizeOptions" id="2" />  
      <GdvInput type="date" label="Date de début" v-model="view.date_start" :options="taskSizeOptions" id="2" />  
      <GdvInput type="date" label="Date de fin" v-model="view.date_end" :options="taskSizeOptions" id="2" />  
    </form>
  </GdvModal>
</template>

<script lang="ts" setup>
import { GdvModal, GdvInput, GdvSelect } from "@gedivote/gedivote-ui-vuejs";
import { roadmapStore } from '~/store/roadmap'
import type { Database } from '~/types/supabase';
const store = roadmapStore();

const open = ref(false) as Ref<boolean>;
const mode = ref<'create' | 'edit'>('create');
const view = ref<Database['public']['Tables']['roadmap_views']['Row']>({
  id: 0,
  name: '',
  roadmap_id: 0,
  date_start: '',
  date_end: '',
  day_width: 10,
  default: false,
  archived: false,
  task_size: 'l'
});

const sizeOptions = [
  { value: 2, label: 'Petit' },
  { value: 10, label: 'Moyen' },
  { value: 30, label: 'Grand' }
];

const taskSizeOptions = [
  { value: 's', label: 'Compact' },
  { value: 'm', label: 'Normal' },
  { value: 'l', label: 'Détaillé' }
];

const onClose = () => {
  open.value = false;
  mode.value = 'create';
  view.value = {
    id: 0,
    name: '',
    date_start: '',
    date_end: '',
    day_width: 10,
    task_size: 'l', 
    roadmap_id: 0,
    default: false,
    archived: false
  };
  store.setModal({type: '', show: false, id: null});
}

const onValidate = () => {
  console.log('onValidate', mode.value, view.value);
  if(mode.value === 'create') {
    useFetchRoadmap().addView(view.value);
    store.addView(view.value);
  } else {
    store.updateView(view.value);
  }
  onClose();
}

watch(() => store.modal.show, (value) => {
  open.value = false;

  if(store.modal.type !== 'view') return;

  open.value = store.modal.show;

  if(value) {
    mode.value = 'create';
    if(store.modal.id) {
    //   initData(store.modal.value.id);
    } else {
      view.value.id = useGenerateId();
      view.value.roadmap_id = store.roadmap.id;
    }
  }
})
</script>

<style module>
.form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 0.5rem 1rem;
}
</style>