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

if (roadmap.value?.col_size) {
  setColSize(roadmap.value?.col_size)
}

const columns = computed<Column[] | []>(() => {
  const columns = []
  const dateStart = roadmap.value ? new Date(String(roadmap.value.date_start)) : new Date();
  const dateEnd = roadmap.value ? new Date(String(roadmap.value.date_end)) : new Date();

  let currentDate = new Date(dateStart.getFullYear(), dateStart.getMonth(), 2);
  const endDate = new Date(dateEnd.getFullYear(), dateEnd.getMonth(), 2);

  while (currentDate <= endDate) {
    columns.push({
      date: currentDate.toISOString().split('T')[0],
      show: true,
      size: colSize.value ? colSize.value : 385,
      markers: []
    });
    currentDate.setMonth(currentDate.getMonth() + 1);
  }

  return columns;
})

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
</style>