import { contextBridge, ipcRenderer } from "electron";
import { Account, Counterparty, Transaction, UUIDMap } from "./account_management/ledger_state";

contextBridge.exposeInMainWorld("storage", {
    write_ledger_file: (accounts: UUIDMap<Account>, counterparties: UUIDMap<Counterparty>, transactions: UUIDMap<Transaction>) =>
        ipcRenderer.invoke("write_ledger_file", accounts, counterparties, transactions),
    read_ledger_file: () => ipcRenderer.invoke("read_ledger_file")
});
