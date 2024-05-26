<template>
    <div :class="$style.wrapper" :style="{width: size + 'px', left: left + 'px'}" ref="wrapper" v-if="size > 0">
        <div :class="$style.inner">
            <span :class="$style.name">
                {{ task.name }}
            </span>
            <div :class="$style.tags" v-if="task.tags && !task.tags.timeline">
                <span v-for="(tag, index) in task.tags.list" :key="index" :class="$style.tag">
                    {{ tag.name }}
                </span>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import type { Task } from '~/types/data';

interface Props {
    task: Task;
}

const props = defineProps<Props>();
const emits = defineEmits(['init']);

const { colSize } = useColSize()
const size = ref(0);
const left = ref(0);

const wrapper = ref<HTMLDivElement | null>(null);

const unit = computed(() => {
    return colSize.value / 8;
})

const initSize = () => {
    const diff = props.task.position.end - props.task.position.start;
    return diff * unit.value;
}

const initLeft = () => {
    return props.task.position.start * unit.value;
}

const initHeight = () => {
    const height = wrapper.value?.clientHeight;
    emits('init', height);
}

onMounted(() => {
    size.value = initSize();
    left.value = initLeft();
    initHeight();
});

watch(colSize, () => {
    size.value = initSize();
    left.value = initLeft();
});

watch(size, async() => {
    await nextTick();
    initHeight();
});
</script>

<style module>
.wrapper {
    padding: 3px;
    position: absolute;
    top: 0;
}

.inner {
    display: flex;
    flex-direction: column;
    border: solid 1px currentColor;
    border-radius: 8px;
    padding: 10px 12px;
    position: relative;
}

.name {
    font-size: 13px;
    font-weight: 500;
    position: relative;
    z-index: 2;
}

.inner::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: currentColor;
    opacity: 0.15;
    border-radius: 8px;
    z-index: 0;
}

.tags {
    padding-top: 10px;
    display: flex;
    gap: 5px;
    position: relative;
    z-index: 2;
}

.tag {
    font-size: 10px;
    color: #012946;
    background: #00000010;
    padding: 3px 5px;
    border-radius: 5px;
    font-weight: 500;
}  
</style>