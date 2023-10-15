<script setup lang="ts">
// import { ref } from 'vue';

import { store } from '../store'

// let query = ref('')
// const emit = defineEmits(['userQuery', 'query'])
// defineProps(['query'])
// defineEmits(['update:query'])
</script>


<template>
  <div class="search-box">
    <!-- <input :value="query" @input="$emit('update:query', ($event.target as HTMLInputElement).value)" class="search-address"
      placeholder="search query" /> -->
    <input v-model="store.query" class="search-address" placeholder="search query" />
  </div>
</template>


<style scoped>
.search-box {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.search-address {
  margin-top: 10px;
  max-width: 100%;
}
</style>