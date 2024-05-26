<template>
    <div :class="$style.wrapper" :style="{'--col-size': data?.metaData.colSize + 'px'}">
        <!-- <div v-if="data?.metaData">
            <title>{{ data?.metaData.title }}</title>
            {{ roadmap }}
            <Header :title="data?.metaData.title" />
            <Roadmap :data="data" />
        </div>  -->
        <div v-if="roadmap">
            <title>{{ roadmap.title }}</title>
            <Header :title="roadmap.title" />
            <Roadmap :id="roadmap.id" />
        </div>
    </div>

</template>    

<script setup lang="ts">
import type { DataModel } from '@/types/data';
import type { Database } from '~/types/supabase';

const { data } = useFetch<DataModel>('http://localhost:3000/data.json');

const { colSize, setColSize } = useColSize()

if (data.value?.metaData) {
  setColSize(data.value.metaData.colSize)
}

const client = useSupabaseClient<Database>();
const route = useRoute();

const orgId = route.query.organization_id as string;

const {data: roadmap, status} = await useAsyncData('roadmap', async () => {
    const { data } = await client.from('roadmap').select('*').eq('organization_id', orgId).single();
    return data
})

</script>

<style module>
.wrapper {
    padding: 65px 35px;
    overflow: auto;
}
</style>