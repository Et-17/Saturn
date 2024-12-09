<script setup lang="ts">
import { delete_transaction, get_account, get_counterparty, transactions } from '../account_management/ledger_state';
import { format_currency } from "../readout_formatting/money";
import { format_date } from '../readout_formatting/date';
import TransactionModal from '../TransactionModal.vue';
import DeleteTransactionModal from '../DeleteTransactionModal.vue';
</script>

<template>
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
        <td>{{ get_account(transaction[1].account_id).name }}</td>
        <td>{{ get_counterparty(transaction[1].counterparty_id).name }}</td>
        <td class="align-right">{{ format_currency(transaction[1].amount) }}</td>
        <td>{{ format_date(transaction[1].timestamp) }}</td>
        <td>
          <TransactionModal button-icon="edit" :transaction-uuid="transaction[0]" />
          <DeleteTransactionModal button-icon="delete" :transaction-uuid="transaction[0]" />
        </td>
      </tr>
      <tr>
        <td>
          <TransactionModal button-icon="add" />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style lang="scss" scope>
td.material-symbols-outlined {
  vertical-align: -15%;
}
</style>
