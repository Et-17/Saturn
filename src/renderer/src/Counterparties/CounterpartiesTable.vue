<script setup lang="ts">
import { counterparties, Counterparty, get_transaction } from '../account_management/ledger_state';
import DeleteCounterpartyModal from '../DeleteModals/DeleteCounterpartyModal.vue';
import { format_date } from '../readout_formatting/date';
import CounterpartyModal from './CounterpartyModal.vue';
import CounterpartyNameTableCell from './CounterpartyNameTableCell.vue';

function get_last_transaction_time(counterparty: Counterparty): string {
  let lastIndex = counterparty.transactions.length;
  if (lastIndex == 0) {
    return "N/A"; // No transactions
  }
  let lastTransactionUUID = counterparty.transactions[lastIndex - 1];
  return format_date(get_transaction(lastTransactionUUID).timestamp);
}
</script>

<template>
  <span class="header">Counterparties</span>
  <table>
    <thead>
      <tr>
        <th scope="col">Name</th>
        <th scope="col">Transactions</th>
        <th scope="col">Last</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="counterparty of counterparties">
        <CounterpartyNameTableCell :uuid="counterparty[0]" />
        <td class="align-right">{{ counterparty[1].transactions.length }}</td>
        <td>{{ get_last_transaction_time(counterparty[1]) }}</td>
        <td>
          <CounterpartyModal button-icon="edit" :counterparty-uuid="counterparty[0]" />
        </td>
        <td>
          <DeleteCounterpartyModal button-icon="delete" :counterparty-uuid="counterparty[0]" />
        </td>
      </tr>
      <tr>
        <td>
          <CounterpartyModal button-icon="add" />
        </td>
      </tr>
    </tbody>
  </table>
</template>
