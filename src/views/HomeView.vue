<script setup lang="ts">
import HomeSearchBar from '@/components/HomeSearchBar.vue';

// import WalletNav from "@/components/WalletNav.vue";

</script>

<template>
    <!-- <WalletNav /> -->
    <div class="container wrapper">
        <h1>Browse CashTokens NFT Collections</h1>
        <p>By searching for a Bitcoin Cash address you can browse, track and share NFT CashTokens collections.</p>
        <HomeSearchBar />
    </div>
</template>

<style scoped>
.wrapper {
    display: flex;
    flex-direction: column;
    flex-grow: stretch;
    justify-content: center;
    align-items: center;
    min-height: 40vh;
    /* margin: 0 0 40vh 0; */
}

.wrapper p {
    text-align: center;
    margin: 0 0 5rem 0;
}

h1 {
    text-align: center;
}

.strike-through {
    text-decoration: line-through;
}
</style>