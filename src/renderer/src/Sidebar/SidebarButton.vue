<script setup lang="ts">
defineProps<{
  routeName: string,
  iconName: string,
}>();
</script>

<template>
  <RouterLink v-slot="{navigate, isActive}" :to="{ name: routeName }" custom>
    <div @click="navigate">
      <span class="material-symbols-outlined" :class="{'selected': isActive}">
        {{ iconName }}
      </span>
    </div>
  </RouterLink>
</template>

<style lang="scss" scoped>
$icon-size: 2em;
$transition-speed: 0.25s;

div {
  cursor: pointer;
  padding: $icon-size * 0.5;
  transition: transform $transition-speed;
}

span {
  font-size: $icon-size;
  user-select: none;
  transition: font-variation-settings $transition-speed, color $transition-speed;
  font-variation-settings: 'FILL' 0;

  &.selected {
    font-variation-settings: 'FILL' 1;
    color: var(--selected-color);
  }

  div:hover>&:not(.selected) {
    font-variation-settings: 'FILL' 0.5;
  }
}
</style>
