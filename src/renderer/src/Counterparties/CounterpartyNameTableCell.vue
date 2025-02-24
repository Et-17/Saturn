<script setup lang="ts">
import { get_counterparty, UUID } from '../account_management/ledger_state';

defineProps<{
  uuid: UUID
}>();
</script>

<template>
  <td>
    <RouterLink :to="{ name: 'counterparty', params: { counterparty_uuid: uuid }}" v-slot="{navigate}" custom>
      <span @click="navigate" class="clickable">
        {{ get_counterparty(uuid).name }}
      </span>
    </RouterLink>
  </td>
</template>
