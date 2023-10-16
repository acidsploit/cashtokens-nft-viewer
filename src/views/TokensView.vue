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
const tokens = ref()

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
    
    tokens.value = await store.wallet.getAllTokenBalances()



    console.log(tokens.value)
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
    <!-- <div v-if="tokens">TOKEN ID: {{ tokens }}</div> -->
    <ol role="list">
      <li v-for="(value, key) in tokens">
        <h3>{{ key }}</h3>
        <p>amount: {{ value }}</p>
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

@import url("https://fonts.googleapis.com/css?family=Montserrat:400,700");

/* * {
	box-sizing: border-box;
} */

/* body {
	--h: 212deg;
	--l: 43%;
	--brandColor: hsl(var(--h), 71%, var(--l));
	font-family: Montserrat, sans-serif;
	margin: 0;
	background-color: whitesmoke;
} */

p {
	margin: 0;
	line-height: 1.6;
}

ol {
	list-style: none;
	/* counter-reset: list; */
	padding: 0 1rem;
}

li {
	/* --stop: calc(100% / var(--length) * var(--i));
	--l: 62%;
	--l2: 88%;
	--h: calc((var(--i) - 1) * (180 / var(--length)));
	--c1: hsl(var(--h), 71%, var(--l));
	--c2: hsl(var(--h), 71%, var(--l2)); */
	
	position: relative;
	counter-increment: list;
	max-width: 55rem;
	margin: 2rem auto;
	padding: 1rem 1rem 1rem;
	box-shadow: 0.1rem 0.1rem 1.5rem rgba(0, 0, 0, 0.3);
	border-radius: 0.25rem;
	overflow: hidden;
	background-color: whitesmoke;
}

li::before {
	content: '';
	display: block;
	width: 100%;
	height: 1rem;
	position: absolute;
	top: 0;
	left: 0;
	background: linear-gradient(to right, var(--c1) var(--stop), var(--c2) var(--stop));
}

h3 {
	display: flex;
	align-items: baseline;
  font-size: 1.5rem;
	/* margin: 0 0 1rem; */
	color: rgb(70 70 70);
}

/* h3::before {
	display: flex;
	justify-content: center;
	align-items: center;
	flex: 0 0 auto;
	margin-right: 1rem;
	width: 3rem;
	height: 3rem;
	content: counter(list);
	padding: 1rem;
	border-radius: 50%;
	background-color: var(--c1);
	color: white;
} */

/* @media (min-width: 40em) {
	li {
		margin: 3rem auto;
		padding: 3rem 2rem 2rem;
	}
	
	h3 {
		font-size: 2.25rem;
		margin: 0 0 2rem;
	}
	
	h3::before {
		margin-right: 1.5rem;
	}
} */
</style>