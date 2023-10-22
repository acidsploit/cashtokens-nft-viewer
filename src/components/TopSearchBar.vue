<script setup lang="ts">
import { useDark } from "@vueuse/core";

const isDark = useDark()

</script>

<template>
  <div class="search-bar bg-tertiary container">
    <img :src="`/src/assets/images/search${isDark ? '-dark' : ''}.svg`" alt="search">
    <input class="search-input" placeholder="search by cashaddress or tokenid" />
  </div>
</template>

<style scoped>
input:focus,
button:focus {
  box-shadow: none !important;
}

.search-bar {
  display: flex;
  flex-direction: row;
  box-shadow: -10vmax 0 var(--bg-tertiary-color), 10vmax 0 var(--bg-tertiary-color)
    /* box-shadow: 0 0 0 100vmax var(--bg-tertiary-color); */
}

.search-bar input {
  border: none;
  outline: none;
  background: transparent;
  color: var(--font-color)
}
</style>