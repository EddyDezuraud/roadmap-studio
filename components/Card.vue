<template>
    <NuxtLink :to="`roadmap?id=${roadmap.id}`">
        <span>{{ roadmap.title }}</span>
        <span v-if="roadmap.subtitle">{{ roadmap.subtitle }}</span>
    </NuxtLink>
</template>

<script setup lang="ts">
interface Props {
    id: Number;
    title: String;
    subtitle?: String;
}
</script>