<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import router from './router'
import SearchBar from './components/SearchBar.vue'
import { ref } from 'vue';
import { store } from './store'
import { QueryType } from './utils'
import CollectionListView from './views/CollectionListView.vue';
import FooterView from './views/FooterView.vue';
import { readFileSync } from 'fs';

function handleLogoClick() {
  router.push('/')
  store.query = ""
}

function toggleSidebar() {
  let doc = document.getElementById("side")
  if (doc !== null) {
    doc.classList.toggle("collapsed")
  }  
}
</script>

<template>
  <!-- <div class="container"> -->
  <div id="side" class="side">
    <CollectionListView />
  </div>
    <div id="main" class="main">
      <button id="open-side" @click="toggleSidebar" title="Toggle sidebar"></button>
      <div class="header">
        <a class="brand">
          <img @click="handleLogoClick" class="logo" src="./assets/images/cashtokens-logo.png">
        </a>
      </div>

      <SearchBar v-show="$route.name !== 'settings'" />

      <nav class="nav">
        <div class="nav-center">
          <div class="tabs">
            <!-- <RouterLink to="/">HOME</RouterLink> -->
            <RouterLink v-if="store.query !== ''" :to="`/nfts/${store.query}`">NFTs</RouterLink>
            <RouterLink v-if="store.query !== ''" :to="`/tokens/${store.query}`">Tokens</RouterLink>
            <RouterLink v-if="store.validatedQuery.queryType === QueryType.cashaddress && store.query !== ''"
              :to="`/bch/${store.query}`">Bitcoin Cash</RouterLink>
            <!-- <RouterLink to="/settings">Settings</RouterLink> -->
          </div>
        </div>
      </nav>

      <RouterView />
    </div>

  <div class="footer">
    <FooterView />
  </div>
</template>

<style scoped>
.logo {
  max-width: 150px;
  margin-top: 15px;
}

.nav a {
  align-items: end;
}

.header {
  padding: 15px;
  text-align: center;
}

.side {
  border-right-color: #10c08e;
  border-right-style: solid;
  border-right-width: 1px;
}

#side, #main {
  height: 100%;
  overflow:auto;
}

#side.collapsed {
  width: 0;
}

#open-side {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
}

#side {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;
  background:white;
  width: 30%;
  /* box-shadow: 2px 0 4px rgba(0,0,0,0.5); */
  transition: width .35s;
}

#side.collapsed {
  width: 0;
}

/* .main {
  flex: 70%;
  padding: 20px;
}

.footer {
  padding: 20px;
  text-align: center;
} */
</style>
