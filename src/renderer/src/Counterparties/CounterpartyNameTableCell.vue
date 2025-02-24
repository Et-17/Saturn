<script setup lang="ts">
import { UUID } from '../account_management/ledger_state';

defineProps<{
  name: string,
  uuid: UUID
}>();
</script>

<template>
  <td>
    <RouterLink :to="{ name: 'counterparty', params: { counterparty_uuid: uuid }}" v-slot="{navigate}" custom>
      <span @click="navigate" class="clickable">
        {{ name }}
      </span>
    </RouterLink>
  </td>
</template>