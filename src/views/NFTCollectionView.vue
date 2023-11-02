<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { useToast } from 'vue-toast-notification';
import { useDark } from '@vueuse/core';
import { AtomSpinner } from 'epic-spinners'

import type { Token } from '../utils'

import { useSettingsStore } from '@/stores/settings';
import { useFavorites } from '@/stores/favorites';

import PageLoading from "@/components/PageLoading.vue";
import SearchError from "@/components/SearchError.vue";
import CashAddress from '@/components/CashAddress.vue';
import { useSearchStore } from '@/stores/search';
import type { UtxoI } from 'mainnet-js';
import router from '@/router';

const props = defineProps({
  address: { type: String, required: true },
  tokenId: { type: String, required: true },
})

const isDark = useDark()
const settings = useSettingsStore()
const search = useSearchStore()
const favorites = useFavorites()
const collection = ref(undefined as Token | undefined)
const loading = ref({} as { [key: string]: boolean })
const description = ref(false)
const links = ref(false)

function setImageLoaders() {
  collection.value?.utxos.forEach((utxo) => {
    loading.value[utxo.txid + utxo.vout] = true
  })
}

onMounted(async () => {
  if (search.result.address !== props.address) {
    await search.search("props", props.address, props.tokenId).then(() => {
      collection.value = search.result.tokens.find((token) => { return token.id === props.tokenId })
      setImageLoaders()
    })
  } else {
    collection.value = search.result.tokens.find((token) => { return token.id === props.tokenId })
    setImageLoaders()
  }
})

