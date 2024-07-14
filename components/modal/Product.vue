<template>
  <Modal v-model="open" @update:model="onClose" :title="mode === 'create' ? 'Nouvelle tâche' : 'Détail de la tâche'">
    <div>
      df
    </div>
  </Modal>
</template>

<script lang="ts" setup>
import type { Product } from '~/types/roadmap'
import { roadmapStore } from '~/store/roadmap'
const store = roadmapStore();

const open = ref(false) as Ref<boolean>;
const mode = ref<'create' | 'edit'>('create');
const product = ref({}) as Product;

watch(() => store.modal.show, (value) => {
  open.value = store.modal.show;

  if(value) {
    mode.value = 'create';
    // if(store.modal.value.id) {
    //   initData(store.modal.value.id);
    // } else if(store.modal.value.data && store.modal.value.data['start_date']) {
    //   product.value.segment_id = store.modal.value.data['segment_id'];
    //   product.value.line_id = store.modal.value.data['line_id'];
    //   product.value.start_date = store.modal.value.data['start_date'];
    // }
  }
})
</script>

<style>

</style>