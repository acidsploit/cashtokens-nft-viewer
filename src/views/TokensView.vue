<script lang="ts">
import { Wallet } from "mainnet-js";
import { defineComponent } from "vue";
export default defineComponent({
  name: "TokensView",

  data(_props) {
    return {
      wallet: null as Wallet | null,
      image: null as any
    };
  },

  async mounted() {
    this.wallet = await Wallet.newRandom();
    this.image = this.wallet.getDepositQr();
  },
});
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <img v-if="image" :src="image.src" :alt="image.alt" :title="image.title">

      <div v-if="wallet">{{ wallet.cashaddr }}</div>
    </div>
  </header>
</template>