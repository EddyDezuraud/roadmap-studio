<template>
    <div :class="$style.wrapper">
      <Card v-for="roadmap in roadmaps" :key="roadmap.id" :roadmap="roadmap" />        
    </div>
</template>    

<script setup lang="ts">
import type { DataModel } from '@/types/data';
import type { Database } from '~/types/supabase';

const client = useSupabaseClient<Database>();

const {data: roadmap, status} = await useAsyncData('roadmap', async () => {
    const { data } = await client.from('roadmap') .select(`*`);
    return data
})

</script>

<style module>
.wrapper {
    padding: 65px 35px;
    overflow: auto;
}
</style>