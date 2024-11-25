<script setup lang="ts">
import { computed } from 'vue';
import { load_ledger, save_ledger, accounts, Account, Transaction, UUID, get_account_name } from '../account_management/account_management';

type TransactionRecord = {
  account_id: UUID,
  transaction: Transaction
}

// Return a flat array of all transactions and their account id
const collect_transactions = (accs: Account[]): TransactionRecord[] =>
  accs.flatMap((acc) => acc.transactions.map((tra) => ({ account_id: acc.id, transaction: tra })));

// Sorts an array of transactions
const sort_transactions = (trns: TransactionRecord[]): TransactionRecord[] =>
  trns.sort((a, b) => b.transaction.timestamp.getTime() - a.transaction.timestamp.getTime());

const flat_transactions = computed(
  () => sort_transactions(collect_transactions(accounts.value))
);
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
        <tr v-for="transaction in flat_transactions">
          <th>{{ get_account_name(transaction.account_id) }}</th>
          <th>{{ transaction.transaction.counterparty_id }}</th>
          <th>{{ transaction.transaction.amount }}</th>
          <th>{{ transaction.transaction.timestamp }}</th>
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
