<template>
    <div :class="$style.wrapper">
        <div v-for="column in columns" :key="column.name" :class="$style.item">
            <span>
                {{ formatMonthYear(column.date) }}
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

const formatMonthYear = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' });
};
</script>

<style module>
.wrapper {
    display: flex;
    font-weight: 600;
    text-align: center;
    border-bottom: var(--border);
    height: var(--header-cols-height);
}

.firstCol {
    width: calc(var(--product-width) + var(--segment-width) + var(--product-gap) + var(--product-padding));
    background: var(--grey);
    border-right: var(--border);
}

.item {
    width: var(--col-size);
    border-right: var(--border);
    font-size: 13px;
    height: var(--header-cols-height);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
</style>