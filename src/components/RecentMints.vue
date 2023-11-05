<script setup lang="ts">
import { ElectrumClient, ElectrumTransport } from "electrum-cash";
import type { ElectrumRawTransaction } from "mainnet-js";
import { computed, onMounted, onUnmounted, ref } from "vue";
import type { IdentitySnapshot } from 'mainnet-js/dist/module/wallet/bcmr-v2.schema';
import { useSettings } from "@/stores/settings";
import { calcNftId } from "@/utils";
import CashAddress from "./CashAddress.vue";
import { AtomSpinner } from 'epic-spinners'



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
  name: string,
  imgUri: string,
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
const loading = ref({} as { [key: string]: boolean })
const settings = useSettings()
const electrum = ref(null as ElectrumClient | null)
const height = ref(0)

function setImageLoaders() {
  recentMints.value.forEach((mint) => {
    loading.value[mint.hash + mint.commitment] = true
  })
}

onMounted(async () => {
  electrum.value = new ElectrumClient('cashtokens-nft-viewer', '1.4.3', settings.electrumUri, ElectrumTransport.WSS.Port, ElectrumTransport.WSS.Scheme)
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
            // confirmations: tx.confirmations,
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

  setImageLoaders()
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

    recentMints.value.forEach((mint) => {
      mint.confirmations = mint.confirmations + 1
    })
  }
})

const mints = computed(() => {
  let mints = recentMints.value
  console.log("SORT")

  mints.sort((a, b) => {
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
  <h1 class="text-center">Recent Featured Mints</h1>
  <p class="text-center mono">current chain height: {{ height }}</p>
  <div class="nft-container">
    <div class="nft-card" v-for="mint in mints" v-bind:key="mint.hash">
      <div class="img">
        <img v-show="!loading[mint.hash + mint.commitment]" :src="prefixImgUri(mint.imgUri)"
          @load="loading[mint.hash + mint.commitment] = false" />
        <div v-if="loading[mint.hash + mint.commitment]" class="spinner">
          <atom-spinner v-if="settings.isDark" :animation-duration="1000" :size="60" color="#00c3ff" />
          <atom-spinner v-if="!settings.isDark" :animation-duration="1000" :size="60" color="#0ac18e" />
        </div>
      </div>
      <p>{{ mint.name }}</p>
      <div v-if="mint.commitment" class="commitment mono">commitment: {{ mint.commitment }}</div>
      <div v-if="mint.confirmations" class="commitment mono">confirmations: {{ mint.confirmations }}</div>
    </div>
  </div>
</template>

<style scoped>
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
</style>