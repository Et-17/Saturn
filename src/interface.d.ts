import { Account, Counterparty } from "./account_management/account_management";

export interface IStorageApi {
    write_ledger_file: (accounts: Account[], counterparties: Counterparty[]) => Promise<void>;
    read_ledger_file: () => Promise<[Account[], Counterparty[]]>;
}

declare global {
    interface Window {
        storage: IStorageApi
    }
}
