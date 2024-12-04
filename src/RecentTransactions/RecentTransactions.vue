<script setup lang="ts">
// import { computed } from 'vue';
import { load_ledger, save_ledger, } from '../account_management/ledger_state';
import RecentTransactionTable from "./RecentTransactionTable.vue";
</script>

<template>
  <div id="main-block">
    <span id="recent-transactions-title">Recent Transactions</span>
    <button @click="load_ledger">Get</button>
    <button @click="save_ledger">Save</button>
    <RecentTransactionTable />
  </div>
</template>

<style lang="scss">
@use "../style_atoms.scss";

#main-block {
  max-width: 40%;
  min-width: fit-content;
  margin-top: var(--outer-gutter);
  margin-left: auto;
  margin-right: auto;
  padding: 0;
}

#recent-transactions-title {
  @extend %header;
}
</style>
