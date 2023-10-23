<script setup lang="ts">
import { RouterView } from "vue-router"
import { useDark } from "@vueuse/core"

import router from './router'
import { store } from './stores/store'

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
  <header class="bg-primary">
    <TopSearchBar />
    <button type="button" id="btn-open-sidebar" @click="toggleSidebar" class="button clear icon-only">
      <img v-if="!isDark" src="./assets/images/menu.svg" alt="icon">
      <img v-if="isDark" src="./assets/images/menu-dark.svg" alt="icon">
    </button>
    <DarkSwitch />
      <div class="brand">
          <img @click="handleLogoClick" class="logo" src="./assets/images/cashtokens-logo.svg">
          <div class="col-1">
            <h1>NFT</h1>
            <h1>Viewer</h1>
          </div>
          
      </div>

    <!-- <SearchBar v-show="$route.name !== 'settings'" /> -->
  </header>

  <main class="container">
    <div id="sidebar" class="sidebar bg-secondary collapsed">
      <CollectionListView />
    </div>
    <div class="content">
      <RouterView />
    </div>
  </main>

  <footer class="bg-secondary">
    <FooterView />
  </footer>
</template>

<style scoped>

div.content {
  min-height: 50vmin;
}

.brand {
  padding: 10px 0 10px 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.col-1 {
  text-align: left;
}

.brand h1 {
  margin: 0;
  font-size: 2em;
  font-weight: 800;
  line-height: 40px;
  transform: rotate(-13deg);
}

@media screen and (max-width: 599px) {
  .col, [class*="col-"], [class^="col-"] {
    flex: 0 0 calc((100% / (12/1)) - var(--grid-gutter)) !important;
  }
}


.logo {
  max-width: 100px;
  /* margin-top: 15px; */
}

.brand img {
  cursor: pointer;
}

header {
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
    border-style: solid;
    border-radius: 4px;
    border-width: 2px;
    border-color: var(--color-darkGrey);
    background-color: transparent;
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
</style>
