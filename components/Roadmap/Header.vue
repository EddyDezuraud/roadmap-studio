<template>
    <div :class="$style.wrapper">
        <div v-for="column in columns" :key="column.name" :class="$style.item">
            <span>
                {{ column.name }}
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Column } from '@/types/data';

interface Props {
    columns: Column[];
}

defineProps<Props>();

</script>

<style module>
.wrapper {
    display: flex;
    font-weight: 600;
    text-align: center;
    padding-left: calc(var(--product-width) + var(--segment-width) + var(--product-gap) + var(--product-padding));
    padding-right: 20px;
}

.item {
    padding: 0 5px;
    width: var(--col-size);
}

.item > span {
    display: block;
    padding: 20px 0;
    background: #F6FAFF;
    background: #F6FAFF;
    border: solid 1px #00000003;
    border-radius: 10px 10px 0 0;
    font-size: 13px;
}
</style>