import { Ref, ref, toRaw } from "vue";

// There's a lot of moving parts here, so we're gonna use UUIDs to track them.
// This is the return type of crypto.randomUUID().
export type UUID = `${string}-${string}-${string}-${string}-${string}`;

// While we could directly store the information on the counterparty inside
// each transaction, in order to better manage counterparties and be able to
// provide the user with a transaction history of that counterparty, we instead
// store the id of the counterparty involved in each transaction, and a seperate
// list of counterparties.

export interface Transaction {
    counterparty_id: UUID;
    amount: number; // negative for payments, positive for deposits
    timestamp: Date;
}

export interface Account {
    id: UUID;
    name: string;
    description?: string;
    balance: number;
    transactions: Transaction[];
    creation_timestamp: Date;
}

export interface Counterparty {
    id: UUID;
    name: string;
    description?: string;
}

export const accounts: Ref<Account[]> = ref([]);
export const counterparties: Ref<Counterparty[]> = ref([]);

export function new_transaction(counterparty_id: UUID, amount: number): Transaction {
    return {
        counterparty_id,
        amount,
        timestamp: new Date()
    }
}

export function new_account(name: string, description?: string): Account {
    return {
        id: crypto.randomUUID(),
        name,
        description,
        balance: 0,
        transactions: [],
        creation_timestamp: new Date()
    }
}

export function new_counterparty(name: string, description?: string): Counterparty {
    return {
        id: crypto.randomUUID(),
        name,
        description
    }
}

export async function load_ledger(): Promise<void> {
    let ledger = await window.storage.read_ledger_file();
    accounts.value = ledger[0];
    counterparties.value = ledger[1];
}

export async function save_ledger(): Promise<void> {
    return window.storage.write_ledger_file(toRaw(accounts.value), toRaw(counterparties.value));
}

// This looks up the index of the account with the given uuid in accounts
export function lookup_account_id(id: UUID): number {
    let index = accounts.value.findIndex((account) => account.id == id);

    if (index == -1) {
        throw new Error("No accounts exists with uuid " + id);
    }

    return index;
}

export const get_account_name = (id: UUID): string =>
    accounts.value[lookup_account_id(id)].name;
