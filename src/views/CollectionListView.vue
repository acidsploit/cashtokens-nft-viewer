<script setup lang="ts">
import { useFavorites } from '@/stores/favorites';
import router from "@/router"

const favorites = useFavorites()

function toggleSidebar() {
  let doc = document.getElementById("sidebar")
  if (doc !== null) {
    doc.classList.toggle("collapsed")
  }
}
</script>

<template>
  <span id="btn-close-sidebar" class="close material-symbols-outlined" @click="toggleSidebar">
    cancel
  </span>

  <div class="col title">
    <h3>My</h3>
    <h3>Collections</h3>
  </div>
  <div class="container favourites">
    <div class="favorite" v-for="favorite in favorites.list" v-bind:key="favorite.id">
      <div class="fav-title" @click="router.push(`/collection/${favorite.id}`)">{{ favorite.title }}</div>
      <span class="edit material-symbols-outlined" @click="favorites.remove(favorite.id)">
        edit
      </span>
      <span class="remove material-symbols-outlined" @click="favorites.remove(favorite.id)">
        close
      </span>

    </div>
  </div>
</template>

<style scoped>
#btn-close-sidebar {
  float: right;
  margin: 1rem 1rem 0 0;
  font-size: 4rem;
}
.title {
  padding-top: 15px;
  margin-bottom: 4rem;
}

.title h3 {
  margin-left: 1.7rem;
  max-width: 5rem;
  text-align: left;
  font-size: 1.5em;
  font-weight: 800;
  line-height: 1.5rem;
  transform: rotate(-13deg);
}

.favorite {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  color: var(--color-lightGrey);
  background-color: var(--bg-secondary-color);
  border-radius: 8px;
  margin-bottom: 1rem;
  font-weight: 600;
}

.fav-title {
  flex-grow: 5;
  padding: 1rem;
  cursor: pointer;
  overflow: hidden;
}

.remove {
  cursor: pointer;
  flex-grow: 0;
  margin-right: 1rem;
  color: red;
}

@media only screen and (min-width: 768px) {
  #btn-close-sidebar {
    display: none;
  }
}

.material-symbols-outlined {
  font-variation-settings:
    'FILL' 0,
    'wght' 400,
    'GRAD' 0,
    'opsz' 32
}
</style>