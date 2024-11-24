import { Account, Counterparty } from "./account_management/account_management";

export interface IStorageApi {
    save_ledger: (accounts: Account[], counterparties: Counterparty[]) => Promise<void>;
    get_ledger: () => Promise<[Account[], Counterparty[]]>;
}

declare global {
    interface Window {
        storage: IStorageApi
    }
}
