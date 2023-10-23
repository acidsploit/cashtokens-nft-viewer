<script setup lang="ts">
import WalletNav from "@/components/WalletNav.vue";

</script>

<template>
    <WalletNav />
    <h1>Search Options</h1>
    <ul>
        <li>
            BitcoinCash Address
        </li>
        <li>
            CashTokens Address
        </li>
        <li class="strike-through">
            Token ID
        </li>
    </ul>
</template>

<style scoped>
h1 {
    text-align: center;
}
.strike-through {
    text-decoration: line-through;
}
</style>