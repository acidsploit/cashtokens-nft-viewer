<script setup lang="ts">
import HomeSearchBar from '@/components/HomeSearchBar.vue';

// import WalletNav from "@/components/WalletNav.vue";

</script>

<template>
    <!-- <WalletNav /> -->
    <div class="container wrapper">
        <h1>Browse NFT Collections</h1>
        <p>By searching a Bitcoin Cash address you can browse, track and share NFT CashTokens collections.</p>
        <HomeSearchBar />
    </div>
</template>

<style scoped>
.wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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