<script setup lang="ts">
import { useSearchStore } from '@/stores/search';
import { QueryType } from '../utils'
import { storeToRefs } from 'pinia';

const search = useSearchStore()
const { 
  validatedQuery, 
  nftDetails, 
  // tokenDetails, 
  wallet 
} = storeToRefs(search)

</script>

<template>
  <nav class="nav">
    <div class="nav-center">
      <div class="tabs">
        <RouterLink v-if="wallet?.cashaddr && nftDetails.length !== 0" :to="`/nfts/${wallet.cashaddr}`">NFTs</RouterLink>
        <!-- <RouterLink v-if="wallet?.cashaddr && tokenDetails.length !== 0" :to="`/tokens/${wallet.cashaddr}`">Tokens</RouterLink> -->
        <!-- <RouterLink v-if="false && validatedQuery.queryType === QueryType.cashaddress && validatedQuery.query !== ''"
          :to="`/bch/${validatedQuery.query}`">Bitcoin Cash</RouterLink> -->
        <RouterLink v-if="validatedQuery.queryType === QueryType.address && wallet?.cashaddr"
          :to="`/bch/${wallet.cashaddr}`">Bitcoin Cash</RouterLink>
        <!-- <RouterLink :to="`/nfts/${validatedQuery.query}`">NFTs</RouterLink>
        <RouterLink :to="`/tokens/${validatedQuery.query}`">Tokens</RouterLink>
        <RouterLink :to="`/bch/${validatedQuery.query}`">Bitcoin Cash</RouterLink> -->
        <!-- <RouterLink to="/settings">Settings</RouterLink> -->
      </div>
    </div>
  </nav>
</template>


<style scoped>
.nav {
  margin-bottom: 2rem;
}
.nav a {
  align-items: end;
}
</style>