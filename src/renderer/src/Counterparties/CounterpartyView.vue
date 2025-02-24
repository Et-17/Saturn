<script setup lang="ts">
import { UUID, get_counterparty } from '../account_management/ledger_state';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import TransactionTable from '../TransactionTable/TransactionTable.vue';

const props = defineProps<{
  counterparty_uuid: UUID;
}>();

const counterparty = computed(() => get_counterparty(props.counterparty_uuid));

const router = useRouter();

function go_back() {
  router.back();
}
</script>

<template>
  <div class="page-top-bar">
    <span class="header">Counterparty</span>
    <span class="back-button" @click="go_back">Back</span>
  </div>
  <span class="information-header">Counterparty: </span>
  <span class="information">{{ counterparty.name }}</span>
  <br>
  <span class="information-header">Description: </span>
  <span class="information">{{ counterparty.description ?? "None" }}</span>
  <br>
  <TransactionTable :transaction_uuids="counterparty.transactions" :hidden="['counterparty']" />
</template>

<style lang="scss" scoped>
table {
  margin-top: 1.5em;
}
</style>
