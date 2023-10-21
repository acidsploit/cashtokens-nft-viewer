<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useDark, useToggle } from "@vueuse/core";

import { QueryType } from './utils'
import router from './router'
import { store } from './store'

import CollectionListView from './views/CollectionListView.vue';
import SearchBar from './components/SearchBar.vue'
import FooterView from './views/FooterView.vue';
import DarkSwitch from './components/DarkSwitch.vue';

const isDark = useDark();
const toggleDark = useToggle(isDark)


function handleLogoClick() {
  router.push('/')
  store.query = ""
}

function toggleSidebar() {
  let doc = document.getElementById("sidebar")
  if (doc !== null) {
    doc.classList.toggle("collapsed")
  }
}
</script>

<template>
  <!-- <div class="container"> -->
  <div id="sidebar" class="sidebar">
    <CollectionListView />
  </div>
  <div id="main" class="main">
    <button id="open-sidebar" @click="toggleSidebar" title="Toggle sidebar"></button>
    <div class="header secondary">
      <DarkSwitch />
      <a class="brand">
        <img @click="handleLogoClick" class="logo" src="./assets/images/cashtokens-logo.svg">
      </a>
    </div>

    <SearchBar v-show="$route.name !== 'settings'" />

    <nav class="nav secondary">
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
    <div class="primary">
      <RouterView />
    </div>

  </div>

  <div class="footer">
    <FooterView />
  </div>
</template>

<style scoped>
.primary{
  background-color: var(--bg-color);
}
.secondary{
  background-color: var(--bg-secondary-color);
}
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

.sidebar {
  border-right-color: var(--color-primary);
  border-right-style: solid;
  border-right-width: 1px;
}

#sidebar,
#main {
  height: 100%;
  overflow: auto;
}

#sidebar.collapsed {
  width: 0;
}

#open-sidebar {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
}

#sidebar {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;
  background: transparent;
  width: 30%;
  /* box-shadow: 2px 0 4px rgba(0,0,0,0.5); */
  transition: width .35s;
}

#sidebar.collapsed {
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
