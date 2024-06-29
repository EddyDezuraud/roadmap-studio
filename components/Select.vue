<template>
  <div :class="[$style.wrapper, {[$style.title] : mode === 'title'}, {[$style.large] : size === 'large'}, {[$style.subtitle] : mode === 'subtitle'}]">
    <div v-if="label || subtitle" :class="$style.content">
      <label v-if="label" for="" :class="$style.label">
        {{ label }}
      </label>
      <span v-if="subtitle" :class="$style.subtitle">{{ subtitle }}</span>
    </div>
    <div :class="$style.value">
      <span>
        {{ model ? textValue : placeholder }}
      </span>
      <div>
        <svg viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-chevron-down"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 9l6 6l6 -6" /></svg>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const model = defineModel({type: Number});

interface FieldProps {
  options: {value: string | number, text: string}[];
  label?: string;
  subtitle?: string;
  multiple?: boolean;
  mode?: 'title' | 'subtitle' | 'normal';
  size?: 'small' | 'medium' | 'large';
  placeholder?: string;
}

const props = defineProps<FieldProps>();

const textValue = computed(() => {
  if(!model.value) return '';
  return props.options.find(option => option.value === model.value)?.text;
})
</script>

<style module>
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 0;
}

.label {
  font-size: var(--font-size-l);
  font-weight: 500;
  color: var(--dark);
  letter-spacing: -0.084px;
}

.value {
  border: none;
  outline: none;
  padding: 8px 10px;
  width: 100%;
  font-size: 14px;
  font-weight: 500;
  color: var(--neutral-700, #272727);
  display: flex;
  border-radius: 6px;
  background: rgb(255, 255, 255);
  box-shadow: rgb(228, 228, 231) 0px 0px 0px 1px, rgba(143, 143, 143, 0.2) 0px 1px 3px 0px;
  line-height: 20px;
  border: 1px solid transparent;
  outline: none;
  transition: all 125ms ease 0s;
  margin: 0;
}

.subtitle .value,
.title .value {
  font-size: var(--font-size-xxxl);
  padding: 5px;
  border: none;
}

.subtitle .value {
  font-size: var(--font-size-xl);
}

.subtitle .value:hover,
.title .value:hover {
  background: rgba(0,0,0,0.05);
}

.large .label {
  font-size: var(--font-size-xxl);
}

.large .value {
  padding: 12px 14px;
  font-size: var(--font-size-xxl);
}

.subtitle {
  font-size: 12px;
  color: var(--dark-100)
}

.content {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
</style>