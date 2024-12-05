<script setup lang="ts">
import { UUID } from '../account_management/ledger_state'
import { Ref, ref } from 'vue'
import CounterpartiesTable from './CounterpartiesTable.vue'
import CounterpartyView from './CounterpartyView.vue'

const currently_viewing: Ref<UUID | null> = ref(null)
</script>

<template>
  <div id="counterparties">
    <div id="counterparties-top-bar">
      <span id="counterparties-title"> Counterparties </span>
      <span v-if="currently_viewing != null" id="back-button-counterparty" @click="currently_viewing = null">
        Back
      </span>
    </div>
    <CounterpartiesTable v-if="currently_viewing == null"
      @open-counterparty="(uuid: UUID) => (currently_viewing = uuid)" />
    <CounterpartyView v-if="currently_viewing != null" :counterparty_uuid="currently_viewing" />
  </div>
</template>

<style lang="scss">
#counterparties {
  max-width: 40%;
  min-width: fit-content;
  margin-top: var(--outer-gutter);
  margin-left: auto;
  margin-right: auto;
  padding: 0;
}

#counterparties-top-bar {
  display: flex;
  justify-content: space-between;
}

#counterparties-title {
  @extend %header;
}

#back-button-counterparty {
  @extend %clickable;
  @extend %ibm-plex-serif;
  font-size: 1.5em;
  align-self: center;
}
</style>
