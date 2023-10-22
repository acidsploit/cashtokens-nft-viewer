<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { onMounted, ref } from 'vue';
import { useDark } from "@vueuse/core";

import { QueryType } from './utils'
import router from './router'
import { store } from './store'

import CollectionListView from './views/CollectionListView.vue'
import SearchBar from './components/SearchBar.vue'
import FooterView from './views/FooterView.vue'
import DarkSwitch from './components/DarkSwitch.vue'
import TopSearchBar from './components/TopSearchBar.vue'

const isDark = useDark()

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
  <header class="bg-secondary">
    <TopSearchBar />

    <button type="button" id="btn-open-sidebar" @click="toggleSidebar" class="button clear icon-only">
      <img :src="`/src/assets/images/menu${isDark ? '-dark' : ''}.svg`" alt="icon">
    </button>

    <DarkSwitch />

    <a class="brand">
      <img @click="handleLogoClick" class="logo" src="./assets/images/cashtokens-logo.svg">
    </a>

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
  </header>

  <main>
    <div id="sidebar" class="sidebar bg-tertiary collapsed">
      <CollectionListView />
    </div>
    <!-- <div class="content bg-primary"> -->
    <div class="content">
      <RouterView />
    </div>
  </main>

  <footer class="bg-secondary">
    <FooterView />
  </footer>
</template>

<style scoped>
.logo {
  max-width: 150px;
  margin-top: 0px;
}

.nav a {
  align-items: end;
}

header {
  padding-bottom: 10px;
  text-align: center;
}

.content {
  align-self: center;
}

footer {
  margin-top: 0px;
  align-self: flex-end stretch;
}

.sidebar {
  height: 100%;
  overflow: auto;

  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;
  width: 90%;
  transition: width .35s;

  border-right-color: var(--color-primary);
  border-right-style: solid;
  border-right-width: 1px;
}

#sidebar.collapsed {
  width: 0;
}

#btn-open-sidebar {
  position: absolute;
  left: 0;
  top: 50;
  z-index: 1;
}

@media only screen and (min-width: 768px) {
  main {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .sidebar {
    flex: 20%;
    position: inherit;
    height: auto;
    border-right-style: none;
  }

  #sidebar.collapsed {
    width: auto;
  }

  .content {
    flex: 80%;
  }

  #btn-open-sidebar {
    display: none;
  }
}

@media only screen and (min-width: 1200px) {
  .sidebar {
    flex: 15%;
  }

  .content {
    flex: 85%;
  }
}

/* .sidebar {
  border-right-color: var(--color-primary);
  border-right-style: solid;
  border-right-width: 1px;
}

#sidebar {
  height: 100%;
  overflow: auto;
}

#sidebar {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;
  width: 90%;
  transition: width .35s;
} */
</style>
