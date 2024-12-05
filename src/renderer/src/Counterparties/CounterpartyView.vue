<script setup lang="ts">
import { format_date } from '../readout_formatting/date';
import { format_currency } from '../readout_formatting/money';
import { get_transaction, UUID, get_counterparty, get_account } from '../account_management/ledger_state';
import { computed } from 'vue';

const props = defineProps<{
  counterparty_uuid: UUID;
}>();

const counterparty = computed(() => get_counterparty(props.counterparty_uuid));
</script>

<template>
  <span class="counterparty-view-info-header">Counterparty: </span>
  <span class="counterparty-view-info">{{ counterparty.name }}</span>
  <br>
  <span class="counterparty-view-info-header">Description: </span>
  <span class="counterparty-view-info">{{ counterparty.description ?? "None" }}</span>
  <br>
  <table id="counterparty-view-transaction-table">
    <thead>
      <tr>
        <th scope="col">Account</th>
        <th scope="col">Amount</th>
        <th scope="col">Timestamp</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="transaction of counterparty.transactions">
        <td>{{ get_account(get_transaction(transaction).account_id).name }}</td>
        <td class="counterparty-transaction-amount">{{ format_currency(get_transaction(transaction).amount) }}</td>
        <td>{{ format_date(get_transaction(transaction).timestamp) }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style lang="scss">
@use "../style_atoms.scss";

.counterparty-view-info-header {
  @extend %information-header;
}

.counterparty-view-info {
  @extend %information;
}

#counterparty-view-transaction-table {
  @extend %card-table;
  margin-top: 1.5em;
}

.counterparty-transaction-amount {
  @extend %currency-cell;
}
</style>
