<script setup lang="ts">
import { ref } from "vue";
import { useDark } from "@vueuse/core"

import { useSearchStore } from "@/stores/search"

import SearchError from "./SearchError.vue";

const isDark = useDark()
const search = useSearchStore()

const query =  ref("")

async function handleSubmit() {
  await search.search("query", query.value)
}
</script>

<template>
  <div class="search-bar">
    <form @submit.prevent="handleSubmit" class="search-form">
      <input v-model.trim="query" class="search-input" placeholder="search by cashaddress" />
      <img v-if="!isDark" @click="handleSubmit" src="../assets/images/search.svg" alt="search">
      <img v-if="isDark" @click="handleSubmit" src="../assets/images/search-dark.svg" alt="search">
    </form>
    <SearchError v-if="search.error !== null" :error="search.error" :type="'inline'" />
  </div>
</template>

<style scoped>
input:focus,
button:focus {
  box-shadow: none !important;
}

.search-bar {
    min-width: 90%;
}

.search-bar input {
  border: none;
  outline: none;
  background: var(--bg-secondary-color);
  /* color: var(--font-color); */
  color: var(--color-lightGrey);
  border-radius: 4px 0 0 4px;
}

.search-form {
    display: flex;
    flex-direction: row;
}

.search-form img {
    background: var(--bg-secondary-color);
    padding: 0 1rem 0 1rem;
    border-radius: 0 4px 4px 0;
    border-style: solid;
    border-width: 0 0 0 1px;
    border-color: var(--color-lightGrey);
}

.search-form img:hover {
    cursor: pointer;
}

@media only screen and (min-width: 900px) {
    .search-bar {
        min-width: 60vw;
    }

}

@media only screen and (min-width: 1200px) {
    .search-bar {
        min-width: 60rem;
    }

}
</style>