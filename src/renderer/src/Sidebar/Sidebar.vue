<script setup lang="tsx">
import SidebarButton from './SidebarButton.vue';

const current_page = defineModel<string>('current');

const emit = defineEmits<{
  switchPage: [newPage: string]
}>();

// This stores the buttons in the format of [event code, text]
const buttons: [string, string][] = [
  ["recent-transactions", "home"],
  ["accounts", "account_balance"],
  ["counterparties", "storefront"]
];
</script>

<template>
  <div id="sidebar">
    <template v-for="button in buttons">
      <SidebarButton @click="current_page = button[0]" :icon-name="button[1]" :selected="button[0] == current_page" />
    </template>
  </div>
</template>

<style lang="scss">
#sidebar {
  position: fixed;
  inset-block-start: var(--outer-gutter);
  inset-inline-start: var(--outer-gutter);
}
</style>
