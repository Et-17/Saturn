<script setup lang="ts">
import { onMounted } from "vue";
import { load_ledger } from './account_management/ledger_state';
import Sidebar from "./Sidebar/Sidebar.vue";

onMounted(load_ledger);
</script>

<template>
    <div class="page">
        <RouterView />
    </div>
    <Sidebar />
</template>
