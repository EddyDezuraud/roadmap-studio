<template>
    <div :class="$style.wrapper" v-if="data && data.length > 0">
      <Card v-for="roadmap in data" :key="roadmap.id" :id="roadmap.id" :title="roadmap.title" :subtitle="roadmap.subtitle" />        
    </div>
</template>    

<script setup lang="ts">
import type { DataModel } from '@/types/data';
import type { Database } from '~/types/supabase';

const client = useSupabaseClient<Database>();

const {data, status} = await useAsyncData('roadmap', async () => {
    const { data } = await client.from('roadmap') .select(`*`);
    return data
})

</script>

<style module>
.wrapper {
    padding: 65px 35px;
    overflow: auto;

    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 20px;
}
</style>