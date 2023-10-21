<script setup lang="ts">
function toggleSidebar() {
  let doc = document.getElementById("sidebar")
  if (doc !== null) {
    doc.classList.toggle("collapsed")
  }  
}
</script>

<template>
    <button @click="toggleSidebar" id="close-sidebar" title="Close sidebar"></button>
    <h1>Collection List</h1>
</template>

<style scoped>
h1 {
    text-align: center;
}

#close-sidebar {
  float:right;
}
</style>