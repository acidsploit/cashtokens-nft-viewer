<script setup lang="ts">
import { Wallet } from 'mainnet-js'
import { store } from '../store'
import {
  isValidCashAddress,
  isTokenID,
  QueryType
} from '../utils'
import { ref } from 'vue'

async function handleSearchQuery(event: Event) {
  let value = (event.target as HTMLInputElement).value
  let isValid = isValidCashAddress(value)
  if (isValid === true) {
    store.query = value
    store.validatedQuery.query = value
    store.validatedQuery.queryType = QueryType.cashaddress
    store.wallet = await Wallet.fromCashaddr(value)
  } else {
    store.wallet = null
  }

  if (isTokenID(value)) {
    store.query = value
    store.validatedQuery.query = value
    store.validatedQuery.queryType = QueryType.token
  }
}

</script>


<template>
  <div class="search-box">
    <input @change="handleSearchQuery" class="search-query" placeholder="search query"
      :value="store.query" />
  </div>
</template>


<style scoped>
.search-box {
  display: flex;
  justify-content: center;
}

.search-query {
  margin-top: 10px;
  text-align: center;
  max-width: 90%;
}

@media only screen and (min-width: 768px) {
  .search-query {
    max-width: 65rem;
  }
}
</style>