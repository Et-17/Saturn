<script setup lang="ts">
import { counterparties, Counterparty, get_transaction, UUID } from '../account_management/ledger_state';
import { format_date } from '../readout_formatting/date';

function get_last_transaction_time(counterparty: Counterparty) {
  let lastIndex = counterparty.transactions.length;
  let lastTransactionUUID = counterparty.transactions[lastIndex - 1];
  return get_transaction(lastTransactionUUID).timestamp;
}

const emit = defineEmits<{
  openCounterparty: [uuid: UUID]
}>();
</script>

<template>
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
        <td @click="$emit('openCounterparty', counterparty[0])">
          <span class="clickable">
            {{ counterparty[1].name }}
          </span>
        </td>
        <td class="align-right">{{ counterparty[1].transactions.length }}</td>
        <td>{{ format_date(get_last_transaction_time(counterparty[1])) }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style lang="scss"></style>
