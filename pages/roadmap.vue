<template>
    <div :class="$style.wrapper">
        <div v-if="roadmap" :style="{'--col-size': roadmap.col_size + 'px'}">
            <title>{{ roadmap.title }}</title>
            <Header :title="roadmap.title" />
            <div :class="$style.content">
              <Roadmap :products="roadmap.products" :columns />
            </div>
        </div>
    </div>
</template>    

<script setup lang="ts">
import type { Database } from '~/types/supabase';
import type { Column } from '~/types/roadmap';
import { computed } from '#imports'
import { roadmapStore } from '~/store/roadmap'

const store = roadmapStore();

const { colSize, setColSize } = useColSize()

const client = useSupabaseClient<Database>();
const route = useRoute();

const roadmapId = route.query.id as string;

const {data: roadmap, status} = await useAsyncData('roadmap', async () => {
    const { data } = await client.from('roadmap') .select(`
      *,
      columns (*),
      markers(*),
      products (
        *,
        product_segments (
          *,
          lines (
            *,
            tasks (
                *,
                task_stages (*)
            )
          )
        )
      )
    `).eq('id', roadmapId).single();
    return data
})


if(roadmap.value) {
  if (roadmap.value.col_size) {
    setColSize(roadmap.value.col_size);
    store.setColSize(roadmap.value.col_size);
  }

  if(roadmap.value.date_start) {
    store.setStartDate(roadmap.value.date_start);
  }

  if(roadmap.value.date_end) {
    store.setEndDate(roadmap.value.date_end);
  }

  const cols = useUseSetColumns(roadmap.value.date_start, roadmap.value.date_end, store.colSize.value);
  store.setColumns(cols);

  store.setWidth(cols.length * roadmap.value.col_size);
}

const columns = computed<Column[] | []>(() => store.columns)

</script>

<style module>
.wrapper {
    overflow: auto;
    height: 100vh;
    width: 100vw;
}

.content {
  overflow: auto;
  height: calc(100vh - var(--header-height));
  width: 100vw;
}
</style>~/store/roadmap