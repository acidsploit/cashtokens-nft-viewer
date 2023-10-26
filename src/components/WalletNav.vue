<script setup lang="ts">
import { useSearchStore } from '@/stores/search';
import { QueryType } from '../utils'
import { storeToRefs } from 'pinia';

const searchStore = useSearchStore()
const { validatedQuery, nftDetails, tokenDetails } = storeToRefs(searchStore)

</script>

<template>
  <nav class="nav">
    <div class="nav-center">
      <div class="tabs">
        <RouterLink v-if="validatedQuery.query !== '' && nftDetails.length !== 0" :to="`/nfts/${validatedQuery.query}`">NFTs</RouterLink>
        <RouterLink v-if="validatedQuery.query !== '' && tokenDetails.length !== 0" :to="`/tokens/${validatedQuery.query}`">Tokens</RouterLink>
        <!-- <RouterLink v-if="false && validatedQuery.queryType === QueryType.cashaddress && validatedQuery.query !== ''"
          :to="`/bch/${validatedQuery.query}`">Bitcoin Cash</RouterLink> -->
        <RouterLink v-if="validatedQuery.queryType === QueryType.address && validatedQuery.query !== ''"
          :to="`/bch/${validatedQuery.query}`">Bitcoin Cash</RouterLink>
        <!-- <RouterLink :to="`/nfts/${validatedQuery.query}`">NFTs</RouterLink>
        <RouterLink :to="`/tokens/${validatedQuery.query}`">Tokens</RouterLink>
        <RouterLink :to="`/bch/${validatedQuery.query}`">Bitcoin Cash</RouterLink> -->
        <!-- <RouterLink to="/settings">Settings</RouterLink> -->
      </div>
    </div>
  </nav>
</template>


<style scoped>
.nav a {
  align-items: end;
}
</style>