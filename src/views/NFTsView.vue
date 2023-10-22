<script setup lang="ts">
import { BCMR, BalanceResponse, Wallet } from "mainnet-js";
import { defineComponent, ref, onMounted, onUpdated, type Ref } from "vue";
import { store } from "../stores/store";
import QrImage from "@/components/QrImage.vue";
import type { IdentitySnapshot } from "mainnet-js/dist/module/wallet/bcmr-v2.schema";
import WalletNav from "@/components/WalletNav.vue";

interface NFTDetail {
  id: string;
  amount: number;
  BCMR: IdentitySnapshot | undefined;
}

const props = defineProps({
  address: { type: String, required: true },
})

const image = ref(null as any)
// const balance = ref<number | BalanceResponse>({})
const balance = ref(0 as number | undefined)
const nfts = ref({} as Object)
const nftDetails = ref([] as NFTDetail[])

onMounted(async () => {
  console.log("props: " + props.address)
  if (store.query === "") {
    store.query = props.address
  }
  try {
    store.wallet = await Wallet.fromCashaddr(props.address)
    image.value = store.wallet.getTokenDepositQr()
    let balanceResponse = await store.wallet.getBalance()
    if (typeof (balanceResponse) !== "number") {
      balance.value = balanceResponse.bch
    }

    nfts.value = await store.wallet.getAllNftTokenBalances()
    // console.log(nfts.value)

    for (const [key, value] of Object.entries(nfts.value)) {
      let detail: NFTDetail = {
        id: key,
        amount: value,
        BCMR: undefined
      }
      nftDetails.value.push(detail)
    }
    // console.log(`nftDetails: ${nftDetails.value}`)


  } catch (error) { alert(error) }
})

async function loadBCMRMetaData() {
  nftDetails.value.forEach(async detail => {
    try {
      const authChain = await BCMR.fetchAuthChainFromChaingraph({
        transactionHash: detail.id,
        chaingraphUrl: store.chaingraphUrl
      })
      let httpsUrl = authChain.pop()?.httpsUrl
      if (typeof httpsUrl !== "undefined") {
        await BCMR.addMetadataRegistryFromUri(httpsUrl)
      }
    } catch (error) {
      console.log("error fetching BCMR for: " + detail.id)
    }
    const info: IdentitySnapshot | undefined = BCMR.getTokenInfo(detail.id);
    detail.BCMR = info

    console.log(`nftinfo: ${JSON.stringify(info, null, 4)}`)
  })
}

</script>

<template>
  <div class="wrapper">
    <WalletNav />
    <QrImage v-if="image" :image="image" :default-size="'small'" :allow-zoom="true" />
    <div v-if="store.wallet">{{ store.wallet.tokenaddr }}</div>
    <fieldset>
      <legend>NFTs</legend>
      <div class="button-box">
        <a class="button outline primary" @click="loadBCMRMetaData">Load BCMR Metadata</a>
      </div>
      <!-- <div v-if="nfts" class="nft-container">NFT ID: {{ nfts }}</div> -->
      <!-- <ol role="list">
        <li class="monospace" v-for="nft in nftDetails">{{ nft.id }}: {{ nft.amount }}</li>
      </ol> -->
      <ol role="list">
        <li v-for="detail in nftDetails">
          <p class="token-id-name">{{ detail.BCMR?.name ? detail.BCMR?.name : detail.id }}</p>
          <p class="description">{{ detail.BCMR?.description ? detail.BCMR?.description : "" }}</p>
          <p class="amount">{{ detail.amount / 10 ** (detail.BCMR?.token?.decimals ? detail.BCMR?.token?.decimals : 0) }}
            {{
              detail.BCMR?.token?.symbol ? detail.BCMR?.token?.symbol : "units" }}</p>
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

a.btn {
  margin-right: 15px;
}

.nft-container {
  word-break: break-all;
}

/* ol {
  list-style: none;
} */

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
