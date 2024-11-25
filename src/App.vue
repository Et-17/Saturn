<script setup lang="ts">
import RecentTransactions from "./RecentTransactions/RecentTransactions.vue";
</script>

<template>
    <RecentTransactions />
</template>

<style lang="scss">
// title font
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap');

* {
    box-sizing: border-box;
}

:root {
    --palette-background: #E0C87E;
    --outer-gutter: 40px;
    --inner-gutter: 20px;
    color: rgb(30, 30, 30);
}
</style>

<!--
COLORS:
#E0BC7E
#E0D47E
#E0C87E Background (analogous center)
#E0AD7E
#E0E07E
#E0DAC8 (lighter varient)
-->
