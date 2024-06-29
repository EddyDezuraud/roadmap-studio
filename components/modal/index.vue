<template>
  <Teleport to="body" v-if="model">

    <div :class="$style.wrapper">
      <div :class="$style.overlay" @click="onClose"></div>
      <div :class="$style.inner">
        <div :class="$style.insideInner">
          <div v-if="breadcrumb" :class="$style.preHeader">
            <div :class="$style.breadcrumb">
              <span v-for="(item, index) in breadcrumb" :key="index">
                <span>{{ item }}</span>
                <span v-if="index < breadcrumb.length - 1">></span>
              </span>
            </div>
            <button :class="$style.closeBtn" @click="onClose">
              <svg viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
            </button>
          </div> 

          
          <header :class="$style.header" v-if="title || subtitle">
            <div :class="$style.headerContent">
              <h2 v-if="title" :class="$style.title">{{ title }}</h2>
              <p v-if="subtitle" :class="$style.subtitle">{{ subtitle }}</p>
            </div> 
            <button v-if="!breadcrumb" :class="$style.closeBtn" @click="onClose">
              <svg viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
            </button>
            
          </header>
          <div :class="$style.content">
            <slot />
          </div>
          <div :class="$style.footer">
            <slot name="footer" />
          </div> 
        </div>
      </div> 
    </div>

  </Teleport>
</template>

<script lang="ts" setup>
interface Props {
  title?: string;
  subtitle?: string;
  breadcrumb?: string[];
}

const model = defineModel<Boolean>();

const emits = defineEmits(['update:model']);

defineProps<Props>()

const onChange = (value: boolean) => {
  emits('update:model', value);
}

const onClose = () => {
  model.value = false;
  onChange(false);
}
</script>

<style module>
.wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
}

.inner {
  position: relative;
  z-index: 1;
  background-color: white;
  border-radius: 10px;
  width: 100%;
  max-width: 1000px;
}

.content {
  padding: 20px;
  max-height: calc(100vh - 180px);
  overflow: auto;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: var(--border);
}

.footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 20px;
  border-top: var(--border);
  gap: 20px;
}

.title {
  font-size: 14px;
  color: var(--dark);
  font-weight: 500;
}

.breadcrumb {
  display: flex;
  gap: 5px;
  font-size: var(--font-size-m);
  font-weight: 500;
  color: var(--dark-100);
}

.breadcrumb > * {
  display: flex;
  gap: 5px;
}

.preHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: var(--border);
  margin-bottom: 20px;
  padding-bottom: 10px;
}

.closeBtn {
  outline: none;
  background: transparent;
  border: none;
  cursor: pointer;
}

.closeBtn svg {
  width: 20px;
}
</style>