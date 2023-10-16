<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import SearchBar from './components/SearchBar.vue';
import { ref } from 'vue';
import { store } from './store'
import { QueryType } from './utils';

// let query = ref('')


</script>

<template>
  <header>
    <div class="wrapper">
      <div class="nav-center">
        <a class="brand">
          <img class="logo" src="./assets/images/cashtokens-logo.png">
        </a>
      </div>

      <!-- <SearchBar v-model="query" v-show="$route.name!=='settings'" /> -->
      <!-- <SearchBar v-model:query="query" v-show="$route.name !== 'settings'" /> -->
      <SearchBar v-show="$route.name !== 'settings'" />

      <nav class="nav">
        <div class="nav-center">
          <div class="tabs">
            <RouterLink to="/">NFTs</RouterLink>
            <RouterLink :to="`/tokens/${ store.query }`">Tokens</RouterLink>
            <RouterLink v-if="store.validatedQuery.queryType === QueryType.cashaddress" :to="`/bch/${ store.query }`">Bitcoin Cash</RouterLink>
            <!-- <RouterLink to="/settings">Settings</RouterLink> -->
          </div>
        </div>
      </nav>
      <!-- <SearchBar v-model="query" v-show="$route.name !== 'settings'" /> -->
      <!-- <p>query: {{ store.query }}</p> -->

    </div>
  </header>

  <body>
    <RouterView />


  </body>
</template>

<style scoped>
h1 {
  margin-bottom: 0;
}

.nav a {
  align-items: end;
}

.logo {
  max-width: 150px;
  margin-top: 15px;
}
</style>
