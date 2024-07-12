<template>
    <div ref="wrapperRef" :class="[$style.wrapper, {[$style.openTools] : openTools}]" :style="{'--primary' : color, height: getHeight}">
        <button :class="$style.toolButton" @click="openTools = !openTools">
            <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-dots"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M19 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /></svg>
        </button>
        <RoadmapProductsHeaderSegmentEditor 
            v-if="openTools" 
            :productId="segment.product_id"
            :segmentId="segment.id"
            @close="openTools = false" />
        <div :class="$style.name">
            <span contenteditable="true" 
                @input="updateSegmentName"
                v-text="segmentName"
                spellcheck="false">
            </span>
        </div>
        <button :class="$style.addSegment" @click="onAddSegment">
            <div :class="$style.innerAddSegment">
                <svg xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
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
const openTools = ref(false);

const wrapperRef = ref<HTMLElement | null>(null);

const getHeight = computed<string>(() => {
    return `calc(${props.segment.lines.length} * var(--segment-line-height))`;
});

const onAddSegment = async () => {
    const newSegment = {
        name: 'Nouveau segment',
        product_id: props.segment.product_id,
        index: props.segment.index + 1,
    };
    
    const seg = await useFetchRoadmap().addNewSegment(newSegment.name, newSegment.product_id, newSegment.index);

    console.log('newSegment',seg);

    if(seg) {
        store.addSegment(seg, props.segment.product_id);
    }
};

const updateSegmentName = async (event: Event) => {
    const target = event.target as HTMLSpanElement;
    segmentName.value = target.textContent || '';

    await useFetchRoadmap().updateSegmentName(props.segment.id, segmentName.value);
};

const handleClickOutside = (event: MouseEvent) => {
    if (openTools.value && wrapperRef.value && !wrapperRef.value.contains(event.target as Node)) {
        openTools.value = false;
    }
};

onMounted(() => {
    document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
});
</script>

<style module>
.wrapper {
    position: relative;
    display: flex;
    color: var(--primary);
    align-items: center;
    flex: 1;
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
    height: calc(100% + (var(--segment-gap) / 2));
    /* background: var(--primary); */
    /* opacity: 0.05; */
    z-index: 0;
    border-bottom: var(--border-dashed);
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
    padding: 4px;
    position: relative;
}

.name > span::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--primary);
    opacity: 0;
    z-index: -1;
    pointer-events: none;
    border-radius: 5px
}

.name > span:hover::before {
    opacity: 0.05;
}


.name > span:focus {
    outline: none;
}

.addSegment {
    position: absolute;
    top: calc(100% + (var(--segment-gap) / 2));
    transform: translateY(-50%); 
    left: 0;
    font-size: var(--font-size-s);
    opacity: 0;
    cursor: pointer;
    font-weight: 600;
    border: none;
    background: transparent;
}

.addSegment:hover {
    opacity: 1;
}

.addSegment::before {
    position: absolute;
    content: '';
    top: 50%;
    left: 0;
    width: 100%;
    border-bottom: solid 1px var(--primary);
}

.innerAddSegment {
    position: relative;
    z-index: 2;
    width: 25px;
    aspect-ratio: 1;
    background: var(--primary);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 10px;
}

.addSegment svg {
    color: white;
    width: 12px;
    height: 12px;
}

.toolButton {
    position: absolute;
    top: 2px;
    right: 2px;
    background: transparent;
    border: none;
    cursor: pointer;
    opacity: 0;
    width: 24px;
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    z-index: 3;
    background: rgba(255, 255, 255, 0.5);
    color: var(--dark-100);
}

.toolButton svg {
    width: 16px;
    height: 16px;
}

.openTools .toolButton,
.wrapper:hover .toolButton {
    opacity: 1;
}

.openTools .toolButton,
.toolButton:hover {
    background: white;
}
</style>