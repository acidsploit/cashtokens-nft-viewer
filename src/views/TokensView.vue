<script setup lang="ts">
import { BalanceResponse, Wallet } from "mainnet-js";
import { defineComponent, ref, onMounted, onUpdated, type Ref } from "vue";
import { store } from "../store";

const props = defineProps({
  address: { type: String, required: true },
})

const image = ref(null as any)
// const balance = ref<number | BalanceResponse>({})
const balance = ref(0 as number | undefined)
const nfts = ref()

onMounted(async () => {
  console.log("props: " + props.address)
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
    <img v-if="image" :src="image.src" :alt="image.alt" :title="image.title">

    <div v-if="store.wallet">{{ store.wallet.tokenaddr }}</div>
    <div v-if="nfts">{{ nfts }}</div>


  </div>
</template> 