<script setup lang="ts">
import { get_account, UUID } from '../account_management/ledger_state';

defineProps<{
  uuid: UUID
}>();
</script>

<template>
  <td>
    <RouterLink :to="{ name: 'account', params: { account_uuid: uuid }}" v-slot="{navigate}" custom>
      <span @click="navigate" class="clickable">
        {{ get_account(uuid).name }}
      </span>
    </RouterLink>
  </td>
</template>
