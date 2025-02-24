/**
 * This file will automatically be loaded by vite and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.ts` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import { createApp } from 'vue';
import App from './App.vue';
import { createMemoryHistory as createWebHashHistory, createRouter } from 'vue-router';

import RecentTransactions from './RecentTransactions/RecentTransactions.vue';
import Counterparties from './Counterparties/Counterparties.vue';
import AccountView from './Accounts/AccountView.vue';
import AccountsTable from './Accounts/AccountsTable.vue';

const routes = [
    { path: '/', redirect: { name: 'recent-transactions' } },
    { path: '/recent-transactions', name: 'recent-transactions', component: RecentTransactions },
    { path: '/accounts', name: 'accounts', component: AccountsTable },
    { path: '/account/:account_uuid', name: 'account', component: AccountView, props: true},
    { path: '/counterparties', name: 'counterparties', component: Counterparties },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

createApp(App).use(router).mount('#app');
