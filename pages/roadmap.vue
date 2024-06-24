<template>
    <div :class="$style.wrapper">
        <div v-if="roadmap" :style="{'--col-size': roadmap.col_size + 'px'}">
            <title>{{ roadmap.title }}</title>
            <Header :title="roadmap.title" />
            <div :class="$style.content">
              <Roadmap :products="roadmap.products" :columns />
            </div>
        </div>
        <ModalTask />
    </div>
</template>    

<script setup lang="ts">
import type { Database } from '~/types/supabase';
import type { Column, Stage, Job } from '~/types/roadmap';
import { computed } from '#imports'
import { roadmapStore } from '~/store/roadmap'

const store = roadmapStore();

const { colSize, setColSize } = useColSize()

const supabase = useSupabaseClient<Database>();
const route = useRoute();

const roadmapId = route.query.id as string;

const {data: roadmap, status} = await useAsyncData('roadmap', async () => {
    const { data } = await supabase.from('roadmap') .select(`
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
                task_stages (
                  *,
                  task_stage_jobs (
                    *
                  )
                )
            )
          )
        )
      )
    `).eq('id', roadmapId).single();
    return data
});

const getStages = async () => {
    const { data: stages } = await supabase.from('stages').select('name, color, id').returns<Stage[]>()
    return stages;
}

const { data: stages } = await useAsyncData('stages', getStages);

const getJobs = async () => {
    const { data: jobs } = await supabase.from('jobs').select('name, id, stage_id').returns<Job[]>()
    return jobs;
}

const { data: jobs } = await useAsyncData('jobs', getJobs);

if(roadmap.value) {
  if (roadmap.value.col_size) {
    setColSize(roadmap.value.col_size);
    store.setColSize(roadmap.value.col_size);
  }

  if(roadmap.value.day_size) {
    store.setDaySize(roadmap.value.day_size);
  }

  if(roadmap.value.date_start) {
    store.setStartDate(roadmap.value.date_start);
  }

  if(roadmap.value.date_end) {
    store.setEndDate(roadmap.value.date_end);
  }

  const cols = useUseSetColumns(roadmap.value.date_start, roadmap.value.date_end, store.daySize);
  store.setColumns(cols);

  const totalWidth = cols.reduce((acc, col) => acc + col.size, 0);

  store.setWidth(totalWidth);

  const weeks = useSetWeeks(roadmap.value.date_start, roadmap.value.date_end, store.daySize);
  store.setWeeks(weeks);
}

const columns = computed<Column[] | []>(() => store.columns)

if(stages.value) {
  store.setStages(stages.value);
}

if(jobs.value) {
  store.setJobs(jobs.value);
}

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