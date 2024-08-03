<template>
    <div :class="$style.wrapper">
        <div :class="$style.leftPart">
            <div :class="$style.tabs">
                <div :class="[$style.tab, $style.current]">
                    <GdvIcon icon="directions" /> 
                    <span>
                        Timeline
                    </span>
                </div>
                <div :class="$style.tab">
                    <GdvIcon icon="calendar" /> 
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

        <div :class="$style.rightPart">
            <GdvDropdown size="s">
                <template #button>
                    <button :class="$style.viewButton">
                        <div :class="$style.innerViewButton">
                            <span :class="$style.viewButtonTxt">{{ selectedView.name }}</span>
                        </div> 
                        <GdvIcon size="s" icon="chevron-down" /> 
                    </button>
                </template>
                <template v-slot="scope">
                    <div v-for="view in viewsList" :key="view.id" :class="$style.viewListItem">
                        <span>{{ view.name }}</span>
                        <GdvButtonIcon size="s" icon="pencil" />
                    </div>
                    <GdvSeparator />
                    <GdvDropdownItem>
                        <GdvIcon icon="plus" />
                        <span>Nouvelle vue</span>
                    </GdvDropdownItem>
                </template>
            </GdvDropdown>
            <GdvButtonIcon icon="link" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { roadmapStore } from '#imports';
import { globalStore } from '#imports';
import { GdvSeparator, GdvIcon, GdvDropdown, GdvDropdownItem, GdvButtonIcon } from '@gedivote/gedivote-ui-vuejs';

const store = roadmapStore();
const gstore = globalStore();

interface Props {
    title: string;
}

const props = defineProps<Props>();

const roadmapTitle = ref(props.title);
const view = ref('lr');

const viewsList = computed(() => store.roadmap.roadmap_views);
const selectedView = computed(() => store.getSelectedView);

const updateTitle = (event: InputEvent) => {
    roadmapTitle.value = (event.target as HTMLDivElement).innerText;
    useFetchRoadmap().updateRoadmapName(store.roadmap.id, roadmapTitle.value);
    gstore.updateRoadmapTitle(store.roadmap.id, roadmapTitle.value);
}
</script>

<style module>
.wrapper {
    position: relative;
    z-index: 9;
    height: var(--header-height);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 24px;
    border-bottom: var(--border);
}

.wrapper > * {
    flex: 1;
}

.title {
    text-align: center;
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

.leftPart :global(.gdv-icon) {
    color: currentColor;
}

.rightPart {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 8px;
}

.tabs {
    display: flex;
    border: var(--border);
    border-radius: 5px;
    overflow: hidden;
    box-shadow: inset 0 .2rem #fff, inset 0 -.1rem 0 .1rem #dce1ea80;
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

.select {
    width: 200px;
}

.viewButton {
    border: var(--border);
    border-radius: 5px;
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: var(--font-size-l);
    cursor: pointer;
    color: var(--dark-100);
    font-weight: 500;
    position: relative;
    width: 220px;
    justify-content: space-between;
    padding-right: 5px;
    box-shadow: inset 0 .2rem #fff, inset 0 -.1rem 0 .1rem #dce1ea80;
}

.viewButtonTxt {
    font-weight: 500;
    color: var(--dark-200);
}

.innerViewButton {
    display: flex;
    align-items: center;
    gap: 4px;
    width: calc(100% - 16px);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 10px;
}

.viewButtonPre {
    font-weight: 600;
    color: var(--dark);
}

.viewButtonPre svg {
    width: 18px;
    max-width: none;
}

:global(.gdv-dropdown-item__wrapper) p {
    display: flex;
    align-items: center;
    gap: 4px;
}

.viewListItem {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    font-size: var(--font-size-l);
    cursor: pointer;
}

.viewListItem:hover {
    background: var(--dark-hover);
}

.viewListItem :global(.gdv-button-icon) {
    opacity: 0;
}

.viewListItem:hover :global(.gdv-button-icon) {
    opacity: 1;
}
</style>