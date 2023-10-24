<script setup lang="ts">
import { useDark } from "@vueuse/core"
import { Wallet } from "mainnet-js"
import { store } from "../stores/store"
import {
  isValidCashAddress,
  isTokenID,
  QueryType
} from '../utils'
import { ref } from "vue"
import { useSearchStore } from "@/stores/search"
import { storeToRefs } from "pinia"

const isDark = useDark()

const searchStore = useSearchStore()
const {query, validatedQuery} = storeToRefs(searchStore)

// async function handleSearchQuery(event: Event) {
//   let value = (event.target as HTMLInputElement).value
//   let isValid = isValidCashAddress(value)
//   if (isValid === true) {
//     store.query = value
//     store.validatedQuery.query = value
//     store.validatedQuery.queryType = QueryType.cashaddress
//     store.wallet = await Wallet.fromCashaddr(value)
//   } else {
//     store.wallet = null
//   }

//   if (isTokenID(value)) {
//     store.query = value
//     store.validatedQuery.query = value
//     store.validatedQuery.queryType = QueryType.token
//   }
// }

async function handleSubmit() {
  console.log(`query: ${query.value}`)
  await searchStore.search()
}
</script>

<template>
  <!-- <div class="search-bar bg-secondary container">
    <img v-if="!isDark" src="../assets/images/search.svg" alt="search">
    <img v-if="isDark" src="../assets/images/search-dark.svg" alt="search">
    <input @change="handleSearchQuery" :value="store.query" class="search-input"
      placeholder="search by cashaddress or tokenid" />
  </div> -->
  <div class="search-bar bg-secondary container">
    <form @submit.prevent="handleSubmit" class="search-form">
      <img v-if="!isDark" @click="handleSubmit" src="../assets/images/search.svg" alt="search">
      <img v-if="isDark" @click="handleSubmit" src="../assets/images/search-dark.svg" alt="search">
      <input v-model="query" class="search-input"
        placeholder="search by cashaddress or tokenid" />
    </form>


  </div>
</template>



<style scoped>
input:focus,
button:focus {
  box-shadow: none !important;
}

.search-bar {
  /* display: flex;
  flex-direction: row; */
  box-shadow: -50vmax 0 var(--bg-secondary-color), 50vmax 0 var(--bg-secondary-color);
  /* box-shadow: 0 0 0 100vmax var(--bg-tertiary-color); */
  overflow: hidden;
}

.search-form {
  display: flex;
  flex-direction: row;
  width: 100vmax;
}

.search-bar input {
  border: none;
  outline: none;
  background: transparent;
  /* color: var(--font-color); */
  color: var(--color-lightGrey);

}

@media only screen and (min-width: 1200px) {
  .search-form {
  margin-left: 33rem;

}
}
</style>