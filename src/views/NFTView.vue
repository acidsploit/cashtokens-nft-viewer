<script setup lang="ts">
import { useSearch } from '@/stores/search';
import { useSettings } from '@/stores/settings';
import type { Token } from '@/utils';
import { useSeoMeta } from '@unhead/vue';
import { computed, onMounted, ref, watch } from 'vue';

const props = defineProps({
  address: { type: String, required: true },
  tokenId: { type: String, required: true },
  commitment: { type: String, required: true },
})

const settings = useSettings()
const search = useSearch()
const collection = ref(null as Token | null)

function setSeoMeta() {
  useSeoMeta({
  title: collection.value?.bcmr?.token?.nfts?.parse.types[props.commitment].name,
  description: collection.value?.bcmr?.token?.nfts?.parse.types[props.commitment].description,
  ogDescription: collection.value?.bcmr?.token?.nfts?.parse.types[props.commitment].description,
  ogTitle: collection.value?.bcmr?.token?.nfts?.parse.types[props.commitment].name,
  ogImage: collection.value?.bcmr?.token?.nfts?.parse.types[props.commitment].uris?.image,
  twitterCard: 'summary_large_image',
  twitterSite: window.location.href,
  twitterTitle: collection.value?.bcmr?.token?.nfts?.parse.types[props.commitment].name,
  twitterDescription: collection.value?.bcmr?.token?.nfts?.parse.types[props.commitment].description,
  twitterImage: collection.value?.bcmr?.token?.nfts?.parse.types[props.commitment].uris?.image,
})
}



onMounted(() => {
  let searchCollection = search.result.tokens.find((token) => { return token.id === props.tokenId })
  if (search.result.address === props.address && searchCollection != undefined) {
    collection.value = searchCollection
    setSeoMeta()
  } else {
    search.search("props", props.address, props.tokenId).then(() => {
      searchCollection = search.result.tokens.find((token) => { return token.id === props.tokenId })

      if (searchCollection != undefined) {
        collection.value = searchCollection
        setSeoMeta()
      }
    })
  }
})

watch(
  [() => props.address, () => props.tokenId, () => props.commitment],
  async ([newAaddress, newTokenId, newCommitment]) => {
    let searchCollection = search.result.tokens.find((token) => { return token.id === newTokenId })
    if (search.result.address === newAaddress && searchCollection != undefined) {
      collection.value = searchCollection
      setSeoMeta()
    } else {
      search.search("props", newAaddress, newTokenId).then(() => {
        searchCollection = search.result.tokens.find((token) => { return token.id === newTokenId })

        if (searchCollection != undefined) {
          collection.value = searchCollection
          setSeoMeta()
        }
      })
    }
  }
)

const nftName = computed(() => {
  return collection?.value?.bcmr?.token?.nfts?.parse.types[props.commitment].name
})

function prefixImgUri(uri: string): string {
  if (uri.slice(0, 7) === "ipfs://") {
    let prefix = settings.ipfsGateway
    let path = uri.slice(7)
    uri = prefix + path
  }

  return uri
}

const imgUri = computed(() => {
  if (collection.value?.bcmr?.token?.nfts?.parse.types[props.commitment].uris?.image != undefined) {
    return prefixImgUri(collection.value.bcmr.token.nfts.parse.types[props.commitment].uris!.image)
  } else if (collection.value?.bcmr?.token?.nfts?.parse.types[props.commitment].uris?.icon != undefined) {
    return prefixImgUri(collection.value.bcmr.token.nfts.parse.types[props.commitment].uris!.icon)
  } else {
    return undefined
  }
})

const description = computed(() => {
  return collection.value?.bcmr?.token?.nfts?.parse.types[props.commitment].description
})

const attributes = computed(() => {
  return collection.value?.bcmr?.token?.nfts?.parse.types[props.commitment]?.extensions?.attributes
})


</script>

<template>
  <div class="container wrapper">
    <h1 class="nft-name">{{ nftName ? nftName : props.commitment }}</h1>
    <img v-if="imgUri" :src="imgUri" />

    <div class="container meta">
      <div v-if="attributes" class="attributes">
        <h4 class="text-center">Attributes</h4>
        <div class="table">
          <div class="key">
            <div class="entry mono" v-for="[key] of Object.entries(attributes)" v-bind:key="key">
              {{ key }}
            </div>
          </div>
          <div class="value">
            <div class="entry mono" v-for="[key, value] of Object.entries(attributes)" v-bind:key="key">
              {{ value ? value : "none" }}
            </div>
          </div>
        </div>
      </div>

      <div v-if="description" class="description">
        <h4 class="text-center">Description</h4>
        <div>{{ description }}</div>
      </div>
    </div>
  </div>


  <!-- <h1>NFT Details</h1>
  <p class="mono">{{ props.address }}</p>
  <p class="mono">{{ search.result.address }}</p>
  <p class="mono">{{ props.tokenId }}</p>
  <p class="mono">{{ props.commitment }}</p>
  <pre v-if="collection?.bcmr?.token?.nfts?.parse.types[props.commitment]" class="mono data">
    {{ JSON.stringify(collection?.bcmr?.token?.nfts?.parse.types[props.commitment], null, 4) }}
  </pre>
  <pre v-else class="mono data">
    {{ JSON.stringify(collection, null, 4) }}
  </pre>

  <pre class="mono data">
    {{ JSON.stringify(collection, null, 4) }}
  </pre> -->
</template>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  flex-direction: column;
  border-style: solid;
  border-radius: 8px;
  border-width: 1px;
  border-color: var(--color-darkGrey);

}

.nft-name {
  font-weight: 800;
  text-align: center;
}

img {
  border-radius: 12px;
}

.meta {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  margin: 1rem 0 1rem 0;
}

.attributes {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 1rem 0 1rem 0;
}

.table {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.entry {
  border-width: 0 0 1px 0;
  border-style: solid;
  border-color: var(--color-primary);
  padding: 0.5rem 1rem 0 1rem;
  white-space: nowrap;
  overflow: hidden;
}


.description {
  display: flex;
  flex-direction: column;
  text-align: justify;
  margin: 1rem 0 1rem 0;
}

@media only screen and (min-width: 1200px) {
  img {
    max-width: 40vw;
  }

  .meta {
    flex-wrap: nowrap;
    justify-content: space-around;
  }

  .attributes {
    margin: 1rem 2rem 1rem 1rem;
    width: fit-content;
  }

  .description {
    margin: 1rem 1rem 1rem 2rem;
  }
}

.data {
  word-wrap: break-word;
  white-space: pre-wrap;
  max-width: 100vw;
}
</style>