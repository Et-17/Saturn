<script setup lang="ts">
import { Ref, ref } from 'vue';
import Modal from '../Modal.vue';
import { accounts, counterparties, new_transaction, Transaction, transactions, UUID } from '../account_management/ledger_state';
import Error from '../../Error.vue';

const props = defineProps<{
  transactionUuid?: UUID
}>();

const active = defineModel<boolean>('active', { default: false });

console.log(props.transactionUuid);
let transaction: Transaction | undefined = undefined;
if (props.transactionUuid != undefined) {
  console.log("owo");
  transaction = transactions.value.get(props.transactionUuid);
}

let account_id: Ref<UUID | undefined> = ref(transaction?.account_id);
let counterparty_id: Ref<UUID | undefined> = ref(transaction?.counterparty_id);
let amount: Ref<number> = ref(transaction?.amount ?? 0);

const error_message = ref("");

// This function exits the modal and not the add button because if something
// goes wrong, I don't want to exit the modal
function finish() {
  if (account_id.value == undefined) {
    error_message.value = "Missing account id";
    return;
  }
  if (counterparty_id.value == undefined) {
    error_message.value = "Missing counterparty id";
    return;
  }

  if (props.transactionUuid == undefined) {
    new_transaction(account_id.value, counterparty_id.value, amount.value);
  } else if (transaction != undefined) {
    transactions.value.set(props.transactionUuid, {
      account_id: account_id.value,
      counterparty_id: counterparty_id.value,
      amount: amount.value,
      timestamp: transaction?.timestamp
    });
  } else {
    error_message.value = "Could not find transaction to edit"
  }

  active.value = false;
}

</script>

<template>
  <Modal :active="active">
    <span>Account: </span>
    <select name="account" id="account-dropdown" v-model="account_id">
      <option v-for="account in accounts" :value="account[0]" :key="account[0]">
        {{ account[1].name }}
      </option>
      <option :value="undefined">
        Select
      </option>
    </select>
    <br>

    <span>Counterparty: </span>
    <select name="counterparty" id="counterparty-dropdown" v-model="counterparty_id">
      <option v-for="counterparty in counterparties" :value="counterparty[0]" :key="counterparty[0]">
        {{ counterparty[1].name }}
      </option>
      <option :value="undefined">
        Select
      </option>
    </select>
    <br>

    <span>Amount: </span>
    <input type="number" v-model="amount">
    <Error v-if="error_message != ''">{{ error_message }}</Error>
    <div class=" page-top-bar">
      <span class="clickable" @click="finish()">
        {{ false ? "Save" : "Add" }}
      </span>
      <span class="clickable" @click="active = false">
        Cancel
      </span>
    </div>
  </Modal>
</template>

<style lang="scss" scoped>
* {
  @extend .ibm-plex-serif;
}

span {
  @extend .information-header;
}

select {
  @extend .information;
  background-color: unset;
  border: unset;
  font-size: inherit;
  text-decoration: underline;
  text-decoration-thickness: 10%;

  &:focus-visible {
    outline: unset;
  }
}

input {
  @extend .information;
  width: 30%;
  background-color: unset;
  border: unset;
  font-size: inherit;
  text-align: right;
  text-decoration: underline;
  text-decoration-thickness: 10%;

  &:focus-visible {
    outline: unset;
  }
}

span.clickable {
  @extend .ibm-plex-serif;
}
</style>
