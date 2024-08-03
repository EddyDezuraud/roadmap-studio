<template>
    <div :class="$style.wrapper">
        <div v-for="column in columns" :key="column.date" :class="$style.item" :style="{width: column.size + 'px'}">
            <span>
                {{ formatMonthYear(column.date) }}
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Column } from '@/types/roadmap';

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
    height: var(--header-cols-height);
}

.firstCol {
    width: calc(var(--product-width) + var(--segment-width) + var(--product-gap) + var(--product-padding));
    background: var(--grey);
}

.item {
    width: var(--col-size);
    border-right: var(--border-dashed);
    font-size: var(--font-size-m);
    text-transform: capitalize;
    height: var(--header-cols-height);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: var(--dark);
}
</style>