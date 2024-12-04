<script setup lang="ts">
import { UUID } from 'src/account_management/ledger_state';

const props = defineProps<{
  account_uuid: UUID;
}>();
</script>

<template>
  <div id="account-view">
    <span id="account-view-title">{{ account_uuid }}</span>
  </div>
</template>

<style lang="scss">
@use "../style_atoms.scss";

#account-view {
  max-width: fit-content;
  margin-top: var(--outer-gutter);
  margin-left: auto;
  margin-right: auto;
  padding: 0;
}
</style>
