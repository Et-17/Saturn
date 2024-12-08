<script setup lang="ts">
import { format_date } from '../readout_formatting/date';
import { format_currency } from '../readout_formatting/money';
import { get_transaction, UUID, get_counterparty, get_account } from '../account_management/ledger_state';
import { computed, ref } from 'vue';
import TransactionModal from '../RecentTransactions/TransactionModal.vue';

const props = defineProps<{
  counterparty_uuid: UUID;
}>();

const modal_active = ref(false);

const counterparty = computed(() => get_counterparty(props.counterparty_uuid));
</script>

<template>
  <span class="information-header">Counterparty: </span>
  <span class="information">{{ counterparty.name }}</span>
  <br>
  <span class="information-header">Description: </span>
  <span class="information">{{ counterparty.description ?? "None" }}</span>
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
        <td class="align-right">{{ format_currency(get_transaction(transaction).amount) }}</td>
        <td>{{ format_date(get_transaction(transaction).timestamp) }}</td>
      </tr>
      <tr>
        <td>
          <span class="material-symbols-outlined clickable" @click="modal_active = true">
            add
          </span>
          <TransactionModal v-model:active="modal_active" :initialCounterpartyUuid="counterparty_uuid" />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style lang="scss" scoped>
table {
  margin-top: 1.5em;
}
</style>
