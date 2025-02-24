<script setup lang="ts">
import { load_example_ledger } from '../account_management/ledger_state';
import SidebarButton from './SidebarButton.vue';

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
      <SidebarButton :route-name="button[0]" :icon-name="button[1]" />
    </template>
    <span class="clickable ibm-plex-serif" @click="load_example_ledger">
      Open example ledger
    </span>
  </div>
</template>

<style lang="scss" scoped>
#sidebar {
  position: fixed;
  inset-block-start: var(--outer-gutter);
  inset-inline-start: var(--outer-gutter);
  inset-block-end: var(--outer-gutter);
}

#sidebar span {
  position: fixed;
  inset-block-end: var(--outer-gutter);
}
</style>
