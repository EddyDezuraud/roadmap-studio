<template>
  <div :class="[$style.wrapper, {[$style.title] : mode === 'title'}, {[$style.large] : size === 'large'}, {[$style.subtitle] : mode === 'subtitle'}]">
    <label for="" :class="$style.label" v-if="label">
      {{ label }}
    </label>
    <textarea v-if="type === 'textarea'" :class="$style.input" v-model="model" />
    <input v-else :class="$style.input" :type="type ? type : 'text'" v-model="model" :placeholder />
  </div>
</template>

<script lang="ts" setup>
const model = defineModel();

interface FieldProps {
  label?: string;
  type?: string;
  mode?: 'title' | 'subtitle' | 'normal';
  size?: 'small' | 'medium' | 'large';
  placeholder?: string;
}
defineProps<FieldProps>();
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

.input {
  border: none;
  outline: none;
  padding: 8px 10px;
  width: 100%;
  font-size: 14px;
  color: var(--neutral-700, #272727);
  display: flex;
  border-radius: 10px;
  background: rgb(255, 255, 255);
  box-shadow: rgb(235, 235, 235) 0px 0px 0px 1px, rgba(143, 143, 143, 0.2) 0px 1px 3px 0px;
  line-height: 20px;
  border: 1px solid transparent;
  outline: none;
  transition: all 125ms ease 0s;
  margin: 0;
}

.subtitle .input,
.title .input {
  font-size: var(--font-size-xxxl);
  padding: 5px;
  border: none;
}

.subtitle .input {
  font-size: var(--font-size-xl);
}

.subtitle .input:hover,
.title .input:hover {
  background: rgba(0,0,0,0.05);
}

.large .label {
  font-size: var(--font-size-xxl);
}

.large input {
  padding: 12px 14px;
  font-size: var(--font-size-xxl);
}
</style>