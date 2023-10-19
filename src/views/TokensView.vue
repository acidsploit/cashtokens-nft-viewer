<script setup lang="ts">
import { BCMR, BalanceResponse, Wallet } from "mainnet-js";
import { defineComponent, ref, onMounted, onUpdated, type Ref } from "vue";
import { store } from "../store";
import type { IdentitySnapshot } from "mainnet-js/dist/module/wallet/bcmr-v2.schema";

type TokenDetails = {
  id: string;
  amount: number;
  BCMR: IdentitySnapshot | undefined;
}

const props = defineProps({
  address: { type: String, required: true },
})

const image = ref(null as any)
const balance = ref(0 as number | undefined)
const tokens = ref({} as Object)
const tokenDetails = ref([] as TokenDetails[])

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

    tokens.value = await store.wallet.getAllTokenBalances()

    console.log(tokens.value)

    for (const [key, value] of Object.entries(tokens.value)) {
      // console.log(`${key}: ${value}`);
      try {
        const authChain = await BCMR.addMetadataRegistryAuthChain({
        transactionHash: key,
        followToHead: false
      })
      // console.log(authChain)
      } catch (error) {
        console.log(error)
      }
      
      const info: IdentitySnapshot | undefined = BCMR.getTokenInfo(key);
      // console.log(info)

      let detail: TokenDetails = {
        id: key,
        amount: value,
        BCMR: info
      }
      tokenDetails.value.push(detail)
    }
  } catch (error) { console.log(error) }
})

</script>

<template>
  <div class="wrapper">
    <img v-if="image" :src="image.src" :alt="image.alt" :title="image.title">
    <div v-if="store.wallet">{{ store.wallet.tokenaddr }}</div>
    <ol role="list">
      <li v-for="detail in tokenDetails">
        <p>{{ detail.BCMR?.name ? detail.BCMR?.name : detail.id  }}</p>
        <p class="description">{{ detail.BCMR?.description ? detail.BCMR?.description : "" }}</p>
        <p>{{ detail.amount / 10 ** (detail.BCMR?.token?.decimals ? detail.BCMR?.token?.decimals : 0) }} {{ detail.BCMR?.token?.symbol ? detail.BCMR?.token?.symbol : "" }}</p>
      </li>
    </ol>
  </div>
</template> 

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

p {
  margin: 10px;
  line-height: 1.6;
  font-size: 1.5rem;
  color: rgb(70 70 70);
  /* word-wrap: break-word; */
}

.description {
  font-family: monospace;
  font-size: x-small;
  margin-top: 0;
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

@media only screen and (min-width: 768px) {}
</style>