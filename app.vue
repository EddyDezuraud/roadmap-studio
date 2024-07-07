<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import type { Database } from '~/types/supabase';
import { globalStore } from '~/store/global';
import type { Roadmap } from '~/types/roadmap';
const store = globalStore();

const client = useSupabaseClient<Database>();

const { data } = await client.from('roadmap') .select(`*`) as { data: Roadmap[] };
store.setRoadmapList(data);

</script>

<style>
body {
  color: var(--main-color);
    font-family: 'Poppins', sans-serif;
}
</style>
