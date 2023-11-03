<script setup lang="ts">
import { computed } from 'vue'
import { useToast } from 'vue-toast-notification';

const props = defineProps({
  addr: { type: String, required: true },
  type: { type: String }, // "uri" (bitcoincash: payment uri) or "link" (navigate to address in app), defaults to link
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
  <div v-if="props.type === 'uri'" class="address-wrapper">
    <a class="address-wrapper" :href="props.addr">
      <div class="mono">
        {{ address.slice(0, 12) }}
      </div>
      <div class="mono bold text-primary">
        {{ address.slice(12, 14) }}
      </div>
      <div class="mono">
        {{ address.slice(14, 18) }}
      </div>
      <div class="mono">
        ...
      </div>
      <div class="mono">
        {{ address.slice(-6, -2) }}
      </div>
      <div class="mono bold text-primary">
        {{ address.slice(-2) }}
      </div>
    </a>
    <span @click="copy" class="pointer material-symbols-outlined" title="Copy address">
      content_copy
    </span>
  </div>

  <div v-else class="address-wrapper">
    <RouterLink class="address-wrapper" :to="`/address/${props.addr}`">
      <div class="mono">
        {{ address.slice(0, 12) }}
      </div>
      <div class="mono bold text-primary">
        {{ address.slice(12, 14) }}
      </div>
      <div class="mono">
        {{ address.slice(14, 18) }}
      </div>
      <div class="mono">
        ...
      </div>
      <div class="mono">
        {{ address.slice(-6, -2) }}
      </div>
      <div class="mono bold text-primary">
        {{ address.slice(-2) }}
      </div>
    </RouterLink>
    <span @click="copy" class="pointer material-symbols-outlined" title="Copy address">
      content_copy
    </span>
  </div>
</template>

<style scoped>
.address-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 0px;
}

.material-symbols-outlined {
  font-variation-settings:
    'FILL' 0,
    'wght' 100,
    'GRAD' -25,
    'opsz' 20
}
</style>