<template>
  <GdvModal v-if="open" @close="onClose()" 
    :title="mode === 'create' ? 'Nouveau produit' : 'Détail du produit'" buttonConfirmLabel="Valider"
    @click="onValidate">
    <form :class="$style.form">
      <GdvInput label="Nom du produit" v-model="product.name" />  
      <ColorsList v-model="product.color" />
    </form>
  </GdvModal>
</template>

<script lang="ts" setup>
import { GdvModal, GdvInput } from "@gedivote/gedivote-ui-vuejs";
import { roadmapStore } from '~/store/roadmap'
import type { Database } from '~/types/supabase';
const store = roadmapStore();

const open = ref(false) as Ref<boolean>;
const mode = ref<'create' | 'edit'>('create');
const product = ref<Database['public']['Tables']['products']['Row']>({
  id: 0,
  name: '',
  color: '', 
  roadmap_id: 0, 
  index: 0
});


const onClose = () => {
  open.value = false;
  mode.value = 'create';
  product.value = {id:0, name: '', color: '', roadmap_id: 0, index: 0};
  store.setModal({type: '', show: false, id: null});
}

const onValidate = () => {
  console.log('onValidate', mode.value, product.value);
  if(mode.value === 'create') {
    useFetchRoadmap().addProduct(product.value);
    store.addProduct(product.value);
  } else {
    store.updateProduct(product.value);
  }
  onClose();
}

watch(() => store.modal.show, (value) => {
  open.value = false;

  if(store.modal.type !== 'product') return;

  open.value = store.modal.show;

  if(value) {
    mode.value = 'create';
    if(store.modal.id) {
    //   initData(store.modal.value.id);
    } else {
      product.value.id = useGenerateId();
      product.value.roadmap_id = store.roadmap.id;
      product.value.index = store.roadmap.products.length;
    //   product.value.segment_id = store.modal.value.data['segment_id'];
    //   product.value.line_id = store.modal.value.data['line_id'];
    //   product.value.start_date = store.modal.value.data['start_date'];
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