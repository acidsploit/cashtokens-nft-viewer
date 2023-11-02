<script setup lang="ts">
import { computed } from 'vue'
import { useToast } from 'vue-toast-notification';

const props = defineProps({
  addr: { type: String, required: true },
})

const address = computed(() => {
  return props.addr
})

async function copy() {
  const $toast = useToast();

  await navigator.clipboard.writeText(props.addr).then(() => {
    let instance = $toast.open({
      message: "Address copied to clipboard",
      type: "success",
      position: "top-right",
      duration: 5000
    })
  })
}
</script>

<template>
  <div @click="copy" class="wrapper pointer">
    <div class="mono">
      {{ address.slice(0,12) }}
    </div>
    <div class="mono bold">
      {{ address.slice(12,14) }}
    </div>
    <div class="mono">
      {{ address.slice(14,18) }}
    </div>
    <div class="mono">
      ... 
    </div>
    <div class="mono">
      {{ address.slice(-6,-2) }}
    </div>
    <div class="mono bold">
      {{ address.slice(-2) }}
    </div>
    <span class="pointer material-symbols-outlined">
      content_copy
    </span>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 0px;
}
.bold {
  font-weight: 900;
  color: var(--color-primary)
}
.material-symbols-outlined {
  font-variation-settings:
    'FILL' 0,
    'wght' 100,
    'GRAD' -25,
    'opsz' 20
}
</style>