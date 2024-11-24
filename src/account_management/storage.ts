import { Account, Counterparty } from "./account_management";
import fs from "node:fs";

// So, in Express you can only access files in secure contexts blah blah so I'm
// the functions in this file cannot be accessed directly. They get loaded
// globally in preload.ts.

function load_financial_data(path: string): [Account[], Counterparty[]] {
    return [[], []];
}
