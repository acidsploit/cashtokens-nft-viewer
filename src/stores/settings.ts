import { useDark, useToggle } from "@vueuse/core"
import { acceptHMRUpdate, defineStore } from "pinia"
import { ref } from "vue"


const storedChaingraphuri: string | null = localStorage.getItem("chaingraphuri")
const chaingraphuri = storedChaingraphuri ? storedChaingraphuri : "https://gql.chaingraph.pat.mn/v1/graphql"

const storedIpfsGateway: string | null = localStorage.getItem("ipfsgateway")
const ipfsgateway = storedIpfsGateway ? storedIpfsGateway : "https://ipfs.io/ipfs/"


export const useSettings = defineStore('settings', () => {
  const _isDark = useDark({ disableTransition: false })
  const toggleDark = useToggle(_isDark);
  const isDark = ref(_isDark.value)

  const chaingraphUrl = ref(chaingraphuri)
  const ipfsGateway = ref(ipfsgateway)

  return {
    isDark,
    toggleDark,
    chaingraphUrl,
    ipfsGateway
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSettings, import.meta.hot))
}