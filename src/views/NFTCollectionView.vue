<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import type { NFTCapability, UtxoI } from 'mainnet-js/dist/module/interface';
import type { NftType } from 'mainnet-js/dist/module/wallet/bcmr-v2.schema';
import { useToast } from 'vue-toast-notification';

import { useSearchStore, type NFTDetail } from '@/stores/search';
import { useSettingsStore } from '@/stores/settings';
import { useFavorites } from '@/stores/favorites';

import PageLoading from "@/components/PageLoading.vue";
import SearchError from "@/components/SearchError.vue";

const props = defineProps({
  address: { type: String, required: true },
  tokenId: { type: String, required: true },
})

interface NftDetail {
  id: string,
  commitment: string,
  nftType: NftType
}

interface OtherNftDetail {
  id: string,
  category: string | undefined,
  symbol: string | undefined,
  icon: string | undefined,
  commitment: string | undefined,
  capability: NFTCapability | undefined,
}

const settings = useSettingsStore()
const search = useSearchStore()
const favorites = useFavorites()

const nftBalance = ref(0)
const nftUtxos = ref([] as UtxoI[])
const nftList = ref([] as NftDetail[])
const otherNftList = ref([] as OtherNftDetail[])
const collectionBCMR = ref({} as NFTDetail | undefined)
const collectionName = ref("" as string | undefined)

onMounted(async () => {
  if (search.validatedQuery.query === props.address) {
    await loadNftCardData()
  } else {
    search.query = props.address
    search.type = "path"
    await search.search(props.tokenId).then(async () => {
      await loadNftCardData()
    })
  }
})

watch(
  [() => props.address, () => props.tokenId],
  async ([newAaddress, newTokenId]) => {
    search.query = newAaddress
    search.type = "path"
    nftList.value = []
    await search.search(newTokenId).then(async () => {
      await loadNftCardData()
    })
  }
)

async function loadNftCardData() {
  nftList.value = [] as NftDetail[]
  otherNftList.value = [] as OtherNftDetail[]

  collectionBCMR.value = search.getNftCollectionById(props.tokenId)
  // console.log("BCMR")
  // console.log(JSON.stringify(collectionBCMR.value, null, 4))
  collectionName.value = search.getNftCollectionNameById(props.tokenId)
  nftBalance.value = search.wallet ? await search.wallet.getNftTokenBalance(props.tokenId) : 0
  nftUtxos.value = search.wallet ? await search.wallet.getTokenUtxos(props.tokenId) : []

  // console.log("TOKEN UTXOs for: " +  props.tokenId)
  nftUtxos.value.forEach(utxo => {
  //  console.log(JSON.stringify(utxo, null, 4))
    if (utxo.token?.tokenId && utxo.token?.commitment) {
      let nftType = search.getNftTypeByCommitment(utxo.token.tokenId, utxo.token.commitment)
      if (nftType) {
        nftList.value.push({
          id: utxo.token.tokenId,
          commitment: utxo.token.commitment,
          nftType: nftType
        })
      } else {
        otherNftList.value.push({
          id: utxo.token.tokenId,
          category: collectionBCMR.value?.BCMR?.token?.category,
          symbol: collectionBCMR.value?.BCMR?.token?.symbol,
          icon: collectionBCMR.value?.BCMR?.uris?.icon,
          commitment: utxo.token.commitment,
          capability: utxo.token.capability
        })
      }
    }
  });
}

const collectionNameFormat = computed(() => {
  return collectionName.value ? collectionName.value : `${props.tokenId.slice(0, 4)}...${props.tokenId.slice(-4)}`
})

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
</script>

<template>
  <SearchError v-if="search.error !== null" :error="search.error" :type="'page'" />

  <div v-if="nftList.length === 0 && otherNftList.length === 0 && search.error === null">
    <PageLoading />
  </div>

  <div v-if="nftList.length !== 0" class="wrapper container">

    <div class="collection-header">
      <h3 class="collection-name">{{ collectionNameFormat }}</h3>
      <div class="collection-address">
        <div>On address: {{ search.wallet?.tokenaddr }}</div>
        <div>Child NFTs: {{ nftBalance }}</div>
      </div>
      <span class="share material-symbols-outlined" @click="share(search.wallet?.cashaddr, props.tokenId)">
        share
      </span>
      <span v-if="!favorites.isFav(`${search.wallet?.cashaddr}/${props.tokenId}`)"
        class="favorite material-symbols-outlined"
        @click="addFav(collectionNameFormat, search.wallet?.cashaddr, props.tokenId)">
        favorite
      </span>
      <span v-if="favorites.isFav(`${search.wallet?.cashaddr}/${props.tokenId}`)"
        class="favorite material-symbols-outlined red" @click="removeFav(search.wallet?.cashaddr, props.tokenId)">
        favorite
      </span>
    </div>

    <div class="nft-container">
      <div class="nft-card" v-for="nft in nftList" v-bind:key="nft.commitment">
        <img v-if="nft.nftType.uris?.icon" :src="formatImgUri(nft.nftType.uris.icon)" />
        <p>{{ nft.nftType.name }}</p>
        <p class="commitment">Commitment: {{ nft.commitment }}</p>
      </div>
    </div>

  </div>

  <div v-if="otherNftList.length !== 0" class="wrapper container">

    <div class="collection-header">
      <h3 class="collection-name">{{ collectionNameFormat }}</h3>
      <div class="collection-address">
        <div>On address: {{ search.wallet?.tokenaddr }}</div>
        <div>Child NFTs: {{ nftBalance }}</div>
      </div>
      <span class="share material-symbols-outlined" @click="share(search.wallet?.cashaddr, props.tokenId)">
        share
      </span>
      <span v-if="!favorites.isFav(`${search.wallet?.cashaddr}/${props.tokenId}`)"
        class="favorite material-symbols-outlined"
        @click="addFav(collectionNameFormat, search.wallet?.cashaddr, props.tokenId)">
        favorite
      </span>
      <span v-if="favorites.isFav(`${search.wallet?.cashaddr}/${props.tokenId}`)"
        class="favorite material-symbols-outlined red" @click="removeFav(search.wallet?.cashaddr, props.tokenId)">
        favorite
      </span>
    </div>

    <div class="nft-container">
      <div class="nft-card" v-for="nft in otherNftList" v-bind:key="nft.category">
        <img v-if="nft.icon" :src="formatImgUri(nft.icon)" />
        <p class="commitment">Capability: {{ nft.capability}}</p>
        <p class="commitment">Commitment: {{ nft.commitment}}</p>
        <p class="commitment">1 {{ nft.symbol }}</p>
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