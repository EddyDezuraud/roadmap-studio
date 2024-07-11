<template>
    <div :class="$style.wrapper" :style="{'--primary' : color, height: getHeight}">
        <div :class="$style.name">
            <span contenteditable="true" 
                @input="updateSegmentName"
                spellcheck="false">
                {{ segmentName }}
            </span>
        </div>
        <button :class="$style.addSegment" @click="onAddSegment">
            <div>
                <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
            </div>
        </button>
    </div>
</template>

<script setup lang="ts">
import type { Segment } from '~/types/roadmap';
import { roadmapStore } from '~/store/roadmap';
const store = roadmapStore();

interface Props {
    segment: Segment;
    color: string;
}

const props = defineProps<Props>();

const segmentName = ref(props.segment.name);

const getHeight = computed<string>(() => {
    return `calc(${props.segment.lines.length} * var(--segment-line-height))`;
});

const onAddSegment = () => {
    const newSegment = {
        name: 'Nouveau segment',
        product_id: props.segment.product_id,
        index: props.segment.index + 1,
    };
    
    useFetchRoadmap().addNewSegment(newSegment.name, newSegment.product_id, newSegment.index);
};

const updateSegmentName = async (event: Event) => {
    const target = event.target as HTMLSpanElement;
    segmentName.value = target.textContent || '';
    const newSegment = await useFetchRoadmap().updateSegmentName(props.segment.id, segmentName.value);

    if(newSegment) {
        store.addSegment(newSegment, props.segment.product_id);
    }
};
</script>

<style module>
.wrapper {
    display: flex;
    color: var(--primary);
    align-items: center;
    flex: 1;
    /* border-bottom: var(--border); */
    position: relative;
}

.wrapper:hover {
    z-index: 4;
}

.wrapper::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--primary);
    opacity: 0.05;
    z-index: 0;
}

.name {
    position: relative;
    z-index: 2;
    width: var(--segment-width);
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-weight: 600;
    font-size: var(--font-size-m);
    line-height: 1.2;
    height: 100%;
}

.name > span {
    padding: 10px;
}

.name > span:focus {
    outline: none;
}

.addSegment {
    position: absolute;
    top: calc(100% + (var(--segment-gap) / 2));
    width: 75%;
    left: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    font-size: var(--font-size-s);
    gap: 5px;
    padding: 2px;
    transform: translateY(-50%) translateX(-50%);
    opacity: 0;
    cursor: pointer;
    font-weight: 600;
    color: black;
    border: none;
    background: rgba(255, 255, 255, 0.5);
    padding: 4px;
}

.addSegment:hover {
    opacity: 1;
}

.addSegment svg {
    width: 12px;
    height: 12px;
}
</style>