<script setup lang="ts">
import { computed } from 'vue';
import { get_transaction, UUID } from '../account_management/ledger_state';
import AccountNameTableCell from '../Accounts/AccountNameTableCell.vue';
import CounterpartyNameTableCell from '../Counterparties/CounterpartyNameTableCell.vue';
import { format_currency } from '../readout_formatting/money';
import { format_date } from '../readout_formatting/date';
import TransactionModal from '../TransactionModal.vue';
import DeleteTransactionModal from '../DeleteModals/DeleteTransactionModal.vue';

const props = defineProps<{
  uuid: UUID,
  columns: string[]
}>();

const transaction = computed(() => get_transaction(props.uuid));
</script>

<template>
  <tr>
    <AccountNameTableCell v-if="columns.includes('account')" :uuid="transaction.account_id" />
    <CounterpartyNameTableCell v-if="columns.includes('counterparty')" :uuid="transaction.counterparty_id" />
    <td class="align-right" :class="{'positive': transaction.amount > 0}">{{ format_currency(transaction.amount) }}</td>
    <td>{{ format_date(transaction.timestamp) }}</td>
    <td>
      <TransactionModal button-icon="edit" :transaction-uuid="uuid" />
    </td>
    <td>
      <DeleteTransactionModal button-icon="delete" :transaction-uuid="uuid" />
    </td>
  </tr>
</template>
