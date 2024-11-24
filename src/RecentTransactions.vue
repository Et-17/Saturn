<script setup lang="ts">
function get_ledger() {
  window.storage.get_ledger();
}

function save_ledger() {
  window.storage.save_ledger([], []);
}
</script>

<template>
  <div id="main-block">
    <span id="recent-transactions-title">Recent Transactions</span>
    <button @click="get_ledger">Get</button>
    <button @click="save_ledger">Save</button>
  </div>
</template>

<style lang="scss">
@use "style_atoms.scss";

#main-block {
  margin: var(--outer-gutter);
  padding: 0;
}

#recent-transactions-title {
  @extend %header;
  font-size: 1.5rem;
}
</style>
