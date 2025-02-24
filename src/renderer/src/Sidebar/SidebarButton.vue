<script setup lang="ts">
defineProps<{
  routeName: string,
  iconName: string,
}>();
</script>

<template>
  <div>
    <RouterLink :to="{ name: routeName }" class="material-symbols-outlined" active-class="selected">
      {{ iconName }}
    </RouterLink>
  </div>
</template>

<style lang="scss" scoped>
$icon-size: 2em;
$transition-speed: 0.25s;

div {
  cursor: pointer;
  padding: $icon-size * 0.5;
  transition: transform $transition-speed;
}

a {
  color: unset;
  cursor: unset;
  text-decoration: unset;
  font-size: $icon-size;
  user-select: none;
  transition: font-variation-settings $transition-speed;
  font-variation-settings: 'FILL' 0;

  &.selected {
    font-variation-settings: 'FILL' 1;
  }

  div:hover>&:not(.selected) {
    font-variation-settings: 'FILL' 0.5;
  }
}
</style>
