<script setup lang="ts">
import { load_ledger, save_ledger, accounts, counterparties } from './account_management/account_management';
</script>

<template>
  <div id="main-block">
    <span id="recent-transactions-title">Recent Transactions</span>
    <button @click="load_ledger">Get</button>
    <button @click="save_ledger">Save</button>
    <p>{{ "Accounts: " + accounts.map((a) => a.name) }}</p>
    <p>{{ "Counterparties: " + counterparties.map((c) => c.name) }}</p>
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
