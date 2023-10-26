<script setup lang="ts">
// import { BCMR, BalanceResponse, Wallet } from "mainnet-js";
import { defineComponent, ref, onMounted, onUpdated, type Ref, computed } from "vue";
import type { IdentitySnapshot } from "mainnet-js/dist/module/wallet/bcmr-v2.schema";
import WalletNav from "@/components/WalletNav.vue";
import { useSearchStore } from "@/stores/search";
import { storeToRefs } from 'pinia';
import { useSettingsStore } from "@/stores/settings";
// import { useSettingsStore } from "@/stores/settings";
// import type { TokenMetadata } from "@/utils";

// export interface NFTDetail extends TokenMetadata {
//   amount: number;
// }

const props = defineProps({
  address: { type: String, required: true },
})

const settings = useSettingsStore()
const search = useSearchStore()
const {
  query,
  validatedQuery,
} = storeToRefs(search)


onMounted(async () => {
  console.log("props: " + props.address)
  console.log("validated query: " + validatedQuery.value.query)

  if (validatedQuery.value.query !== props.address) {
    query.value = props.address
    await search.search()
  } 
})


function collectionName(name: string | undefined, id: string): string {
  return name ? name : `${id.slice(0, 4)}...${id.slice(-4)}`
}

function formatImgUri(uri: string | undefined): string | undefined {
  if(uri && uri.slice(0,7) === "ipfs://"){
    let prefix = settings.ipfsGateway
    let path = uri.slice(7)

    return prefix + path
  } else if(uri) {
    return uri
  }

  return undefined
}

</script>

<template>
  <WalletNav />


  <div v-if="search.nftDetails.length !== 0" class="wrapper">
    <div class="heading">
      <div class="col title">
        <h3>NFT</h3>
        <h3>Collections</h3>
      </div>
      <div class="address" v-if="search.wallet">
        On address: {{ search.wallet.tokenaddr }}
      </div>
    </div>

    <div class="collection-list container">
      <div class="nft-collection" v-for="detail in search.nftDetails" :key="detail.id">
        <div class="collection-name">
          <img v-if="detail.BCMR?.uris?.icon" :src="formatImgUri(detail.BCMR.uris.icon)" alt="icon">
          <h3>{{ collectionName(detail.BCMR?.name, detail.id) }} </h3>
        </div>
          <p class="description">{{ detail.BCMR?.description ? detail.BCMR?.description : "" }}</p>
          <p class="amount">
            {{ detail.amount / 10 ** (detail.BCMR?.token?.decimals ? detail.BCMR?.token?.decimals : 0) }}
            {{ detail.BCMR?.token?.symbol ? detail.BCMR?.token?.symbol : "units" }}
          </p>
          <RouterLink :to="`/collection/${search.wallet?.address}/${detail.id}`">View Collection</RouterLink>
      </div>
    </div>
  </div>
</template> 

<style scoped>
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
  justify-content: flex-start;
  margin-bottom: 2rem;
}

.collection-name h3 {
  /* font-family: "Poppins"; */
  font-size: 3rem;
  font-weight: 800;
  margin: 1rem 0 1rem 2rem;
}

.collection-name img {
  max-width: 7rem;
  border-radius: 50%;
}

p.amount {
  font-family: monospace;
}

.wrapper {
  display: flex;
  align-items: center;
  flex-direction: column;
  border-style: solid;
  border-radius: 4px;
  border-width: 2px;
  border-color: var(--color-darkGrey);
}

.heading {
  display: flex;
  flex-direction: row;
  align-self: flex-start;
  margin-bottom: 3rem;
  /* justify-content: space-between; */
  /* margin: 25px; */
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
</style>
