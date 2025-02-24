<script setup lang="ts">
import { computed } from 'vue';
import { UUID } from '../account_management/ledger_state';
import TransactionEntry from './TransactionEntry.vue';
import TransactionModal from '../TransactionModal.vue';
import ExportTransactions from '../ExportTransactions.vue';

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
      <th scope="col" v-for="column in visible_columns">
        {{ column[1] }}
      </th>
    </thead>
    <tbody>
      <TransactionEntry v-for="uuid in transaction_uuids" :uuid="uuid" :columns="visible_column_names" />
      <tr>
        <td>
          <TransactionModal button-icon="add" />
        </td>
        <td v-for="_ in visible_column_names.length"></td>
        <td>
          <ExportTransactions button-icon="download" :transactions="Array.from(transaction_uuids)" />
        </td>
      </tr>
    </tbody>
  </table>
</template>
