<script setup lang="ts">
import { ref } from 'vue';
import { new_account, new_counterparty } from './account_management/account_management';

const boop = ref(null);

async function get_ledger() {
  boop.value = await window.storage.get_ledger();
}

function save_ledger() {
  window.storage.save_ledger([], []);
}

let account_1 = new_account("Checking", "My checking account");
let account_2 = new_account("Savings", "My savings account");

let employer = new_counterparty("Lakewood High School", "My employer");
let walmart = new_counterparty("Walmart", "Multinational supermarket chain");

account_1.transactions.push({
  counterparty_id: employer.id,
  amount: 200,
  timestamp: new Date()
})

account_2.transactions.push({
  counterparty_id: employer.id,
  amount: 50,
  timestamp: new Date()
})

account_1.transactions.push({
  counterparty_id: walmart.id,
  amount: -100,
  timestamp: new Date()
})

let accounts = [account_1, account_2];
let counterparties = [employer, walmart];
window.storage.save_ledger(accounts, counterparties);
</script>

<template>
  <div id="main-block">
    <span id="recent-transactions-title">Recent Transactions</span>
    <button @click="get_ledger">Get</button>
    <button @click="save_ledger">Save</button>
    <span>{{ boop }}</span>
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
