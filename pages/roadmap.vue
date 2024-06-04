<template>
    <div :class="$style.wrapper">
        <div v-if="roadmap" :style="{'--col-size': roadmap.col_size + 'px'}">
            <title>{{ roadmap.title }}</title>
            <Header :title="roadmap.title" />
            <Roadmap :products="roadmap.products" :columns="roadmap.columns" />
        </div>
    </div>

</template>    

<script setup lang="ts">
import type { DataModel } from '@/types/data';
import type { Database } from '~/types/supabase';

const { colSize, setColSize } = useColSize()

const client = useSupabaseClient<Database>();
const route = useRoute();

const roadmapId = route.query.id as string;

const {data: roadmap, status} = await useAsyncData('roadmap', async () => {
    const { data } = await client.from('roadmap') .select(`
      *,
      columns (
          *
      ),
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


</script>

<style module>
.wrapper {
    padding: 65px 35px;
    overflow: auto;
}
</style>