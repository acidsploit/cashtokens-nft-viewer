<script setup lang="ts">
import { useFavorites } from '@/stores/favorites';
import router from "@/router"
import { ref } from 'vue';

const favorites = useFavorites()
const edit = ref(false)

function toggleSidebar() {
  let doc = document.getElementById("sidebar")
  if (doc !== null) {
    doc.classList.toggle("collapsed")
  }
}

function toggleEdit() {
  edit.value = !edit.value
  favorites.save()
}
</script>

<template>
  <div class="wrapper">

    <div class="btn-menu">
      <span @click="toggleEdit" :class="edit ? 'hide' : ''" class="edit material-symbols-outlined" title="Edit favorites">
        edit
      </span>
      <span @click="toggleEdit" :class="edit ? '' : 'hide'" class="done material-symbols-outlined" title="Save changes">
        done
      </span>
      <span @click="toggleSidebar" id="btn-close-sidebar" class="close material-symbols-outlined" title="Close sidebar">
        cancel
      </span>
    </div>

    <div class="title">
      <h3>My</h3>
      <h3>Favorites</h3>
    </div>

    <div class="container favourites">
      <div class="favorite" v-for="favorite in favorites.list" v-bind:key="favorite.id">
        <div @click="router.push(`/collection/${favorite.id}`)" :class="edit ? 'hide' : ''" class="fav-title">{{
          favorite.title }}</div>
        <span @click="favorites.remove(favorite.id)" :class="edit ? 'hide' : ''" class="remove material-symbols-outlined"
          :title="`Remove ${favorite.title}`">
          close
        </span>
        <form @submit.prevent="toggleEdit">
          <input :class="edit ? '' : 'hide'" v-model.trim="favorite.title">
        </form>

      </div>
    </div>

  </div>
</template>

<style scoped>
.wrapper {
  border-right-color: var(--color-primary);
  border-right-style: solid;
  border-right-width: 1px;
}

.btn-menu {
  float: right;
  margin: 1rem 1rem 0 0;
}

.edit {
  cursor: pointer;
  margin-right: .5rem;
  font-size: 4rem;
}

.done {
  cursor: pointer;
  margin-right: .5rem;
  font-size: 4rem;
  color: green;
}

.close {
  cursor: pointer;
  margin-left: 1.5rem;
  font-size: 4rem;
}

.hide {
  display: none;
}

.title {
  margin-bottom: 4rem;
}

.title h3 {
  margin-top: 2rem;
  margin-left: 1.7rem;
  width: fit-content;
  text-align: left;
  font-size: 2.5rem;
  font-weight: 800;
  line-height: 1rem;
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

@media only screen and (min-width: 900px) {
  #btn-close-sidebar {
    display: none;
  }

  .wrapper {
    height: auto;
    min-height: 60vh;
    border-style: solid;
    border-radius: 8px;
    border-width: 1px 1px 1px 1px;
    border-color: var(--color-darkGrey);
    /* border-width: 0 0 0 0; */
    background-color: transparent;
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