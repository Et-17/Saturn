<script setup lang="ts">
// import { computed } from 'vue';
import { load_ledger, save_ledger, } from '../account_management/ledger_state';
import RecentTransactionTable from "./RecentTransactionTable.vue";
</script>

<template>
  <div class="page">
    <span class="header">Recent Transactions</span>
    <button @click="load_ledger">Get</button>
    <button @click="save_ledger">Save</button>
    <RecentTransactionTable />
  </div>
</template>
