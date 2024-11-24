import { app, BrowserWindow, ipcMain } from 'electron';
import { read_ledger_file, write_ledger_file } from './account_management/storage';
import path from 'path';

const LEDGER_PATH = path.join(__dirname, "ledger.json");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// We can't directly interact with the file system in the window process, so
// we instead pass a message to the main process to do it for us. For maximal
// security, I'm only exposing the fully built ledger storage functions, rather
// than expose all of fs.
app.whenReady().then(() => {
  ipcMain.handle("write_ledger_file", (_, accounts, counterparties) =>
    write_ledger_file(LEDGER_PATH, accounts, counterparties));
  ipcMain.handle("read_ledger_file", () => read_ledger_file(LEDGER_PATH));
})
