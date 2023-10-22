<script setup lang="ts">
import { store } from '../stores/store'
import { QueryType } from '../utils'
</script>

<template>
<nav class="nav">
      <div class="nav-center">
        <div class="tabs">
          <RouterLink v-if="store.query !== ''" :to="`/nfts/${store.query}`">NFTs</RouterLink>
          <RouterLink v-if="store.query !== ''" :to="`/tokens/${store.query}`">Tokens</RouterLink>
          <RouterLink v-if="store.validatedQuery.queryType === QueryType.cashaddress && store.query !== ''"
            :to="`/bch/${store.query}`">Bitcoin Cash</RouterLink>
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