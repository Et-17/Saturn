// We're storing ledgers as three hashmaps that use uuids as keys: transactions,
// accounts, and counterparties.

import { ref, Ref, toRaw } from "vue";

// This is the return type of crypto.randomUUID()
export type UUID = `${string}-${string}-${string}-${string}-${string}`;
export type UUIDMap<ValueType> = Map<UUID, ValueType>;

export interface Transaction {
    account_id: UUID;
    counterparty_id: UUID;
    amount: number;
    timestamp: Date;
}

// All accounts start at $0 in order to make their history more traceable
export interface Account {
    name: string;
    description?: string;
    balance: number;
    transactions: UUID[];
    creation_timestamp: Date;
}

export interface Counterparty {
    name: string;
    description?: string;
    transactions: UUID[];
}

export const transactions: Ref<UUIDMap<Transaction>> = ref(new Map());
export const accounts: Ref<UUIDMap<Account>> = ref(new Map());
export const counterparties: Ref<UUIDMap<Counterparty>> = ref(new Map());

export function get_transaction(uuid: UUID): Transaction {
    let transaction = transactions.value.get(uuid);
    if (transaction == undefined) {
        throw `Could not find transaction ${uuid}`;
    }
    return transaction;
}

export function get_account(uuid: UUID): Account {
    let account = accounts.value.get(uuid);
    if (account == undefined) {
        throw `Could not find account ${uuid}`;
    }
    return account;
}

export function get_counterparty(uuid: UUID): Counterparty {
    let counterparty = counterparties.value.get(uuid);
    if (counterparty == undefined) {
        throw `Could not find counterparty ${uuid}`;
    }
    return counterparty;
}


export async function new_transaction(account_id: UUID, counterparty_id: UUID, amount: number, timestamp?: Date): Promise<UUID> {
    let new_uuid = crypto.randomUUID();

    if (!accounts.value.has(account_id)) {
        throw new Error(`Account id ${account_id} does not exist`);
    }
    if (!counterparties.value.has(counterparty_id)) {
        throw new Error(`Counterparty id ${counterparty_id} does not exist`);
    }
    get_account(account_id).transactions.push(new_uuid);
    get_counterparty(counterparty_id).transactions.push(new_uuid);

    transactions.value.set(new_uuid, {
        account_id,
        counterparty_id,
        amount,
        timestamp: timestamp ?? new Date()
    });

    return new_uuid;
}

export async function new_account(name: string, description?: string, creation_timestamp?: Date): Promise<UUID> {
    let new_uuid = crypto.randomUUID();
    accounts.value.set(new_uuid, {
        name,
        description,
        balance: 0,
        transactions: [],
        creation_timestamp: creation_timestamp ?? new Date
    });
    return new_uuid;
}

export async function new_counterparty(name: string, description?: string): Promise<UUID> {
    let new_uuid = crypto.randomUUID();
    counterparties.value.set(new_uuid, {
        name,
        description,
        transactions: []
    });
    return new_uuid;
}

export async function delete_transaction(key: UUID) {
    const transaction = transactions.value.get(key);
    if (transaction == undefined) {
        throw "Could not find transaction";
    }

    const account_transaction_index = accounts.value.get(transaction.account_id)?.transactions.indexOf(key);
    if (account_transaction_index == undefined) {
        throw "Could not find account";
    }
    accounts.value.get(transaction.account_id)?.transactions.splice(account_transaction_index, 1);

    const counterparty_transaction_index = counterparties.value.get(transaction.counterparty_id)?.transactions.indexOf(key);
    if (counterparty_transaction_index == undefined) {
        throw "Could not find counterparty";
    }
    counterparties.value.get(transaction.counterparty_id)?.transactions.splice(counterparty_transaction_index, 1);

    transactions.value.delete(key);
}

export async function delete_account(key: UUID) {
    const account = accounts.value.get(key);
    if (account == undefined) {
        throw "Could not find account";
    }
    // We have to copy the array with Array.from here because if we iterated
    // through account.transactions, then it would all get bungled up as we
    // delete transactions and modify that list.
    await Promise.all(Array.from(account.transactions).map(delete_transaction));

    accounts.value.delete(key);
}

// export const delete_counterparty = counterparties.value.delete;
export async function delete_counterparty(key: UUID) {
    const counterparty = counterparties.value.get(key);
    if (counterparty == undefined) {
        throw "Could not find counterparty";
    }

    // For why we use Array.from, see delete_account()
    await Promise.all(Array.from(counterparty.transactions).map(delete_transaction));
    
    counterparties.value.delete(key);
}

export async function load_ledger(): Promise<void> {
    let ledger = await window.storage.read_ledger_file();
    accounts.value = ledger[0];
    counterparties.value = ledger[1];
    transactions.value = ledger[2];
}

export async function save_ledger(): Promise<void> {
    return window.storage.write_ledger_file(toRaw(accounts.value), toRaw(counterparties.value), toRaw(transactions.value));
}
