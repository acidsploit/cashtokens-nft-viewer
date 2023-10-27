<script setup lang="ts">
import { useDark } from '@vueuse/core';
import { AtomSpinner } from 'epic-spinners'

const isDark = useDark()
</script>

<template>
  <div class="container">
    <h1>Charging Flux Capacitor...</h1>
    <atom-spinner v-if="isDark" :animation-duration="1000" :size="60" color="#00c3ff" />
    <atom-spinner v-if="!isDark" :animation-duration="1000" :size="60" color="#0ac18e" />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 5rem 0 5rem 0;
}
</style>