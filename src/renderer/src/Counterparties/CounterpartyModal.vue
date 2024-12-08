<script setup lang="ts">
import { Ref, ref } from 'vue';
import Modal from '../Modal.vue';
import { Counterparty, counterparties, new_counterparty, UUID } from '../account_management/ledger_state';
import Error from '../Error.vue';

const props = defineProps<{
    buttonIcon: string,
    counterpartyUuid?: UUID
}>();

const active = defineModel<boolean>('active', { default: false });

console.log(props.counterpartyUuid);
let counterparty: Counterparty | undefined = undefined;
if (props.counterpartyUuid != undefined) {
    counterparty = counterparties.value.get(props.counterpartyUuid);
}

// Account variables
// name
// description
let name: Ref<string> = ref(counterparty?.name ?? "");
let description: Ref<string> = ref(counterparty?.description ?? "");

const error_message = ref("Arf! Arf!");

// This function exits the modal and not the add button because if something
// goes wrong, I don't want to exit the modal
function finish() {
    if (name.value == "") {
        error_message.value = "Missing account name";
        return;
    }

    if (props.counterpartyUuid == undefined) {
        new_counterparty(name.value, description.value);
        name.value = "";
        description.value = "";
    } else if (counterparty != undefined) {
        // If the description field is blank, we want to store it as undefined
        // in the Account object
        const proc_description = description.value.trim() == "" ?
            undefined : description.value.trim();
        counterparties.value.set(props.counterpartyUuid, {
            name: name.value.trim(),
            description: proc_description,
            transactions: counterparty.transactions,
        });
    } else {
        error_message.value = "Could not find account to edit";
    }

    active.value = false;
}
</script>

<template>
    <span class="material-symbols-outlined clickable" @click="active = true">
        {{ buttonIcon }}
    </span>
    <Modal :active="active">
        <span class="input-label">Name:</span>
        <input type="text" v-model="name" />

        <span class="input-label">Description:</span>
        <input type="text" v-model="description" />

        <Error v-if="error_message != ''">{{ error_message }}</Error>
        <div class="spacing" v-if="error_message == ''"></div>
        <div class="page-top-bar">
            <span class="clickable" @click="finish()">
                {{ counterpartyUuid == undefined ? "Add" : "Save" }}
            </span>
            <span class="clickable" @click="active = false">
                Cancel
            </span>
        </div>
    </Modal>
</template>

<style lang="scss" scoped>
span:not(.material-symbols-outlined) {
    @extend .information-header;
    line-height: 200%;
}

input {
    @extend .information;
    background-color: var(--input-background);
    width: 30%;
    border: unset;
    font-size: inherit;

    &:focus-visible {
        outline: unset;
    }
}

span.clickable:not(.material-symbols-outlined) {
    font-size: 1.25em;
}

.input-label {
    margin-inline-end: 0.5em;
}

.spacing {
    height: 1em;
}
</style>
