<template>
  <div :class="$style.wrapper">
    <div :class="$style.inner" v-if="data && data.length > 0">
      <Card v-for="roadmap in data" :key="roadmap.id" :id="roadmap.id" :title="roadmap.title" :subtitle="roadmap.subtitle" />        
    </div>
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
}

.inner {
    display: flex;
    gap: 20px;
    flex-direction: column;
    max-width: 600px;
    margin: 0 auto;
}
</style>