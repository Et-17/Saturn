import { Account, Counterparty } from "./account_management/ledger_state";

export interface IStorageApi {
    write_ledger_file: (accounts: UUIDMap<Account>, counterparties: UUIDMap<Counterparty>, transactions: UUIDMap<Transaction>) => Promise<void>;
    read_ledger_file: () => Promise<[UUIDMap<Account>, UUIDMap<Counterparty>, UUIDMap<Transaction>]>;
    export_transactions_call: (transactions: string[][]) => Promise<void>;
}

declare global {
    interface Window {
        storage: IStorageApi
    }
}
