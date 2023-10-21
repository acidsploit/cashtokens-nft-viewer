<script setup lang="ts">
import { BalanceResponse, Wallet } from "mainnet-js";
import { defineComponent, ref, onMounted, onUpdated, type Ref } from "vue";
import { store } from "../store";
import QrImage from "@/components/QrImage.vue";

const props = defineProps({
  address: { type: String, required: true },
})

const image = ref(null as any)
// const balance = ref<number | BalanceResponse>({})
const balance = ref(0 as number | undefined)
const nfts = ref()

onMounted(async () => {
  console.log("props: " + props.address)
  if(store.query === ""){
    store.query = props.address
  }
  try {
    store.wallet = await Wallet.fromCashaddr(props.address)
    image.value = store.wallet.getTokenDepositQr()
    let balanceResponse = await store.wallet.getBalance()
    if (typeof(balanceResponse) !== "number") {
      balance.value = balanceResponse.bch
    }
    
    nfts.value = await store.wallet.getAllNftTokenBalances()



    console.log(nfts.value)
  } catch (error) { alert(error) }
})

// onUpdated(async () => {
//   console.log("props: " + props.address)
//   try {
//     store.wallet = await Wallet.fromCashaddr(props.address);
//     // image = store.wallet.getDepositQr();
//     // wallet = store.wallet;
//     console.log(store.wallet.tokenaddr)
//   } catch (error) { alert(error) }
// })

</script>

<template>
  <div class="wrapper">
    <QrImage v-if="image" :image="image" :default-size="'small'" :allow-zoom="true" />

    <div v-if="store.wallet">{{ store.wallet.tokenaddr }}</div>
    <div v-if="nfts">NFT ID: {{ nfts }}</div>


  </div>
</template> 

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>

<!-- <script setup lang="ts">
import { store } from '../store'
// import { Wallet } from 'mainnet-js'
// const wallet = await  Wallet.newRandom()

</script>

<template>
  <h3>NFTs</h3>
  <p>query: {{ store.query }}</p>
</template> -->