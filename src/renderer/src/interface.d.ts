import { Account, Counterparty } from "./account_management/account_management";

export interface IStorageApi {
    write_ledger_file: (accounts: UUIDMap<Account>, counterparties: UUIDMap<Counterparty>, transactions: UUIDMap<Transaction>) => Promise<void>;
    read_ledger_file: () => Promise<[UUIDMap<Account>, UUIDMap<Counterparty>, UUIDMap<Transaction>]>;
}

declare global {
    interface Window {
        storage: IStorageApi
    }
}
