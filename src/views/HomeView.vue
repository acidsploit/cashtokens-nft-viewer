<script setup lang="ts">
import HomeSearchBar from '@/components/HomeSearchBar.vue';
import RecentMints from '@/components/RecentMints.vue';
</script>

<template>
    <div class="container wrapper">
        <h1>Browse CashTokens NFT Collections</h1>
        <p>By searching for a Bitcoin Cash address you can browse, track and share CashTokens NFT collections.</p>
        <HomeSearchBar />
    </div>
    <RecentMints />
    
</template>

<style scoped>
.wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 40vh;
}

.wrapper p {
    text-align: center;
    margin: 0 0 5rem 0;
}

h1 {
    text-align: center;
}
</style>