<script setup lang="ts">
import { onMounted } from "vue";
import { load_ledger } from './account_management/ledger_state';
import Sidebar from "./Sidebar/Sidebar.vue";
import Help from "./Help/Help.vue";

onMounted(load_ledger);
</script>

<template>
    <div class="page">
        <RouterView />
        <Help />
    </div>
    <Sidebar />
</template>
