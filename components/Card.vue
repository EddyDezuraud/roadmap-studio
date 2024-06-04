<template>
    <NuxtLink :to="`roadmap?id=${id}`" :class="$style.wrapper">
        <div :class="$style.text">
            <span :class="$style.title">{{ title }}</span>
            <span v-if="subtitle" :class="$style.subtitle">{{ subtitle }}</span>
        </div>
        <svg :class="$style.icon" viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 6l6 6l-6 6" /></svg>
    </NuxtLink>
</template>

<script setup lang="ts">
interface Props {
    id: Number;
    title: String;
    subtitle?: String;
}

const props = defineProps<Props>();
</script>

<style module>
.wrapper {
    border: solid 1px #EBEEF1;
    border-radius: 5px;
    padding: 20px;
    background: linear-gradient(180deg, #FFFFFF 0%, #F9FAFB 100%);
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.text {
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-size: 13px;
}

.title {
    font-weight: 500;
    font-size: 14px;
}

.subtitle {
    font-weight: 500;
    opacity: 0.75;
}

.icon {
    width: 20px;
    height: 20px;
}
</style>