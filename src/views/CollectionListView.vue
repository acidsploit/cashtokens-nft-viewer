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
    <h3>My</h3>
    <h3>Collections</h3>
  </div>
  <!-- <fieldset>
      <legend>Collection List</legend>
    </fieldset> -->
</template>

<style scoped>


.title {
  padding-top: 15px;
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