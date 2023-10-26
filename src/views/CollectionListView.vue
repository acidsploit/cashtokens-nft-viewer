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
  <button @click="toggleSidebar" id="btn-close-sidebar" title="Close sidebar"></button>
  <div class="col title">
    <h3>My</h3>
    <h3>Collections</h3>
  </div>
  <div class="container favourites">
    <div class="favorite" v-for="favorite in favorites.list" v-bind:key="favorite.id">
      <div class="fav-title" @click="router.push(`/collection/${favorite.id}`)">{{ favorite.title }}</div>
      <span class="remove material-symbols-outlined" @click="favorites.remove(favorite.id)">
        close
      </span>

    </div>
  </div>
  <!-- <fieldset>
      <legend>Collection List</legend>
    </fieldset> -->
</template>

<style scoped>
.favorite {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  color: var(--color-lightGrey);
  background-color: var(--bg-secondary-color);
  border-radius: 8px;
  margin-bottom: 1rem;
  /* padding: 1rem; */
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

#btn-close-sidebar {
  float: right;
}

@media only screen and (min-width: 768px) {
  #btn-close-sidebar {
    display: none;
  }
}
</style>