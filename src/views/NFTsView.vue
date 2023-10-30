<script setup lang="ts">
import { onMounted } from "vue";
import {useToast} from 'vue-toast-notification';

import { useSearchStore } from "@/stores/search";
import { useSettingsStore } from "@/stores/settings";
import { useFavorites } from "@/stores/favorites"

import PageLoading from "@/components/PageLoading.vue";
import SearchError from "@/components/SearchError.vue";

const props = defineProps({
  address: { type: String, required: true },
})

const settings = useSettingsStore()
const search = useSearchStore()
const favorites = useFavorites()

onMounted(async () => {
  console.log("props: " + props.address)
  console.log("validated query: " + search.result.address)

  if (search.result.address !== props.address) {
    await search.search("path", props.address)
  }
})

function collectionName(name: string | undefined, id: string): string {
  return name ? name : `${id.slice(0, 4)}...${id.slice(-4)}`
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

  <div v-if="search.result.tokens.length === 0 && search.error === null">
    <PageLoading />
  </div>

  <div v-if="search.result.tokens.length !== 0" class="wrapper container">
    <div class="heading">
      <div class="col title">
        <h3>NFT</h3>
        <h3>Collections</h3>
      </div>
      <div class="address" v-if="search.result.wallet">
        On address: {{ search.result.wallet.tokenaddr }}
      </div>
    </div>

    <div class="collection-list container">
      <div class="nft-collection" v-for="token in search.result.tokens" :key="token.id">
        <div class="collection-name">
          <img v-if="token.bcmr?.uris?.icon" :src="formatImgUri(token.bcmr.uris.icon)" alt="icon">
          <h3>{{ collectionName(token.bcmr?.name, token.id) }} </h3>
          <span class="share material-symbols-outlined" @click="share(search.result.wallet?.cashaddr, token.id)"
          title="Copy shareable link">
            share
          </span>
          <span v-if="!favorites.isFav(`${search.result.wallet?.cashaddr}/${token.id}`)"
            class="favorite material-symbols-outlined"
            @click="addFav(collectionName(token.bcmr?.name, token.id), search.result.wallet?.cashaddr, token.id)"
            title="Add NFT collection to favorites">
            favorite
          </span>
          <span v-if="favorites.isFav(`${search.result.wallet?.cashaddr}/${token.id}`)"
            class="favorite material-symbols-outlined red" @click="removeFav(search.result.wallet?.cashaddr, token.id)"
            title="Remove NFT collection from favorites">
            favorite
          </span>
        </div>

        <p class="description">{{ token.bcmr?.description ? token.bcmr?.description : "" }}</p>

        <div class="bottom-row">
          <p class="amount">
            {{ token.amount / 10 ** (token.bcmr?.token?.decimals ? token.bcmr?.token?.decimals : 0) }}
            {{ token.bcmr?.token?.symbol ? token.bcmr?.token?.symbol : "units" }}
          </p>
          <RouterLink class="btn-view-collection" :to="`/collection/${search.result.wallet?.address}/${token.id}`">View
            Collection
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template> 

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  flex-direction: column;
  border-style: solid;
  border-radius: 8px;
  border-width: 1px;
  border-color: var(--color-darkGrey);
}

.heading {
  display: flex;
  flex-direction: row;
  align-self: flex-start;
  margin-bottom: 3rem;
}

.title {
  padding-top: 15px;
}

.title h3 {
  margin-left: 1.7rem;
  max-width: 7rem;
  text-align: left;
  font-size: 1.5em;
  font-weight: 800;
  line-height: 1.5rem;
  transform: rotate(-13deg);
}

.address {
  margin-top: 7rem;
  margin-left: 3rem;
  word-break: break-all;
}

.nft-collection {
  margin: 2rem;
  padding: 3rem;
  color: var(--color-lightGrey);
  background-color: var(--bg-secondary-color);
  border-radius: 12px;
}

.collection-name {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
}

.collection-name h3 {
  font-size: 3rem;
  font-weight: 800;
  margin: 1rem 0 1rem 2rem;
  flex-grow: 5;
}

.collection-name img {
  max-width: 7rem;
  border-radius: 50%;
  flex-grow: 1;
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

.bottom-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
}

p.amount {
  font-family: monospace;
  margin: 0;
  line-height: 1;
}

.btn-view-collection {
  padding: .5rem 1rem .5rem 1rem;
  border-style: solid;
  border-width: 1px;
  border-radius: 4px;
}

.material-symbols-outlined {
  font-variation-settings:
    'FILL' 0,
    'wght' 400,
    'GRAD' 0,
    'opsz' 24
}

.red {
  color: red;

}
</style>
