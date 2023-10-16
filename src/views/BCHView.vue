<script setup lang="ts">
import { BalanceResponse, Wallet } from "mainnet-js";
import { defineComponent, ref, onMounted, onUpdated, type Ref } from "vue";
import { store } from "../store";
import { QueryType, isTokenID, isValidCashAddress } from "@/utils";

const props = defineProps({
  address: { type: String, required: true },
})

const image = ref(null as any)
const balance = ref(0 as number | undefined)

async function handleSearchQuery(query: string) {
  let value = query
  let isValid = isValidCashAddress(value)
  if (isValid === true) {
    store.query = value
    store.validatedQuery.query = value
    store.validatedQuery.queryType = QueryType.cashaddress
    store.wallet = await Wallet.fromCashaddr(value)
  } else {
    store.wallet = null
  }

  if (isTokenID(value)) {
    store.query = value
    store.validatedQuery.query = value
    store.validatedQuery.queryType = QueryType.token
  }
}

onMounted(async () => {
  console.log("props: " + props.address)
  if(store.query === ""){
    store.query = props.address
  }
  handleSearchQuery(props.address)
  try {
    store.wallet = await Wallet.fromCashaddr(props.address)
    image.value = store.wallet.getDepositQr()
    let balanceResponse = await store.wallet.getBalance()
    if (typeof (balanceResponse) !== "number") {
      balance.value = balanceResponse.bch
    }
  } catch (error) { alert(error) }
})
</script>

<template>
  <div class="wrapper">
    <img v-if="image" :src="image.src" :alt="image.alt" :title="image.title">

    <div v-if="store.wallet">{{ store.wallet.cashaddr }}</div>
    <div v-if="store.wallet">BCH: {{ balance }}</div>


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

<!-- <script lang="ts">
import { Wallet } from "mainnet-js";
import { defineComponent } from "vue";
import { store } from "../store";

export default defineComponent({
  name: "TokensView",

  data(_props) {
    return {
      wallet: null as Wallet | null,
      image: null as any
    };
  },

  async mounted() {
    if (store.wallet === null) {
      store.wallet = await Wallet.newRandom();
      this.image = store.wallet.getDepositQr();

    } else{
      this.image = store.wallet.getDepositQr();
    }

    this.wallet = store.wallet;
    // this.image = this.wallet.getDepositQr();
  },
});
</script>

<template>
    <div class="wrapper">
      <img v-if="image" :src="image.src" :alt="image.alt" :title="image.title">

      <div v-if="wallet">{{ wallet.cashaddr }}</div>
      <div v-if="wallet">{{ wallet.tokenaddr }}</div>

    </div>
</template>  -->