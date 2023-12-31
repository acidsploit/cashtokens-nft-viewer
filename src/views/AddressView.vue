<script setup lang="ts">
import { onMounted, watch } from "vue";
import { useToast } from 'vue-toast-notification';

import { useSearch } from "@/stores/search";
import { useSettings } from "@/stores/settings";
import { useFavorites } from "@/stores/favorites"

import PageLoading from "@/components/PageLoading.vue";
import SearchError from "@/components/SearchError.vue";
import CashAddress from "@/components/CashAddress.vue";

const props = defineProps({
  address: { type: String, required: true },
})

const settings = useSettings()
const search = useSearch()
const favorites = useFavorites()

onMounted(async () => {
  console.log("props: " + props.address)
  console.log("validated query: " + search.result.address)

  if (search.result.address !== props.address || !search.result.fullAddressLookup) {
    await search.search("props", props.address)
  }
})

watch(
  [() => props.address],
  async ([newAaddress]) => {
    if (search.result.address !== newAaddress || !search.result.fullAddressLookup) {
      await search.search("props", newAaddress)
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
      <div class="title">
        <h3>{{ search.result.tokens.length }} NFT</h3>
        <h3>Collections</h3>
      </div>
      <div class="address" v-if="search.result.wallet?.tokenaddr">
        <CashAddress :addr="search.result.wallet.tokenaddr" />
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
          <p class="amount mono">
            {{ token.amount / 10 ** (token.bcmr?.token?.decimals ? token.bcmr?.token?.decimals : 0) }}
            {{ token.bcmr?.token?.symbol ? token.bcmr?.token?.symbol : "units" }}
          </p>
          <RouterLink class="button outline primary mono" :to="`/collection/${search.result.wallet?.address}/${token.id}`">view
            collection
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
  flex-wrap: wrap;
  align-self: flex-start;
  margin-bottom: 3rem;
}

.title {
  padding-top: 15px;
}

.title h3 {
  margin-left: .5rem;
  max-width: fit-content;
  text-align: left;
  font-size: 1.5em;
  font-weight: 800;
  line-height: 1rem;
  transform: rotate(-13deg);
}

.address {
  /* margin-top: 7rem; */
  margin-left: 3rem;
  /* word-break: break-all; */
  overflow: hidden;
  align-self: flex-end;
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
  margin: 0;
  line-height: 1;
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
