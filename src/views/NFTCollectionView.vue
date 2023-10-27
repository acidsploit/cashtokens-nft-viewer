<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import type { UtxoI } from 'mainnet-js/dist/module/interface';
import type { NftType } from 'mainnet-js/dist/module/wallet/bcmr-v2.schema';
import { useSearchStore } from '@/stores/search';
import PageLoading from "@/components/PageLoading.vue";
import { useSettingsStore } from '@/stores/settings';
import { useFavorites } from '@/stores/favorites';

const props = defineProps({
  address: { type: String, required: true },
  tokenId: { type: String, required: true },
})

interface NftDetail {
  id: string,
  commitment: string,
  nftType: NftType
}

const settings = useSettingsStore()
const search = useSearchStore()
const favorites = useFavorites()

const nftBalance = ref(0)
const nftUtxos = ref([] as UtxoI[])
const nftList = ref([] as NftDetail[])
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
    await search.search(newTokenId).then(async () => {
      await loadNftCardData()
    })
  }
)

async function loadNftCardData() {
  nftList.value = [] as NftDetail[]
  collectionName.value = search.getNftCollectionNameById(props.tokenId)
  nftBalance.value = search.wallet ? await search.wallet.getNftTokenBalance(props.tokenId) : 0
  nftUtxos.value = search.wallet ? await search.wallet.getTokenUtxos(props.tokenId) : []

  nftUtxos.value.forEach(nft => {
    if (nft.token?.tokenId && nft.token?.commitment) {
      let nftType = search.getNftDetailByCommitment(nft.token.tokenId, nft.token.commitment)
      if (nftType) {
        nftList.value.push({
          id: nft.token.tokenId,
          commitment: nft.token.commitment,
          nftType: nftType
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
</script>

<template>
  <div v-if="nftList.length === 0">
    <PageLoading />
  </div>

  <div v-if="nftList.length !== 0" class="wrapper container">
    <div class="collection-title">
      <h3 class="collection-name">{{ collectionNameFormat }}</h3>
      <div class="collection-address">
        <div>On address: {{ search.wallet?.tokenaddr }}</div>
        <div>Child NFTs: {{ nftBalance }}</div>
      </div>
      <span v-if="!favorites.isFav(`${search.wallet?.cashaddr}/${props.tokenId}`)"
        class="favorite material-symbols-outlined"
        @click="addFav(collectionNameFormat, search.wallet?.cashaddr, props.tokenId)">
        favorite
      </span>
      <span v-if="favorites.isFav(`${search.wallet?.cashaddr}/${props.tokenId}`)"
        class="favorite material-symbols-outlined red"
        @click="removeFav(search.wallet?.cashaddr, props.tokenId)">
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
</template>

<style scoped>
.collection-title {
  display: flex;
  flex-direction: row;
  margin: 25px;
}

.collection-address {
  margin-top: 15px;
  word-break: break-all;
  flex-grow: 5;
}

.favorite {
  text-align: right;
  align-self: flex-start;
  flex-grow: 1;
  max-width: fit-content;
  cursor: pointer;
  font-size: 4rem;
}

.collection-name {
  flex-grow: 1;
}

.container h3 {
  max-width: fit-content;
  word-wrap: break-word;
  text-align: left;
  font-size: 1.3em;
  font-weight: 800;
  line-height: 30px;
  transform: rotate(-13deg);
}

.wrapper {
  border-style: solid;
  border-radius: 4px;
  border-width: 2px;
  border-color: var(--color-darkGrey);
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