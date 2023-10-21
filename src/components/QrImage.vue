<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { ImageI } from 'mainnet-js/dist/module/qr/interface'

type Size = "small" | "big"

const props = defineProps<{
  image: ImageI
  defaultSize: Size
  allowZoom: boolean
}>()

const zoom = ref(false)

onMounted(() => {
  if (props.defaultSize === "big") {
    zoom.value = true
  }
})

function toggleZoom() {
  if (props.allowZoom) {
    zoom.value = !zoom.value
  }

}

</script>

<template>
  <img class="qr-img" :class="zoom ? 'big' : 'small'" @click="toggleZoom" :src="props.image.src" :alt="props.image.alt"
    :title="props.image.title">
</template>

<style scoped>
img.qr-img {
  margin-top: 15px;
}
img.qr-img:hover {
  cursor: pointer;
}

img.small {
  max-width: 50px;
  max-height: auto;
}

img.big {
  max-width: 250px;
  max-height: auto;
}
</style>