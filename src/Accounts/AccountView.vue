<script setup lang="ts">
import { format_currency } from '../readout_formatting/money';
import { format_date } from '../readout_formatting/date';
import { accounts, counterparties, Transaction, transactions, UUID } from '../account_management/ledger_state';
import { computed } from 'vue';

const props = defineProps<{
  account_uuid: UUID;
}>();

function get_transaction(uuid: UUID): Transaction {
  return transactions.value.get(uuid);
}

const account = computed(() => accounts.value.get(props.account_uuid));
</script>

<template>
  <span class="account-view-info-header">Account: </span>
  <span class="account-view-info">{{ account.name }}</span>
  <br>
  <span class="account-view-info-header">Balance: </span>
  <span class="account-view-info">{{ format_currency(account.balance) }}</span>
  <br>
  <span class="account-view-info-header">Created: </span>
  <span class="account-view-info">{{ format_date(account.creation_timestamp) }}</span>
  <br>
  <table id="account-view-transaction-table">
    <thead>
      <tr>
        <th scope="col">Counterparty</th>
        <th scope="col">Amount</th>
        <th scope="col">Timestamp</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="transaction of account.transactions">
        <td>{{ counterparties.get(get_transaction(transaction).counterparty_id).name }}</td>
        <td class="account-transaction-amount">{{ format_currency(get_transaction(transaction).amount) }}</td>
        <td>{{ format_date(get_transaction(transaction).timestamp) }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style lang="scss">
@use "../style_atoms.scss";

#account-view {
  max-width: fit-content;
  margin-top: var(--outer-gutter);
  margin-left: auto;
  margin-right: auto;
  padding: 0;
}

#account-view-transaction-table {
  @extend %card-table;
  margin-top: 1.5em;
}

.account-view-info-header {
  @extend %information-header;
}

.account-view-info {
  @extend %information;
}

.account-transaction-amount {
  @extend %currency-cell;
}
</style>
