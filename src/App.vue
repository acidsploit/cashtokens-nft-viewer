<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import router from './router'
import SearchBar from './components/SearchBar.vue'
import { ref } from 'vue';
import { store } from './store'
import { QueryType } from './utils'

function handleLogoClick(){
  router.push('/')
  store.query = ""
}

</script>

<template>
  <header>
    <div class="wrapper">
      <div class="nav-center">
        <a class="brand">
          <img @click="handleLogoClick" class="logo" src="./assets/images/cashtokens-logo.png">
        </a>
      </div>

      <SearchBar v-show="$route.name !== 'settings'" />

      <nav class="nav">
        <div class="nav-center">
          <div class="tabs">
            <!-- <RouterLink to="/">HOME</RouterLink> -->
            <RouterLink v-if="store.query !== ''" :to="`/nfts/${ store.query }`">NFTs</RouterLink>
            <RouterLink v-if="store.query !== ''" :to="`/tokens/${ store.query }`">Tokens</RouterLink>
            <RouterLink v-if="store.validatedQuery.queryType === QueryType.cashaddress && store.query !== ''" :to="`/bch/${ store.query }`">Bitcoin Cash</RouterLink>
            <!-- <RouterLink to="/settings">Settings</RouterLink> -->
          </div>
        </div>
      </nav>

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
