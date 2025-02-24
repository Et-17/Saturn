<script setup lang="ts">
import { format_currency } from '../readout_formatting/money';
import { format_date } from '../readout_formatting/date';
import { UUID, get_account } from '../account_management/ledger_state';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import TransactionTable from '../TransactionTable/TransactionTable.vue';

const props = defineProps<{
  account_uuid: UUID;
}>();

const account = computed(() => get_account(props.account_uuid))

const router = useRouter();

function go_back() {
  router.back();
}
</script>

<template>
  <div class="page-top-bar">
    <span class="header">Account</span>
    <span class="back-button" @click="go_back">Back</span>
  </div>
  <span class="information-header">Account: </span>
  <span class="information">{{ account.name }}</span>
  <br>
  <span class="information-header">Balance: </span>
  <span class="information">{{ format_currency(account.balance) }}</span>
  <br>
  <span class="information-header">Created: </span>
  <span class="information">{{ format_date(account.creation_timestamp) }}</span>
  <br>
  <span class="information-header">Description: </span>
  <span class="information">{{ account.description ?? "None" }}</span>
  <br>
  <TransactionTable id="account-view-table" :transaction_uuids="account.transactions" :hidden="['account']" />
</template>

<style lang="scss">
#account-view-table {
  margin-top: 1.5em;
}
</style>

