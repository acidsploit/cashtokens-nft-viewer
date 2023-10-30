<script setup lang="ts">
import { RouterView } from "vue-router"
import { useDark } from "@vueuse/core"

import router from './router'

import FavoritesView from './views/FavoritesView.vue'
import FooterView from './views/FooterView.vue'
import DarkSwitch from './components/DarkSwitch.vue'
import TopSearchBar from './components/TopSearchBar.vue'

const isDark = useDark()

function handleLogoClick() {
  router.push('/')
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
      <div @click="handleLogoClick" class="title col-1">
        <h1>NFT</h1>
        <h1>Viewer</h1>
      </div>
    </div>
  </header>

  <main class="container">
    <div id="sidebar" class="sidebar bg-primary collapsed">
      <FavoritesView />
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
.brand {
  margin: 2rem 0 1rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.col-1 {
  text-align: left;
  min-width: fit-content;
  padding-bottom: 4rem;
}

.brand h1 {
  margin: 0;
  font-size: 2em;
  font-weight: 800;
  line-height: 40px;
  transform: rotate(-13deg);
}

.logo {
  max-width: 100px;
  cursor: pointer;
}

.title {
  cursor: pointer;

}

header {
  text-align: center;
}

main {
  margin-bottom: 50px;
}

main.container {
  flex-direction: row;
}

.content {
  align-self: flex-start;
  min-height: 60vh;
  /* height: 100% */
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

footer {
  box-shadow: 0 50vh 0 50vh var(--bg-secondary-color);
}

@media only screen and (min-width: 768px) {
  main {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .sidebar {
    min-width: 30rem;
    margin-right: 1rem;
    flex: 1;
    position: inherit;
    height: auto;
    border-style: solid;
    border-radius: 8px;
    border-width: 1px 1px 1px 1px;
    border-color: var(--color-darkGrey);
    /* border-width: 0 0 0 0; */
    background-color: transparent;
  }

  #sidebar.collapsed {
    width: auto;
  }

  .content {
    flex: 5;
  }

  #btn-open-sidebar {
    display: none;
  }
}

@media screen and (max-width: 599px) {

  .col,
  [class*="col-"],
  [class^="col-"] {
    flex: 0 0 calc((100% / (12/1)) - var(--grid-gutter)) !important;
  }
}
</style>
