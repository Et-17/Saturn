import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { read_ledger_file, write_ledger_file } from '../renderer/src/account_management/ledger_storage'
import { export_transactions } from './export_transactions'

// If we're in production, we want to tuck the ledger file safely along with the
// rest of the program files. However, in development, it will get deleted
// after every build/run and it's inconvient to view in the IDE. So, in that
// case, we store it in the directory that you run Saturn from.
const LEDGER_FILE_NAME = "ledger.json";
const LEDGER_PATH = process.env.NODE_ENV == 'development' ?
  LEDGER_FILE_NAME : join(__dirname, LEDGER_FILE_NAME);

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// We can't directly interact with the file system in the window process, so
// we instead pass a message to the main process to do it for us. For maximal
// security, I'm only exposing the fully built ledger storage functions, rather
// than expose all of fs.
app.whenReady().then(() => {
  ipcMain.handle("write_ledger_file", (_, accounts, counterparties, transactions) =>
    write_ledger_file(LEDGER_PATH, accounts, counterparties, transactions));
  ipcMain.handle("read_ledger_file", () => read_ledger_file(LEDGER_PATH));
  ipcMain.handle("export_transactions", (_, transactions) => export_transactions(transactions));
})
