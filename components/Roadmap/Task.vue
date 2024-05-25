<template>
    <div :class="$style.wrapper" :style="{width: size + 'px'}">
        <span :class="$style.name">
            {{ task.name }}
        </span>
        <div :class="$style.tags" v-if="task.tags && !task.tags.timeline">
            <span v-for="(tag, index) in task.tags.list" :key="index" :class="$style.tag">
                {{ tag.name }}
            </span>
        </div>
    </div>
</template>


<script setup lang="ts">
import type { Task } from '~/types/data';

interface Props {
    task: Task;
}

const props = defineProps<Props>();

const { colSize } = useColSize()
const size = ref(0);

const unit = computed(() => {
    return colSize.value / 8;
})

const initSize = () => {
    const diff = props.task.position.end - props.task.position.start;
    console.log(diff, unit.value);
    return diff * unit.value;
}

onMounted(() => {
    size.value = initSize();
});

watch(colSize, () => {
    size.value = initSize();
});
</script>

<style module>
.wrapper {
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

.wrapper::before {
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