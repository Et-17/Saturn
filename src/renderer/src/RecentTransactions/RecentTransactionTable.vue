<script setup lang="ts">
import { get_account, get_counterparty, transactions } from '../account_management/ledger_state';
import { format_currency } from "../readout_formatting/money";
import { format_date } from '../readout_formatting/date';
import { ref } from 'vue';
import TransactionModal from './TransactionModal.vue';

const modal_active = ref(false);
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
      </tr>
      <tr>
        <td>
          <span class="material-symbols-outlined clickable" @click="modal_active = true">
            add
          </span>
          <TransactionModal v-model:active="modal_active" />
        </td>
      </tr>
    </tbody>
  </table>
</template>
