<template>
    <div :class="$style.wrapper">
        <div v-if="roadmapData" :style="{'--col-size': roadmapData.col_size + 'px'}">
            <title>{{ roadmapData.title }}</title>
            <RoadmapPageHeader :title="roadmapData.title" />
            <div :class="$style.content">
              <Roadmap :products="roadmapData.products" :columns />
            </div>
        </div>
        <ModalTask />
        <ModalProduct />
        <ModalView />
    </div>
</template>    

<script setup lang="ts">
import type { Database } from '~/types/supabase';
import type { Column, Stage, Job, Task } from '~/types/roadmap';
import { computed } from '#imports'
import { roadmapStore } from '~/store/roadmap'

const store = roadmapStore();

const { colSize, setColSize } = useColSize()

const supabase = useSupabaseClient<Database>();
const route = useRoute();

const roadmapId = route.query.id as string;

const roadmapData = computed(() => store.roadmap);

const {data: roadmap, status} = await useAsyncData('roadmap', async () => {
    const { data } = await supabase.from('roadmap') .select(`
      *,
      roadmap_views(*),
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
    `)
    .eq('id', roadmapId)
    .single();
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

const initRoadmapView = () => {
  const roadmapView = roadmap.value.roadmap_views.find(view => view.default);
  store.setView(roadmapView.id);
}

if(roadmap.value) {

  initRoadmapView();

  store.setRoadmap(roadmap.value);

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
    width: 100%;
}

.content {
  overflow: auto;
  height: calc(100vh - var(--header-height));
  width: 100%;
}
</style>~/store/roadmap