<template>
    <div :class="$style.wrapper" :style="{'--col-size': roadmap.colSize + 'px'}">
        <div v-if="roadmap">
            <title>{{ roadmap.title }}</title>
            <Header :title="roadmap.title" />
            <Roadmap :products="roadmap.products" :columns="roadmap.columns" />
        </div>
    </div>

</template>    

<script setup lang="ts">
import type { DataModel } from '@/types/data';
import type { Database } from '~/types/supabase';

// const { data } = useFetch<DataModel>('http://localhost:3000/data.json');

const { colSize, setColSize } = useColSize()


const client = useSupabaseClient<Database>();
const route = useRoute();

const orgId = route.query.organization_id as string;

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
                task_segments (*)
            )
          )
        )
      )
    `).eq('organization_id', orgId).single();
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