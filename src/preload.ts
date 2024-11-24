import { contextBridge, ipcRenderer } from "electron";
import { Account, Counterparty } from "./account_management/account_management";

contextBridge.exposeInMainWorld("storage", {
    save_ledger: (accounts: Account[], counterparties: Counterparty[]) =>
        ipcRenderer.invoke("save_ledger", accounts, counterparties),
    get_ledger: () => ipcRenderer.invoke("get_ledger")
});
