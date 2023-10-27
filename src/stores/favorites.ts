import { acceptHMRUpdate, defineStore } from "pinia"
import { ref } from "vue"

export interface Favorite {
  id: string,
  title: string,
}

export const useFavorites = defineStore('favorites', () => {

  const list = ref([] as Favorite[])
  const initialList = localStorage.getItem("favorites")
  if (initialList) {
    list.value = JSON.parse(initialList)
  } else {
    list.value.push({
      id: "bitcoincash:zry95eucgfkjs8087p5suge6s730py4jjqu4vumuh9/77a95410a07c2392c340384aef323aea902ebfa698a35815c4ef100062c6d8ac",
      title: "sploit's Ninjas"
    })
  }

  function add(id: string, title: string) {
    const find = list.value.find(fav =>  fav.id === id )

    if (find === undefined) {
      list.value.push({
        id: id,
        title: title,
      })
      localStorage.setItem("favorites", JSON.stringify(list.value))
    }

  }

  function remove(id: string) {
    list.value = list.value.filter(favorite => favorite.id !== id)
    localStorage.setItem("favorites", JSON.stringify(list.value))
  }

  function update(id: string, title: string) {
    list.value.forEach(favorite => {
      if (favorite.id === id) {
        favorite.title = title
      }
    });
    localStorage.setItem("favorites", JSON.stringify(list.value))
  }

  function isFav(id: string): boolean {
    if (list.value.find((fav) => { return fav.id === id })) {
      return true
    } 
      
    return false
  }

  return { list, add, remove, update, isFav }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useFavorites, import.meta.hot))
}