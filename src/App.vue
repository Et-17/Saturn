<script setup lang="ts">
import { ref, Ref } from "vue";
import RecentTransactions from "./RecentTransactions/RecentTransactions.vue";
import { accounts, counterparties, new_account, new_counterparty, new_transaction, transactions } from './account_management/ledger_state';
import Accounts from "./Accounts/Accounts.vue";

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
</script>

<template>
    <Accounts />
</template>

<style lang="scss">
* {
    box-sizing: border-box;
}

:root {
    --palette-background: #E0C87E;
    --outer-gutter: 40px;
    --inner-gutter: 20px;
    color: rgb(30, 30, 30);
}

// Page and subpage switch transitions
.page-switch-enter-active,
.page-switch-leave-active {
    transition: opacity 0.25s;
}

.page-switch-enter-from,
.page-switch-leave-to {
    opacity: 0;
}
</style>

<!--
COLORS:
#E0BC7E
#E0D47E
#E0C87E Background (analogous center)
#E0AD7E
#E0E07E
#E0DAC8 (lighter varient)
-->
