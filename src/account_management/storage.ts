import { PathLike } from "node:fs";
import { Transaction, Account, Counterparty, UUID } from "./account_management";
import fs from "node:fs/promises";

// So, in Express you can only access files in secure contexts blah blah so I'm
// the functions in this file cannot be accessed directly. They get loaded
// globally in preload.ts.

export async function write_ledger_file(path: PathLike, accounts: Account[], counterparties: Counterparty[]): Promise<void> {
    console.log("saving ledger to", path, "(deprecated method)");
    let json_string = JSON.stringify({ accounts, counterparties });
    return fs.writeFile(path, json_string, { encoding: "utf8" });
}

// After initial deserialization, we must convert the uuid and date to
// a UUID and Date instance respectively
type RawTransaction = { counterparty_id: string, amount: number, timestamp: string };
function des_transaction(transaction: RawTransaction): Transaction {
    return {
        counterparty_id: transaction.counterparty_id as UUID,
        amount: transaction.amount,
        timestamp: new Date(transaction.timestamp)
    }
}

type RawAccount = {
    id: string,
    name: string,
    description?: string,
    balance: number,
    transactions: RawTransaction[],
    creation_timestamp: string
};
function des_account(account: RawAccount): Account {
    return {
        id: account.id as UUID,
        name: account.name,
        description: account.description,
        balance: account.balance,
        transactions: account.transactions.map(des_transaction),
        creation_timestamp: new Date(account.creation_timestamp)
    }
}

export async function read_ledger_file(path: PathLike): Promise<[Account[], Counterparty[]]> {
    console.log("loading ledger from", path, "(deprecated method)");

    let json_string: string;
    try {
        json_string = await fs.readFile(path, { encoding: "utf8" });
    } catch (error) {
        if (error.code = "ENOENT") {
            // Ledger file doesn't exist, create it
            await write_ledger_file(path, [], []);
            return [[], []];
        } else {
            throw error;
        }
    }

    let parsed_ledger: { accounts: RawAccount[], counterparties: Counterparty[] } = JSON.parse(json_string);
    if (!parsed_ledger.accounts || !parsed_ledger.counterparties) {
        throw "Malformed ledger file";
    }

    let typed_ledger: [Account[], Counterparty[]] = [
        parsed_ledger.accounts.map(des_account), // Add types to the account and transaction records
        parsed_ledger.counterparties
    ];

    return typed_ledger;
}
