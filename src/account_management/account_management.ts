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

export let accounts: Account[];
export let counterparties: Counterparty[];

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
