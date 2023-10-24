<script setup lang="ts">
import { useSearchStore } from '@/stores/search';
import type { TokenDetail } from '@/utils';
import type { UtxoI } from 'mainnet-js/dist/module/interface';
import type { IdentitySnapshot, NftType } from 'mainnet-js/dist/module/wallet/bcmr-v2.schema';
import { computed, onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useSettingsStore } from '@/stores/settings';
import { BCMR } from 'mainnet-js';


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

const nftBalance = ref(0)
const nftUtxos = ref([] as UtxoI[])
const nftList = ref([] as NftDetail[])
const tokenInfo = ref({} as IdentitySnapshot | undefined)

function getNftDetailByCommitment(tokenId: string, commitment: string): NftType | undefined {
  if (tokenInfo.value?.token?.nfts?.parse) {
    for (const [comm, nftType] of Object.entries(tokenInfo.value.token.nfts.parse.types)) {
      if (comm === commitment) {
        return nftType
      }
    }
  }

  return undefined
}

onMounted(async () => {
  // if (search.wallet?.tokenaddr !== props.address) {
  search.query = props.address
  await search.search()
  await BCMR.fetchAuthChainFromChaingraph({
    transactionHash: props.tokenId,
    chaingraphUrl: settings.chaingraphUrl,
    network: 'mainnet'
  })
    .then(async (authChain) => {
      const httpsUrl = authChain.pop()?.httpsUrl
      if (typeof httpsUrl !== "undefined") {
        await BCMR.addMetadataRegistryFromUri(httpsUrl)
          .then(() => {
            tokenInfo.value = BCMR.getTokenInfo(props.tokenId);
          })
      }
    })
  // }

  nftBalance.value = search.wallet ? await search.wallet.getNftTokenBalance(props.tokenId) : 0
  nftUtxos.value = search.wallet ? await search.wallet.getTokenUtxos(props.tokenId) : []
  // console.log("nftUtxos: " + nftUtxos.value)

  nftUtxos.value.forEach(nft => {
    if (nft.token?.tokenId && nft.token?.commitment) {
      // console.log("FILTERED NFTS")
      let nftType = getNftDetailByCommitment(nft.token.tokenId, nft.token.commitment)
      if (nftType) {
        // console.log(nftType)
        nftList.value.push({
          id: nft.token.tokenId,
          commitment: nft.token.commitment,
          nftType: nftType
        })
      }
    }
  });
})

const collectionName = computed(() => {
  console.log(props.tokenId)
  console.log(`${props.tokenId.slice(0, 4)}...${props.tokenId.slice(-4)}`)
  return tokenInfo.value ? tokenInfo.value.name : `${props.tokenId.slice(0, 4)}...${props.tokenId.slice(-4)}`
})
</script>

<template>
  <div class="container">
    <div class="collection-title">
      <!-- <h3 class="collection-name">{{ tokenInfo ? tokenInfo.name :
        `${props.tokenId.slice(0, 4)}...${props.tokenId.slice(-4)}` }}</h3> -->
        <h3 class="collection-name">{{ collectionName }}</h3>
      <div class="collection-address">
        <div>On address: {{ props.address }}</div>
        <div>Child NFTs: {{ nftBalance }}</div>
      </div>
    </div>


    <div class="nft-container">
      <div class="nft-card" v-for="nft in nftList" v-bind:key="nft.commitment">
        <img :src="nft.nftType.uris?.icon" />
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
  /* justify-content: space-between; */
  margin: 25px;
}

.collection-address {
  margin-top: 15px;
  word-break: break-all;
}

.container h3 {
  /* margin-left: 25px;
  margin-top: 25px; */
  max-width: fit-content;
  word-wrap: break-word;
  text-align: left;
  font-size: 1.3em;
  font-weight: 800;
  line-height: 30px;
  transform: rotate(-13deg);
}

.container {
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
  /* position: relative; */
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
</style>