<template>
    <div :class="$style.wrapper">
        <div></div>
        <h1 
            :class="$style.title" 
            contenteditable="true" 
            @input="updateTitle"
            v-text="roadmapTitle"
            spellcheck="false"></h1>
        <div></div>
    </div>
</template>

<script setup lang="ts">
import { roadmapStore } from '#imports';
import { globalStore } from '#imports';

const store = roadmapStore();
const gstore = globalStore();

interface Props {
    title: string;
}

const props = defineProps<Props>();

const roadmapTitle = ref(props.title);

const updateTitle = (event: InputEvent) => {
    roadmapTitle.value = (event.target as HTMLDivElement).innerText;
    useFetchRoadmap().updateRoadmapName(store.roadmap.id, roadmapTitle.value);
    gstore.updateRoadmapTitle(store.roadmap.id, roadmapTitle.value);
}
</script>

<style module>
.wrapper {
    height: var(--header-height);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 0 24px;
    border-bottom: var(--border);
}

.wrapper > div {
    flex: 1;
}

.title {
    text-align: left;
    font-family: 'Poppins', serif;
    font-weight: 500;
    font-size: var(--font-size-xl);
    color: var(--dark);
    padding: 4px;
    border-radius: 4px;
}
</style>