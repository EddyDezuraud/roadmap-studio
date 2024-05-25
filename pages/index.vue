<template>
    <div :class="$style.wrapper" :style="{'--col-size': data?.metaData.colSize + 'px'}">
        <div v-if="data?.metaData">
            <title>{{ data?.metaData.title }}</title>
            <Header :title="data?.metaData.title" />
            <Roadmap :data="data" />
        </div> 
    </div>

</template>    

<script setup lang="ts">
import type { DataModel } from '@/types/data';
const { data } = useFetch<DataModel>('http://localhost:3000/data.json');

const { colSize, setColSize } = useColSize()

if (data.value?.metaData) {
  setColSize(data.value.metaData.colSize)
}
</script>

<style module>
.wrapper {
    padding: 65px 35px;
    overflow: auto;
}
</style>