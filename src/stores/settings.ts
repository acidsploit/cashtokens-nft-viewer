import { defineStore } from "pinia"
import { ref } from "vue"


const storedChaingraphuri: string | null = localStorage.getItem("chaingraphuri")
const chaingraphuri = storedChaingraphuri ? storedChaingraphuri : "https://gql.chaingraph.pat.mn/v1/graphql"

const storedIpfsGateway:  string | null = localStorage.getItem("ipfsgateway")
const ipfsgateway = storedIpfsGateway ? storedIpfsGateway : "https://ipfs.io/ipfs/"

export const useSettingsStore = defineStore('settings', () => {
  const chaingraphUrl = ref(chaingraphuri)
  const ipfsGateway = ref(ipfsgateway)

  return { chaingraphUrl, ipfsGateway }
})
