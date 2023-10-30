<script setup lang="ts">
const props = defineProps({
  address: { type: String, required: true },
  tokenId: { type: String, required: true },
  commitment: {type: String, required: true},
})

</script>

<template>
<h1>NFT Details</h1>
<p>{{ props.address }}</p>
<p>{{ props.tokenId }}</p>
<p>{{ props.commitment }}</p>
</template>

<style scoped>
</style>