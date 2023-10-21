<script setup lang="ts">
function toggleSidebar() {
  let doc = document.getElementById("sidebar")
  if (doc !== null) {
    doc.classList.toggle("collapsed")
  }  
}
</script>

<template>
    <button @click="toggleSidebar" id="btn-close-sidebar" title="Close sidebar"></button>
    <h3>Collection List</h3>
</template>

<style scoped>
h3 {
    text-align: center;
}

#btn-close-sidebar {
  float:right;
}
@media only screen and (min-width: 768px) {
  #btn-close-sidebar {
    display: none;
  }
}
</style>