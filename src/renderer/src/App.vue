<script setup lang="ts">
import { ref } from "vue";
import RecentTransactions from "./RecentTransactions/RecentTransactions.vue";
import { accounts, counterparties, new_account, new_counterparty, new_transaction, transactions } from './account_management/ledger_state';
import Accounts from "./Accounts/Accounts.vue";
import Sidebar from "./Sidebar/Sidebar.vue";
import Counterparties from "./Counterparties/Counterparties.vue";

async function setup_example_ledger() {
    let checking = await new_account(
        "Checking",
        "My checking account",
        new Date(Date.now() - (35 * 60)),
    );
    let savings = await new_account(
        "Savings",
        "My savings account",
        new Date(Date.now() - (45 * 60))
    );

    let employer = await new_counterparty("Lakewood High School", "My employer");
    let walmart = await new_counterparty("Walmart", "Multinational supermarket chain");

    new_transaction(checking, employer, 200, new Date(Date.now() - (10 * 60)));
    new_transaction(checking, walmart, -100, new Date(Date() + (20 * 60)));
    new_transaction(savings, employer, 50, new Date(Date.now() + (60 * 60)));
}

setup_example_ledger().then(() => console.log(transactions.value, accounts.value, counterparties.value));

const current_page = ref("recent-transactions");
</script>

<template>
    <RecentTransactions v-if="current_page == 'recent-transactions'" />
    <Accounts v-if="current_page == 'accounts'" />
    <Counterparties v-if="current_page == 'counterparties'" />
    <Sidebar v-model:current="current_page" />
</template>
