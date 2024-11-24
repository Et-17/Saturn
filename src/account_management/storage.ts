import { PathLike } from "node:fs";
import { Account, Counterparty } from "./account_management";
import fs from "node:fs/promises";

// So, in Express you can only access files in secure contexts blah blah so I'm
// the functions in this file cannot be accessed directly. They get loaded
// globally in preload.ts.

export async function save_ledger(path: PathLike, accounts: Account[], counterparties: Counterparty[]): Promise<void> {
    console.log("saving ledger");
    let json_string = JSON.stringify({ accounts, counterparties });
    return fs.writeFile(path, json_string, { encoding: "utf8" });
}

export async function load_ledger(path: PathLike): Promise<[Account[], Counterparty[]]> {
    console.log("loading ledger");

    // Check if a ledger file exists
    if (!fs.access(path)) {
        await save_ledger(path, [], []); // Instantiate empty ledger
    }

    let json_string = await fs.readFile(path, { encoding: "utf8" });
    let parsed_ledger = JSON.parse(json_string);
    if (!parsed_ledger["accounts"] || !parsed_ledger["counterparties"]) {
        throw "Malformed ledger file";
    }
    return [parsed_ledger["accounts"], parsed_ledger["counterparties"]];
}
