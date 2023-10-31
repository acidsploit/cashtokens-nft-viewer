<script setup lang="ts">
import { useSearchStore } from '@/stores/search';
import type { Token } from '@/utils';
import { onMounted, ref } from 'vue';

const props = defineProps({
  address: { type: String, required: true },
  tokenId: { type: String, required: true },
  commitment: {type: String, required: true},
})

const search = useSearchStore()
const collection = ref(null as Token | null)

onMounted(() => {
  if (search.result.address === props.address) {
    let searchCollection = search.result.tokens.find((token) => {return token.id === props.tokenId})
    if (searchCollection != undefined) {
      console.log("we have data")
      collection.value = searchCollection
    } else {
      search.search(props.address, props.tokenId)
    }
  } else {
    search.search(props.address, props.tokenId)
  }
})

</script>

<template>
<h1>NFT Details</h1>
<p class="mono">{{ props.address }}</p>
<p class="mono">{{ search.result.address }}</p>
<p class="mono">{{ props.tokenId }}</p>
<p class="mono">{{ props.commitment }}</p>
<pre class="mono data">
  {{ JSON.stringify(collection?.bcmr?.token?.nfts?.parse.types[props.commitment], null, 4) }}
</pre>
</template>

<style scoped>
.mono {
  font-family: monospace;
}

.data {
  word-wrap: break-word;
  max-width: 60vw;
}
</style>