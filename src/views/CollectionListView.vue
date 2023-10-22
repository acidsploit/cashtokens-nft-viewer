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
  <div class="col title">
    <h3>Collection</h3>
    <h3>List</h3>
  </div>
  <!-- <fieldset>
      <legend>Collection List</legend>
    </fieldset> -->
</template>

<style scoped>
p {
  text-align: center;
}

.title {
  padding-top: 15px;
}

.title h3 {
  margin: 0;
  text-align: center;
  font-size: 1.5em;
  font-weight: 800;
  line-height: 30px;
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