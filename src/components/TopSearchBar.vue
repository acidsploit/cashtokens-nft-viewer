<script setup lang="ts">
import { ref } from "vue";

import { useSearch } from "@/stores/search"
import { useSettings } from "@/stores/settings";

const settings = useSettings()
const search = useSearch()

const query = ref("")

async function handleSubmit() {
  await search.search("query", query.value)
}
</script>

<template>
  <div class="search-bar bg-secondary container">
    <form @submit.prevent="handleSubmit" class="search-form">
      <img v-if="!settings.isDark" @click="handleSubmit" src="../assets/images/search.svg" alt="search">
      <img v-if="settings.isDark" @click="handleSubmit" src="../assets/images/search-dark.svg" alt="search">
      <input v-model.trim="query" class="search-input" placeholder="search by cashaddress" />
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
  color: var(--color-lightGrey);

}

@media only screen and (min-width: 1200px) {
  .search-form {
    margin-left: 33rem;
  }
}
</style>