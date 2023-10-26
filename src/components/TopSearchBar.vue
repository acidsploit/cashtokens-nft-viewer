<script setup lang="ts">
import { useDark } from "@vueuse/core"
import { storeToRefs } from "pinia"
import { useSearchStore } from "@/stores/search"
import router from "@/router";


const isDark = useDark()
const search = useSearchStore()

async function handleSubmit() {
  console.log(`search query: ${search.query}`)
  search.type = "query"
  await search.search()
}
</script>

<template>
  <div class="search-bar bg-secondary container">
    <form @submit.prevent="handleSubmit" class="search-form">
      <img v-if="!isDark" @click="handleSubmit" src="../assets/images/search.svg" alt="search">
      <img v-if="isDark" @click="handleSubmit" src="../assets/images/search-dark.svg" alt="search">
      <input v-model="search.query" class="search-input" placeholder="search by cashaddress" />
    </form>
  </div>
</template>

<style scoped>
input:focus,
button:focus {
  box-shadow: none !important;
}

.search-bar {
  box-shadow: -50vmax 0 var(--bg-secondary-color), 50vmax 0 var(--bg-secondary-color);
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