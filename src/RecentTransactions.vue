<script setup lang="ts">
</script>

<template>
  <div id="main-block">
    <span id="recent-transactions-title">Recent Transactions</span>
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
