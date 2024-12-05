<script setup lang="ts">
import { UUID } from '../account_management/ledger_state'
import AccountsTable from './AccountsTable.vue'
import { ref, Ref } from 'vue'
import AccountView from './AccountView.vue'

const currently_viewing: Ref<UUID | null> = ref(null)
</script>

<template>
  <div id="accounts">
    <div id="accounts-top-bar">
      <span id="accounts-title"> Accounts </span>
      <span v-if="currently_viewing != null" id="back-button" @click="currently_viewing = null">
        Back
      </span>
    </div>
    <AccountsTable v-if="currently_viewing == null" @open-account="(uuid: UUID) => (currently_viewing = uuid)" />
    <AccountView v-if="currently_viewing != null" :account_uuid="currently_viewing" />
  </div>
</template>

<style lang="scss">
#accounts {
  max-width: 40%;
  min-width: fit-content;
  margin-top: var(--outer-gutter);
  margin-left: auto;
  margin-right: auto;
  padding: 0;
}

#accounts-top-bar {
  display: flex;
  justify-content: space-between;
}

#accounts-title {
  @extend %header;
}

#back-button {
  @extend %clickable;
  @extend %ibm-plex-serif;
  font-size: 1.5em;
  align-self: center;
}
</style>
