<script setup lang="ts">
import { accounts, counterparties, new_account, new_counterparty, new_transaction, transactions } from '../account_management/ledger_state';
import { format_currency } from "../readout_formatting/money";
import { format_date } from '../readout_formatting/date';
</script>

<template>
  <table id="recent-transaction-table">
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
        <td>{{ accounts.get(transaction[1].account_id).name }}</td>
        <td>{{ counterparties.get(transaction[1].counterparty_id).name }}</td>
        <td class="amount">{{ format_currency(transaction[1].amount) }}</td>
        <td>{{ format_date(transaction[1].timestamp) }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style lang="scss">
@use "../style_atoms.scss";

#recent-transaction-table {
  @extend %card-table;
}

.amount {
  @extend %currency-cell;
}
</style>
