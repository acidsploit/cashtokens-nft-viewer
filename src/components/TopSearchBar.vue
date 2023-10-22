<script setup lang="ts">
import { useDark } from "@vueuse/core"
import { Wallet } from "mainnet-js"
import { store } from "../stores/store"
import {
  isValidCashAddress,
  isTokenID,
  QueryType
} from '../utils'

const isDark = useDark()

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
  <div class="search-bar bg-secondary container">
    <img :src="`/src/assets/images/search${isDark ? '-dark' : ''}.svg`" alt="search">
    <input @change="handleSearchQuery" :value="store.query" class="search-input" placeholder="search by cashaddress or tokenid" />
  </div>
</template>


<style scoped>
input:focus,
button:focus {
  box-shadow: none !important;
}

.search-bar {
  display: flex;
  flex-direction: row;
  box-shadow: -50vmax 0 var(--bg-secondary-color), 50vmax 0 var(--bg-secondary-color);
    /* box-shadow: 0 0 0 100vmax var(--bg-tertiary-color); */
  overflow: hidden;
}

.search-bar input {
  border: none;
  outline: none;
  background: transparent;
  color: var(--font-color)
}
</style>