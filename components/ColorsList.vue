<template>
  <div :class="$style.wrapper">
    <span :class="$style.label">Couleur</span>
    <div :class="$style.list">
      <div :class="[$style.color, {[$style.active] : color === model}]" v-for="color in colors" :style="{color: color}" @click="onSelect(color)"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const model = defineModel();

const colors = [
  "#0E98D5", // Bleu vif
  "#E70037", // Rouge vif
  "#76CD32", // Vert vif
  "#9C1EFF", // Violet vif
  "#FFDD44", // Jaune vif
  "#FF7F50", // Corail
  "#7B68EE", // Bleu moyen
  "#FF1493", // Rose profond
  "#32CD99", // Vert d'eau
  "#A52A2A", // Marron
  "#40E0D0", // Turquoise
  "#FF4500",  // Orange rouge
  "#1E222C"  // Orange rouge
];

const onSelect = (color: string) => {
  model.value = color;
}
</script>

<style module>
.wrapper {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  gap: var(--input-medium-gap);
}

.label {
  font-size: 1.4rem;
    font-family: Poppins;
    font-weight: 400;
    font-style: normal;
    line-height: 2rem;
    text-decoration: none;
    text-transform: none;
  color: var(--input-medium-normal-label-color);
}

.list {
  display: flex;
  gap: 1rem;
  flex-wrap: nowrap;
}

.color {
  width: var(--size-x-large);
  aspect-ratio: 1;
  border-radius: .4rem;
  cursor: pointer;
  background: currentColor;
  box-shadow: inset 0 .2rem rgba(255,255,255,0.2),inset 0 -.1rem 0 .1rem #dce1ea20;
  transition: opacity .2s;
}

.color:hover {
  opacity: 0.6;
}

.active {
  outline: .2rem solid var(--dark);
}
</style>