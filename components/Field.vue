<template>
  <div :class="[$style.wrapper, {[$style.title] : mode === 'title'}, {[$style.subtitle] : mode === 'subtitle'}]">
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
}

.input {
  border-radius: 4px;
  border: none;
  outline: none;
  border: var(--border);
  padding: 8px 12px;
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
</style>