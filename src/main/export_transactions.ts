import { dialog } from "electron";
import csv from '@fast-csv/format';

export async function export_transactions(transactions: string[][]) {
    const save_dialog_return = await dialog.showSaveDialog({
        filters: [
            {name: "Comma-Separated Values", extensions: ['csv']}
        ]
    });
    
    if (save_dialog_return.canceled) {
        return;
    }

    csv.writeToPath(save_dialog_return.filePath, transactions, {
        headers: ["Account", "Counterparty", "Amount", "Timestamp"]
    });
}