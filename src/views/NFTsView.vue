<script setup lang="ts">
import { store } from '../store'
// import { Wallet } from 'mainnet-js'
// const wallet = await  Wallet.newRandom()

</script>

<template>
  <h3>NFTs</h3>
  <p>query: {{ store.query }}</p>
  <!-- <p>wallet address: {{ wallet.getDepositAddress() }}</p> -->
</template>