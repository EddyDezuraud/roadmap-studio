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
.wrapper {
    height: var(--header-height);
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 24px;
    border-bottom: solid 1px #EBEEF1;
}

.title {
    text-align: left;
    font-family: 'Poppins', serif;
    font-weight: 500;
    font-size: var(--font-size-xl);
    color: var(--dark);
}
</style>