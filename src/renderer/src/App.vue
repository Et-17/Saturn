<script setup lang="ts">
import { onMounted, ref } from "vue";
import RecentTransactions from "./RecentTransactions/RecentTransactions.vue";
import { accounts, counterparties, load_ledger, new_account, new_counterparty, new_transaction, save_ledger, transactions } from './account_management/ledger_state';
import Accounts from "./Accounts/Accounts.vue";
import Sidebar from "./Sidebar/Sidebar.vue";
import Counterparties from "./Counterparties/Counterparties.vue";

const current_page = ref("recent-transactions");

onMounted(load_ledger);
</script>

<template>
    <RecentTransactions v-if="current_page == 'recent-transactions'" />
    <Accounts v-if="current_page == 'accounts'" />
    <Counterparties v-if="current_page == 'counterparties'" />
    <Sidebar v-model:current="current_page" />
</template>
