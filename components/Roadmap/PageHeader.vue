<template>
    <div :class="$style.wrapper">
        <div :class="$style.leftPart">
            <div :class="$style.tabs">
                <div :class="[$style.tab, $style.current]">
                    <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-map"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 7l6 -3l6 3l6 -3v13l-6 3l-6 -3l-6 3v-13" /><path d="M9 4v13" /><path d="M15 7v13" /></svg>
                    <span>
                        Timeline
                    </span>
                </div>
                <div :class="$style.tab">
                    <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="currentColor"  class="icon icon-tabler icons-tabler-filled icon-tabler-calendar"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M16 2a1 1 0 0 1 .993 .883l.007 .117v1h1a3 3 0 0 1 2.995 2.824l.005 .176v12a3 3 0 0 1 -2.824 2.995l-.176 .005h-12a3 3 0 0 1 -2.995 -2.824l-.005 -.176v-12a3 3 0 0 1 2.824 -2.995l.176 -.005h1v-1a1 1 0 0 1 1.993 -.117l.007 .117v1h6v-1a1 1 0 0 1 1 -1zm3 7h-14v9.625c0 .705 .386 1.286 .883 1.366l.117 .009h12c.513 0 .936 -.53 .993 -1.215l.007 -.16v-9.625z" /><path d="M12 12a1 1 0 0 1 .993 .883l.007 .117v3a1 1 0 0 1 -1.993 .117l-.007 -.117v-2a1 1 0 0 1 -.117 -1.993l.117 -.007h1z" /></svg>
                    <span>
                        Agenda
                    </span>
                </div>
            </div>
        </div>
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

.leftPart {
    display: flex;
    align-items: center;
}

.tabs {
    display: flex;
    border: var(--border);
    border-radius: 5px;
    overflow: hidden;
}

.tabs > *:not(:last-child) {
    border-right: var(--border);
}

.tab {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: var(--font-size-l);
    cursor: pointer;
    padding: 5px 10px;
    color: var(--dark-100);
    font-weight: 500;
    position: relative;
}

.tab:hover {
    background: var(--dark-hover)
}

.tab.current {
    color: var(--primary);
}

.tab.current::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100%;
    width: 100%;
    background: currentColor;
    opacity: 0.1;
}

.tab svg {
    width: 16px;
    opacity: 0.75;
}
</style>