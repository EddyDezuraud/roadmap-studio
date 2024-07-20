<template>
    <NuxtLink :to="`roadmap?id=${id}`" :class="$style.wrapper">
        <div :class="$style.content">
            <div :class="$style.text">
                <span :class="$style.title">{{ title }}</span>
                <span v-if="subtitle" :class="$style.subtitle">{{ subtitle }}</span>
            </div>
            <div :class="$style.timeline">
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    </NuxtLink>
</template>

<script setup lang="ts">
interface Props {
    id: Number;
    title: String;
    subtitle?: String;
}

const props = defineProps<Props>();
</script>

<style module>
.wrapper {
    border: solid 1px #EBEEF1;
    border-radius: 10px;
    padding: 0px 16px 0 16px;
    /* background: linear-gradient(180deg, #FFFFFF 0%, #F9FAFB 100%); */
    background: linear-gradient(90deg, #FFE1E6, #E6CEFF, #D4FCFF, #E7FFCA);
    background: linear-gradient(90deg, #E8ECFF, #E3FFF7);
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: flex-end;
    height: 180px;
    width: 400px;
    overflow: hidden;
}

.content {
    width: 100%;
    background: white;
    height: calc(100% - 16px);
    /* border: solid 1px #EBEEF1; */
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    padding: 20px;
    border-radius: 10px 10px 0 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: height 0.3s;
}

.text {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.title {
    color: var(--dark);
    font-weight: 500;
    font-size: 14px;
}

.subtitle {
    font-weight: 300;
    font-size: 12px;
    color: var(--dark-100);
}

.icon {
    width: 20px;
    height: 20px;
}

.timeline {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.timeline > div {
    height: 10px;
    width: 50%;
    border-radius: 10px;
    background: var(--dark-100);
    opacity: 0.1;
}

.timeline > div:nth-child(2) {
    align-self: center;
}

.timeline > div:nth-child(3) {
    align-self: flex-end;
}
</style>