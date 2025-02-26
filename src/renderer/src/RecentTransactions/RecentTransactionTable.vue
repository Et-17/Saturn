<script setup lang="ts">
import { transactions } from '../account_management/ledger_state';
import TransactionTable from '../TransactionTable/TransactionTable.vue';
import { vHelpText } from '../Help/help';

console.log(Array.from(transactions.value.keys()));
</script>

<template>
  <span class="header" v-help-text="{id: 'recent-transaction-header', text: 'This is the header for the recent transaction page'}">
    Recent Transactions
  </span>
  <TransactionTable :transaction_uuids="Array.from(transactions.keys())" :hidden="[]" />
</template>
