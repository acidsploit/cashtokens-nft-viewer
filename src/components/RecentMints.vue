<script setup lang="ts">
// import { ElectrumClient, ElectrumTransport, type RequestResponse } from "electrum-cash";
import * as ElectrumCash from "electrum-cash"
import type { ElectrumRawTransaction } from "mainnet-js";
import { computed, onMounted, onUnmounted, ref } from "vue";
import type { IdentitySnapshot } from 'mainnet-js/dist/module/wallet/bcmr-v2.schema';
import { useSettings } from "@/stores/settings";
import { calcNftId } from "@/utils";
import CashAddress from "./CashAddress.vue";


export interface AddressHistory {
  height: number,
  tx_hash: string
}

export interface Mint {
  confirmations: number,
  hash: string,
  address: string,
  category: string,
  commitment: string,
  name: string | undefined,
  imgUri: string | undefined,
}

const monitoredProjects = ref([
  {
    ticker: "CASHNINJA",
    category: "77a95410a07c2392c340384aef323aea902ebfa698a35815c4ef100062c6d8ac",
    contract: "bitcoincash:pvl88yaeyajf6cn8fhaf3qasl238rzrnpmnmgzr05krpkt0ez52z5rgwl9x9u",
    icons: "https://api.ninjas.cash/icons/",
    iconExt: "",
    bcmrUri: "https://api.ninjas.cash/.well-known/bitcoin-cash-metadata-registry.json",
    bcmr: undefined as IdentitySnapshot | undefined
  },
  {
    ticker: "BITCAT",
    category: "07275f68d14780c737279898e730cec3a7b189a761caf43b4197b60a7c891a97",
    contract: "bitcoincash:ppwvjvxw68w8fr7988syadmr63dau5l7xsqjrs7p0p",
    icons: "https://bitcatsheroes.club/icons/",
    iconExt: ".png",
    bcmrUri: "https://bitcatsheroes.club/.well-known/bitcoin-cash-metadata-registry.json",
    bcmr: undefined as IdentitySnapshot | undefined
  }
])


const recentMints = ref([] as Mint[])
const settings = useSettings()
const electrum = ref(null as ElectrumCash.ElectrumClient | null)
const height = ref(0)

onMounted(async () => {
  electrum.value = new ElectrumCash.ElectrumClient('cashtokens-nft-viewer', '1.4.3', settings.electrumUri, ElectrumCash.ElectrumTransport.WSS.Port, ElectrumCash.ElectrumTransport.WSS.Scheme)
  await electrum.value.connect().then(() => {
    console.log(`Connected to electrum server at: ${electrum.value!.connection.host}`)
  })

  electrum.value.on('notification', handleNotifications);
  await electrum.value.subscribe('blockchain.headers.subscribe')

  monitoredProjects.value.forEach(async (project) => {
    await electrum.value!.request('blockchain.address.get_history', project.contract, 800000).then((response) => {
      let history = response as AddressHistory[]
      history = history.slice(-5).reverse()

      history.forEach(async (tx) => {
        await electrum.value!.request('blockchain.transaction.get', tx.tx_hash, true).then((response) => {
          const tx = response as ElectrumRawTransaction
          let imgUri: string | undefined

          if (project.ticker === "CASHNINJA") {
            imgUri = `${project.icons}${calcNftId(tx.vout[1].tokenData?.nft?.commitment!)}${project.iconExt}`
          }

          if (project.ticker === "BITCAT") {
            imgUri = `${project.icons}${tx.vout[1].tokenData?.nft?.commitment!}${project.iconExt}`
          }

          recentMints.value.push({
            confirmations: tx.confirmations,
            hash: tx.hash,
            address: tx.vout[1].scriptPubKey.addresses[0],
            category: tx.vout[1].tokenData?.category,
            commitment: tx.vout[1].tokenData?.nft?.commitment,
            name: `${project.ticker}-${calcNftId(tx.vout[1].tokenData?.nft?.commitment!)}`,
            imgUri: imgUri,
          } as Mint)
          console.log("pushed mint tx: " + tx.hash)
        })
      })
    })
  })
})

onUnmounted(async () => {
  await electrum.value?.disconnect().then((response) => {
    if (response === true) {
      console.log("Disconnected from electrum server")
    }
  })
})

const handleNotifications = ((data: any) => {
  if (data.method === 'blockchain.headers.subscribe') {
    console.log(JSON.stringify(data, null, 4))
    height.value = data.params[0].height
  }
})

const mints = computed(() => {
  let mints = recentMints.value
  console.log("SORT")

  mints.sort((a, b) => {
    // console.log(a.confirmations, b.confirmations)
    return a.confirmations - b.confirmations
  })

  return mints
})

function prefixImgUri(uri: string): string {
  if (uri.slice(0, 7) === "ipfs://") {
    let prefix = settings.ipfsGateway
    let path = uri.slice(7)
    uri = prefix + path
  }

  return uri
}
</script>

<template>
  <div class="mints-container">
    <h1 class="text-center">Recent Mints</h1>
    <p class="text-center mono">current chain height: {{ height }}</p>
    <div class="mint" v-for="mint in mints" v-bind:key="mint.hash">
      <img class="icon" v-if="mint.imgUri != undefined" :src="prefixImgUri(mint.imgUri)" />
      <div class="data">
        <div class="name">
          <h4>{{ mint.name }}</h4>
          <div>
            <div class="commitment text-right mono">commitment: {{ mint.commitment }}</div>
            <div class="confirmations text-right mono">confirmations: {{ mint.confirmations }}</div>
          </div>
        </div>
        <CashAddress :addr="mint.address" type="link" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.mints-container {
  display: flex;
  flex-direction: column;
}
.mint {
  display: flex;
  flex-direction: row;
  color: var(--color-lightGrey);
  background-color: var(--bg-secondary-color);
  border-radius: 12px;
  padding: 1rem;
  margin: 2rem;
  /* max-width: 80rem; */
}

.icon {
  width: 125px;
  border-radius: 90px;
  margin: 0 2rem 0 0;
  flex-grow: 0;
}
.data {
  flex-grow: 5;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.name {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  
}

@media only screen and (min-width: 1200px) {
  .mints-container {
    padding: 0 10vw 0 10vw;
  }

}
</style>