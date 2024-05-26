<template>
    <div :class="$style.wrapper">
        <RoadmapHeader v-if="columns && columns.length > 0" :columns="columns"/>
        <div :class="$style.inner" v-if="products && products.length > 0">
            <RoadmapProduct v-for="(product, index) in products" :key="index" :product="product" />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Database } from '~/types/supabase';

interface Props {
    id: number; 
}

const props = defineProps<Props>();

const client = useSupabaseClient<Database>();

const {data: columns, status: columnsStatus} = await useAsyncData('columns', async () => {
    const { data } = await client.from('columns').select('*').eq('roadmap_id', props.id).order('start');
    return data
})

const {data: products, status: productsStatus} = await useAsyncData('columns', async () => {
    const { data } = await client.from('columns').select('*').eq('roadmap_id', props.id).order('start');
    return data
})

const isPending = computed(() => columnsStatus.value === 'pending' || productsStatus.value === 'pending');

</script>

<style module>
.wrapper {
    width: fit-content;
}

.inner {
    display: flex;
    gap: var(--product-gap);
}
</style>