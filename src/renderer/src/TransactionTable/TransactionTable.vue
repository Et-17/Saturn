<script setup lang="ts">
import { computed } from 'vue';
import { UUID } from '../account_management/ledger_state';
import TransactionEntry from './TransactionEntry.vue';
import TransactionModal from '../TransactionModal.vue';
import ExportTransactions from '../ExportTransactions.vue';
import { vHelpText } from '../Help/help';

const props = defineProps<{
  transaction_uuids: UUID[],
  // This is an array of the column codes to hide
  hidden: string[],
}>();

// The columns that can be displayed or hidden. This is in the form of [code name, display name]
const columns = [
  ["account", "Account"],
  ["counterparty", "Counterparty"],
  ["amount", "Amount"],
  ["timestamp", "Timestamp"]
];

const visible_columns = computed(() => columns.filter(([name, _]) => !props.hidden.includes(name)));
const visible_column_names = computed(() => visible_columns.value.map(([name, _]) => name));
</script>

<template>
  <table>
    <thead>
      <tr>
        <th scope="col" v-if="visible_column_names.includes('account')" v-help-text="{id: 'account-header', text: 'The account involved in the transaction'}">
          Account
        </th>
        <th scope="col" v-if="visible_column_names.includes('counterparty')" v-help-text="{id: 'counterparty-header', text: 'The counterparty involved in the transaction'}">
          Counterparty
        </th>
        <th scope="col" v-if="visible_column_names.includes('amount')">Amount</th>
        <th scope="col" v-if="visible_column_names.includes('timestamp')">Date</th>
      </tr>
    </thead>
    <tbody>
      <TransactionEntry v-for="uuid in transaction_uuids" :uuid="uuid" :columns="visible_column_names" />
      <tr>
        <td>
          <TransactionModal button-icon="add" />
        </td>
        <td v-for="_ in visible_column_names.length">
          <span class="material-symbols-outlined"></span>
        </td>
        <td>
          <ExportTransactions button-icon="download" :transactions="Array.from(transaction_uuids)" />
        </td>
      </tr>
    </tbody>
  </table>
</template>