watch(
  [() => props.address, () => props.tokenId],
  async ([newAaddress, newTokenId]) => {
    collection.value = undefined
    await search.search("props", newAaddress, newTokenId).then(() => {
      collection.value = search.result.tokens.find((token) => { return token.id === newTokenId })
      setImageLoaders()
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

function prefixImgUri(uri: string): string {
  if (uri.slice(0, 7) === "ipfs://") {
    let prefix = settings.ipfsGateway
    let path = uri.slice(7)
    uri = prefix + path
  }

  return uri
}

function formatImgUri(utxo: UtxoI): string {
  if (utxo.token?.commitment !== undefined && collection.value?.bcmr?.token?.nfts?.parse.types[utxo.token.commitment] !== undefined) {
    let uri = collection.value?.bcmr?.token?.nfts?.parse.types[utxo.token.commitment].uris?.icon
    if (uri !== undefined) {
      return prefixImgUri(uri)
    }
  }

  if (collection.value?.bcmr?.uris !== undefined) {
    let uri = collection.value?.bcmr?.uris?.icon
    if (uri !== undefined) {
      return prefixImgUri(uri)
    }
  }

  return ""
}

function handleNFTClick(utxo: UtxoI) {
  if (utxo.token?.commitment != undefined && utxo.token.capability !== "minting") {
    router.push(`/nft/${props.address}/${props.tokenId}/${utxo.token?.commitment}`)
  }
}

function toggleDescription() {
  description.value = !description.value
}

function toggleLinks() {
  links.value = !links.value
}
</script>

<template>
  <SearchError v-if="search.error !== null" :error="search.error" :type="'page'" />

  <div v-if="collection === undefined">
    <PageLoading />
  </div>

  <div v-if="collection !== undefined" class="wrapper container">

    <div class="header">
      <h3 class="name">{{ collectionNameFormat }}</h3>
      <div class="actions">
        <span class="share material-symbols-outlined" @click="share(search.result.wallet?.cashaddr, props.tokenId)"
          title="Copy shareable link">
          share
        </span>
        <span v-if="!favorites.isFav(`${search.result.wallet?.cashaddr}/${props.tokenId}`)"
          class="favorite material-symbols-outlined"
          @click="addFav(collectionNameFormat, search.result.wallet?.cashaddr, props.tokenId)"
          title="Add NFT collection to favorites">
          favorite
        </span>
        <span v-if="favorites.isFav(`${search.result.wallet?.cashaddr}/${props.tokenId}`)"
          class="favorite material-symbols-outlined red" @click="removeFav(search.result.wallet?.cashaddr, props.tokenId)"
          title="Remove NFT collection from favorites">
          favorite
        </span>
      </div>
    </div>

    <div class="metadata ">
      <div class="address">
        <!-- <div class="mono break">{{ search.result.wallet?.tokenaddr }}</div> -->
        <CashAddress class="ca" :addr="search.result.wallet?.tokenaddr!" />
        <div class="mono">{{ collection?.amount }} {{ collection.bcmr?.token?.symbol ? `${collection.bcmr?.token?.symbol}
          NFTs` : "NFTs" }}</div>
      </div>
      <div class="dropdown is-vertical-align">
        <span @click="toggleDescription" class="material-symbols-outlined small pointer">
          {{ description ? 'expand_more' : 'chevron_right' }}
        </span>
        <span @click="toggleDescription" class="bold pointer">Description</span>
      </div>
      <div v-show="description">{{ collection.bcmr?.description }}</div>
      <div class="dropdown is-vertical-align">
        <span @click="toggleLinks" class="material-symbols-outlined small pointer">
          {{ links ? 'expand_more' : 'chevron_right' }}
        </span>
        <span @click="toggleLinks" class="bold pointer">Links</span>
      </div>
      <div v-show="links" v-if="collection.bcmr?.uris">
        <a v-for="[key, value] of Object.entries(collection.bcmr.uris)" 
          v-show="!['icon', 'image'].includes(key)" 
          v-bind:key="key" 
          class="button outline primary mono"
          :href="value" target="_blank">{{ key }}</a>
      </div>

      <!-- <div v-show="links">
        <div v-if="collection.bcmr?.uris">
          <div class="mono" v-for="[key, value] of Object.entries(collection.bcmr.uris)" v-bind:key="key"
            v-show="!['icon', 'image'].includes(key)">
            <a :href="value" target="_blank">{{ key }}</a>
          </div>
        </div>
      </div> -->
    </div>

    <div class="nft-container">
      <div class="nft-card" v-for="utxo in collection?.utxos" v-bind:key="utxo.txid + utxo.vout"
        @click="handleNFTClick(utxo)">
        <div class="img">
          <img v-show="!loading[utxo.txid + utxo.vout]" :src="formatImgUri(utxo)"
            @load="loading[utxo.txid + utxo.vout] = false" />
          <div v-if="loading[utxo.txid + utxo.vout]" class="spinner">
            <atom-spinner v-if="isDark" :animation-duration="1000" :size="60" color="#00c3ff" />
            <atom-spinner v-if="!isDark" :animation-duration="1000" :size="60" color="#0ac18e" />
          </div>
        </div>
        <p>{{ nftCardName(utxo.token?.commitment) }}</p>
        <p v-if="utxo.token?.capability !== 'none'" class="commitment mono">Capability: {{ utxo.token?.capability }}</p>
        <p v-if="utxo.token?.commitment" class="commitment mono">Commitment: {{ utxo.token?.commitment }}</p>
      </div>
    </div>

  </div>
  <!-- <pre class="mono data">{{ JSON.stringify(collection, null, 4) }}</pre> -->
</template>

<style scoped>
.button {
  margin: 1rem 1rem 1rem 1rem;
}
.metadata {
  padding: 0 4rem 2rem 4rem;
}

.ca {
  margin: 0 4rem 0 0;
}

.dropdown {
  margin: 1rem 0 0 0;
}

.small {
  font-variation-settings:
    'FILL' 0,
    'wght' 100,
    'GRAD' -25,
    'opsz' 20
}

.wrapper {
  border-style: solid;
  border-radius: 8px;
  border-width: 1px;
  border-color: var(--color-darkGrey);
  height: 100%;
}

h3.name {
  max-width: 30rem;
  word-wrap: break-word;
  text-align: left;
  font-size: 2.5rem;
  font-weight: 800;
  line-height: 30px;
  transform: rotate(-13deg);
}

.header {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap-reverse;
  justify-content: space-between;
  margin: 2rem 2rem 1rem 1rem;
}

.favorite:hover {
  cursor: pointer;
}

.favorite {
  text-align: right;
  max-width: fit-content;
  font-size: 4rem;
}

.share:hover {
  cursor: pointer;
}

.share {
  text-align: right;
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

.nft-card:hover {
  cursor: pointer;
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

.img {
  width: 230px;
  height: 230px;
  margin-bottom: 15px;
}

.spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 230px;
  height: 230px;
  margin-bottom: 15px;
  align-self: center;
}

.commitment {
  font-size: 12;
  align-self: baseline;
}

.red {
  color: red;
}

.data {
  word-wrap: break-word;
  white-space: pre-wrap;
  max-width: 100vw;
}

@media only screen and (min-width: 900px) {

  .metadata {
    max-width: 70rem;
  }

}
</style>