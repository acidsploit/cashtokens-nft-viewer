<script setup lang="ts">
import { onMounted } from "vue";
import QrImage from "@/components/QrImage.vue";
import WalletNav from "@/components/WalletNav.vue";
import { useSearchStore } from "@/stores/search";

const props = defineProps({
  address: { type: String, required: true },
})


const search = useSearchStore()

onMounted(async () => {
  if (search.validatedQuery.query !== props.address) {
    search.query = props.address
    await search.search()
  }
})


</script>

<template>
  <div class="wrapper">
    <WalletNav />
    <QrImage v-if="search.wallet" :image="search.wallet.getDepositQr()" :default-size="'big'" :allow-zoom="false" />

    <div v-if="search.wallet">{{ search.wallet.cashaddr }}</div>
    <div v-if="search.wallet">{{ search.wallet.tokenaddr }}</div>


  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  flex-direction: column;
}
</style>
