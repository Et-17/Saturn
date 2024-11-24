import { contextBridge, ipcRenderer } from "electron";
import { Account, Counterparty } from "./account_management/account_management";

contextBridge.exposeInMainWorld("storage", {
    write_ledger_file: (accounts: Account[], counterparties: Counterparty[]) =>
        ipcRenderer.invoke("write_ledger_file", accounts, counterparties),
    read_ledger_file: () => ipcRenderer.invoke("read_ledger_file")
});
