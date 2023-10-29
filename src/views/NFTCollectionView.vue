<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { useToast } from 'vue-toast-notification';

import type { Token } from '../utils'

import { useSettingsStore } from '@/stores/settings';
import { useFavorites } from '@/stores/favorites';

import PageLoading from "@/components/PageLoading.vue";
import SearchError from "@/components/SearchError.vue";
import { useSearchStore } from '@/stores/search';

const props = defineProps({
  address: { type: String, required: true },
  tokenId: { type: String, required: true },
})

const settings = useSettingsStore()
const search = useSearchStore()
const favorites = useFavorites()

const collection = ref(undefined as Token | undefined)

onMounted(async () => {
  if (search.result.address !== props.address) {
    await search.search("path", props.address, props.tokenId).then(() => {
      collection.value = search.result.tokens.find((token) => { return token.id === props.tokenId })
    })
  } else {
    collection.value = search.result.tokens.find((token) => { return token.id === props.tokenId })
  }
})

watch(
  [() => props.address, () => props.tokenId],
  async ([newAaddress, newTokenId]) => {
    collection.value = undefined
    await search.search("path", newAaddress, newTokenId).then(() => {
      collection.value = search.result.tokens.find((token) => { return token.id === props.tokenId })
    })
  }
)

function addFav(title: string, addr: string | undefined, id: string) {
  let favId = `${addr}/${id}`
  favorites.add(favId, title)
}

function removeFav(addr: string | undefined, id: string) {
  let favId = `${addr}/${id}`
  favorites.remove(favId)
}

async function share(address: string | undefined, tokenId: string) {
  const origin = window.location.origin
  const $toast = useToast();

  await navigator.clipboard.writeText(`${origin}/collection/${address}/${tokenId}`).then(() => {
    let instance = $toast.open({
      message: "Link copied to clipboard",
      type: "success",
      position: "top-right",
      duration: 5000
    })
  })
}

const collectionNameFormat = computed(() => {
  return collection.value?.bcmr?.name ? collection.value?.bcmr?.name : `${props.tokenId.slice(0, 4)}...${props.tokenId.slice(-4)}`
})

function nftCardName(commitment: string | undefined): string {
  if (commitment)
    return collection.value?.bcmr?.token?.nfts?.parse?.types[commitment]?.name ? collection.value.bcmr.token.nfts.parse.types[commitment].name : commitment
  else
    return ""
}

function formatImgUri(uri: string | undefined): string | undefined {
  if (uri && uri.slice(0, 7) === "ipfs://") {
    let prefix = settings.ipfsGateway
    let path = uri.slice(7)

    return prefix + path
  } else if (uri) {
    return uri
  }

  return undefined
}
</script>

<template>
  <SearchError v-if="search.error !== null" :error="search.error" :type="'page'" />

  <div v-if="collection === undefined">
    <PageLoading />
  </div>

  <div v-if="collection !== undefined" class="wrapper container">

    <div class="collection-header">
      <h3 class="collection-name">{{ collectionNameFormat }}</h3>
      <div class="collection-address">
        <div>On address: {{ search.result.wallet?.tokenaddr }}</div>
        <div>Child NFTs: {{ collection?.amount }}</div>
      </div>
      <span class="share material-symbols-outlined" @click="share(search.result.wallet?.cashaddr, props.tokenId)">
        share
      </span>
      <span v-if="!favorites.isFav(`${search.result.wallet?.cashaddr}/${props.tokenId}`)"
        class="favorite material-symbols-outlined"
        @click="addFav(collectionNameFormat, search.result.wallet?.cashaddr, props.tokenId)">
        favorite
      </span>
      <span v-if="favorites.isFav(`${search.result.wallet?.cashaddr}/${props.tokenId}`)"
        class="favorite material-symbols-outlined red" @click="removeFav(search.result.wallet?.cashaddr, props.tokenId)">
        favorite
      </span>
    </div>

    <div class="nft-container">
      <div class="nft-card" v-for="utxo in collection?.utxos" v-bind:key="utxo.token?.commitment">
        <img v-if="collection?.bcmr && utxo.token?.commitment" :src="formatImgUri(collection.bcmr.token?.nfts?.parse?.types[utxo.token.commitment].uris?.icon ?
          collection.bcmr.token?.nfts?.parse?.types[utxo.token.commitment].uris?.icon
          :
          collection.bcmr.uris?.icon
        )" />
        <p>{{ nftCardName(utxo.token?.commitment) }}</p>
        <p class="commitment">Commitment: {{ utxo.token?.commitment }}</p>
      </div>
    </div>

  </div>
</template>

<style scoped>
.wrapper {
  border-style: solid;
  border-radius: 4px;
  border-width: 2px;
  border-color: var(--color-darkGrey);
  height: 100%;
}

h3.collection-name {
  max-width: 30rem;
  word-wrap: break-word;
  text-align: left;
  font-size: 1.3em;
  font-weight: 800;
  line-height: 30px;
  transform: rotate(-13deg);
}

.collection-header {
  display: flex;
  flex-direction: row;
  margin: 25px;
}

.collection-address {
  margin-top: 15px;
  word-break: break-all;
  flex-grow: 5;
}

.collection-name {
  flex-grow: 0;
}

.favorite:hover {
  cursor: pointer;
}

.favorite {
  text-align: right;
  align-self: flex-start;
  flex-grow: 1;
  max-width: fit-content;
  font-size: 4rem;
}

.share:hover {
  cursor: pointer;
}

.share {
  text-align: right;
  align-self: flex-start;
  flex-grow: 1;
  max-width: fit-content;
  font-size: 4rem;
  margin: 0 1rem 0 0;
}

.nft-container {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.nft-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 250px;
  color: var(--color-lightGrey);
  background-color: var(--bg-secondary-color);
  margin: 15px;
  padding: 10px;
  border-radius: 12px;

}

.nft-card img {
  width: 230px;
  margin-bottom: 15px;
  border-radius: 8px;
}

.commitment {
  font-size: 12;
  font-family: monospace;
  align-self: baseline;
}

.red {
  color: red;
}
</style>