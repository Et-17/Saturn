<script setup lang="tsx">
const emit = defineEmits<{
  switchPage: [newPage: "recent-transactions" | "accounts" | "counterparties"]
}>();

// This stores the buttons in the format of [event code, text]
const buttons: ["recent-transactions" | "accounts" | "counterparties", string][] = [
  ["recent-transactions", "Recent Transactions"],
  ["accounts", "Accounts"],
  ["counterparties", "Counterparties"]
]
</script>

<template>
  <div id="sidebar">
    <template v-for="button in buttons">
      <span class="sidebar-button" @click="$emit('switchPage', button[0])">{{ button[1] }}</span>
      <br>
    </template>
  </div>
</template>

<style lang="scss">
@use "style_atoms.scss";

#sidebar {
  position: fixed;
  // left: var(--outer-gutter);
  // top: var(--outer-gutter);
  inset-block-start: var(--outer-gutter);
  inset-inline-start: var(--outer-gutter);
}

.sidebar-button {
  @extend %clickable;
  @extend %ibm-plex-serif;
  font-weight: 500;
  font-size: 1.5em;
}
</style>