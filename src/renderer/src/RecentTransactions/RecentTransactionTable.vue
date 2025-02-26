<script setup lang="ts">
import { transactions } from '../account_management/ledger_state';
import TransactionTable from '../TransactionTable/TransactionTable.vue';

console.log(Array.from(transactions.value.keys()));
</script>

<template>
  <span class="header">Recent Transactions</span>
  <TransactionTable :transaction_uuids="Array.from(transactions.keys())" :hidden="[]" />
</template>
