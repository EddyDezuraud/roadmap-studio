<template>
    <div :class="$style.wrapper">
        <h1 :class="$style.title">{{ title }}</h1>
    </div>
</template>

<script setup lang="ts">
interface Props {
    title: string;
}
defineProps<Props>();
</script>

<style module>
.title {
    text-align: center;
    font-family: 'Inria Serif', serif;
    font-size: 32px;
    color: var(--main-color);
    margin-bottom: 50px;
}
</style>