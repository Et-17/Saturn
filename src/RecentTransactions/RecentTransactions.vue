<script setup lang="ts">
// import { computed } from 'vue';
import { accounts, counterparties, new_account, new_counterparty, new_transaction, transactions } from '../account_management/ledger_state';
import { load_ledger, save_ledger, } from '../account_management/ledger_state';

const currency_formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  trailingZeroDisplay: "stripIfInteger"
});

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
  <div id="main-block">
    <span id="recent-transactions-title">Recent Transactions</span>
    <button @click="load_ledger">Get</button>
    <button @click="save_ledger">Save</button>
    <table>
      <thead>
        <tr>
          <th scope="col">Account</th>
          <th scope="col">Counterparty</th>
          <th scope="col">Amount</th>
          <th scope="col">Timestamp</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="transaction of transactions">
          <th>{{ accounts.get(transaction[1].account_id).name }}</th>
          <th>{{ counterparties.get(transaction[1].counterparty_id).name }}</th>
          <th>{{ currency_formatter.format(transaction[1].amount) }}</th>
          <th>{{ transaction[1].timestamp.toISOString() }}</th>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss">
@use "../style_atoms.scss";

#main-block {
  margin: var(--outer-gutter);
  padding: 0;
}

#recent-transactions-title {
  @extend %header;
  font-size: 1.5rem;
  display: block;
}
</style>
