<script setup lang="ts">
import { accounts, UUID } from '../account_management/ledger_state';
import { format_currency } from '../readout_formatting/money';
import { format_date } from '..//readout_formatting/date';

const emit = defineEmits<{
  openAccount: [uuid: UUID]
}>();
</script>

<template>
  <table id="account-table">
    <thead>
      <tr>
        <th scope="col">Name</th>
        <th scope="col">Balance</th>
        <th scope="col">Transactions</th>
        <th scope="col">Created</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="account of accounts">
        <td @click="$emit('openAccount', account[0])">
          <span class="account-name">
            {{ account[1].name }}
          </span>
        </td>
        <td class="amount">{{ format_currency(account[1].balance) }}</td>
        <td class="amount">{{ account[1].transactions.length }}</td>
        <td>{{ format_date(account[1].creation_timestamp) }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style lang="scss">
@use "../style_atoms.scss";

#account-table {
  @extend %card-table;
}

.amount {
  @extend %currency-cell;
}

.account-name {
  @extend %clickable;
}
</style>
