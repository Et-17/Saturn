<script setup lang="ts">
import { Ref, ref } from 'vue';
import Modal from './Modal.vue';
import Error from './Error.vue';
import { export_transactions, get_account, get_counterparty, get_transaction, transactions, UUID } from './account_management/ledger_state';

const props = defineProps<{
  buttonIcon: string,
  transactions: UUID[]
}>();

const active = defineModel<boolean>('active', { default: false });

const error_message = ref("");

function format_transaction(id: UUID): string[] {
  const transaction = get_transaction(id);
  return [
    get_account(transaction.account_id).name,           // Account
    get_counterparty(transaction.counterparty_id).name, // Counterparty
    transaction.amount.toString(),                      // Amount
    transaction.timestamp.toISOString()                 // Date/Time
  ]
}

async function format_transactions(ids: UUID[]): Promise<string[][]> {
  return ids.map(format_transaction);
}

async function export_transactions_button() {
  // window.storage.export_transactions_call(format_transactions(props.transactions));
  export_transactions(await format_transactions(props.transactions));
}

</script>

<template>
  <span class="material-symbols-outlined clickable" @click="export_transactions_button">
    {{ buttonIcon }}
  </span>
</template>