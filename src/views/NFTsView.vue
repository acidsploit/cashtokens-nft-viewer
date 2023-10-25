<script setup lang="ts">
import { BCMR, BalanceResponse, Wallet } from "mainnet-js";
import { defineComponent, ref, onMounted, onUpdated, type Ref } from "vue";
import type { IdentitySnapshot } from "mainnet-js/dist/module/wallet/bcmr-v2.schema";
import WalletNav from "@/components/WalletNav.vue";
import { useSearchStore } from "@/stores/search";
import { storeToRefs } from 'pinia';
import { useSettingsStore } from "@/stores/settings";

const props = defineProps({
  address: { type: String, required: true },
})

const settings = useSettingsStore()

const searchStore = useSearchStore()
const {
  query,
  validatedQuery,
  wallet,
  nftDetails
} = storeToRefs(searchStore)

onMounted(async () => {
  console.log("props: " + props.address)
  console.log("validate query: " + validatedQuery.value.query)

  if (validatedQuery.value.query !== props.address){
      query.value = props.address
      await searchStore.search()
  }
})

async function loadBCMRMetaData() {
  await searchStore.loadNftBcmrMetadata(settings.chaingraphUrl)
}

</script>

<template>
  <div class="wrapper">
    <WalletNav />
    <div v-if="wallet">{{ wallet.tokenaddr }}</div>
    <fieldset>
      <legend>NFTs</legend>
      <div class="button-box">
        <a class="button outline primary" @click="loadBCMRMetaData">Load BCMR Metadata</a>
      </div>
      <ol role="list">
        <li class="nft-collection" v-for="detail in nftDetails" :key="detail.id">
          <p class="token-id-name"> {{ detail.BCMR?.name ? detail.BCMR?.name : detail.id }} </p>
          <p class="description">{{ detail.BCMR?.description ? detail.BCMR?.description : "" }}</p>
          <p class="amount">{{ detail.amount / 10 ** (detail.BCMR?.token?.decimals ? detail.BCMR?.token?.decimals : 0) }}
            {{
              detail.BCMR?.token?.symbol ? detail.BCMR?.token?.symbol : "units" }}</p>
            <RouterLink :to="`/collection/${wallet?.tokenaddr}/${detail.id}`">View Collection</RouterLink>
        </li>
      </ol>
    </fieldset>
  </div>
</template> 

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  flex-direction: column;
}

fieldset {
  margin: 15px;
}

.button-box {
  display: flex;
  flex-direction: row;
  justify-content: end;
}

li.nft-collection {
  cursor: pointer;
}

p {
  margin: 10px;
  line-height: 1.6;
  font-size: 1.5rem;
  color: rgb(70 70 70);
  /* word-wrap: break-word; */
}

p.token-id-name {
  word-break: break-all;
}

p.description {
  font-family: monospace;
  font-size: x-small;
  margin-top: 0;
}

p.amount {
  font-family: monospace;
}

ol {
  list-style: none;
  /* counter-reset: list; */
  padding: 0 1rem;
}

li {
  position: relative;
  counter-increment: list;
  max-width: auto;
  margin: 2rem auto;
  padding: 1rem 1rem 1rem;
  box-shadow: 0.1rem 0.1rem 1.5rem rgba(0, 0, 0, 0.3);
  border-radius: 0.25rem;
  overflow: hidden;
  background-color: whitesmoke;
  /* word-wrap: break-word; */
}

li:hover {
  background-color: white;
}

li::before {
  content: '';
  display: block;
  width: 90%;
  height: 1rem;
  position: absolute;
  top: 0;
  left: 0;
  background: linear-gradient(to right, var(--c1) var(--stop), var(--c2) var(--stop));
}
</style>
