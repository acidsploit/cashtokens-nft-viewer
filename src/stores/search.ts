import { defineStore } from "pinia"
import { computed, ref } from "vue"
import { BCMR, Wallet } from "mainnet-js"
import type { IdentitySnapshot, NftType } from "mainnet-js/dist/module/wallet/bcmr-v2.schema";

import router from "../router"
import {
  isValidCashAddress,
  isTokenID,
  QueryType,
  type TokenDetail
} from '../utils'


export const useSearchStore = defineStore('search', () => {

  const query = ref("")
  const validatedQuery = ref({
    query: "",
    queryType: QueryType.empty,
  })
  const wallet = ref(null as Wallet | null)
  const nftDetails = ref([] as TokenDetail[])
  const tokenDetails = ref([] as TokenDetail[])

  async function search() {
    if (isValidCashAddress(query.value)) {
      validatedQuery.value.query = query.value
      validatedQuery.value.queryType = QueryType.cashaddress
      query.value = ""

      // router.push("/nfts/" + validatedQuery.value.query)

      wallet.value = await Wallet.fromCashaddr(validatedQuery.value.query)

      const nfts = await wallet.value.getAllNftTokenBalances()
      nftDetails.value = []
      for (const [id, amount] of Object.entries(nfts)) {
        const detail: TokenDetail = {
          id: id,
          amount: amount,
          BCMR: undefined
        }
        nftDetails.value.push(detail)
      }
      // console.log(JSON.stringify(nftDetails.value))

      const tokens = await wallet.value.getAllTokenBalances()
      tokenDetails.value = []
      for (const [id, amount] of Object.entries(tokens)) {
        const detail: TokenDetail = {
          id: id,
          amount: amount,
          BCMR: undefined
        }
        tokenDetails.value.push(detail)
      }

    } else if (isTokenID(query.value)) {
      validatedQuery.value.query = query.value
      validatedQuery.value.queryType = QueryType.token
    } else {
      wallet.value = null
      alert("invalid search query")
    }
  }

  async function loadNftBcmrMetadata(chaingraphUrl: string) {
    nftDetails.value.forEach(async detail => {
      try {
        const authChain = await BCMR.fetchAuthChainFromChaingraph({
          transactionHash: detail.id,
          chaingraphUrl: chaingraphUrl,
          network: 'mainnet'
        })
        const httpsUrl = authChain.pop()?.httpsUrl
        if (typeof httpsUrl !== "undefined") {
          await BCMR.addMetadataRegistryFromUri(httpsUrl)
        }
      } catch (error) {
        // console.log("error fetching BCMR for: " + detail.id)
      }
      const info: IdentitySnapshot | undefined = BCMR.getTokenInfo(detail.id);
      detail.BCMR = info

      // console.log(`nftinfo: ${JSON.stringify(info, null, 4)}`)
    })
  }

  function getNftCollectionById(id: string): TokenDetail | undefined {
    const result = nftDetails.value.find(detail => {
      if (detail.id === id) {
        return true
      }
    });

    return result
  }

  function getNftDetailByCommitment(tokenId: string, commitment: string): NftType | undefined {
    const collection = getNftCollectionById(tokenId)
    if (collection?.BCMR?.token?.nfts?.parse) {
      for (const [type, nftDefinition] of Object.entries(collection.BCMR.token.nfts.parse.types)) {
        if (type === commitment) {
          // console.log("nftDetail: " + JSON.stringify(nftDefinition))
          return nftDefinition
        }
      }
    }

    return undefined
  }

  return { query, validatedQuery, wallet, nftDetails, tokenDetails, search, loadNftBcmrMetadata, getNftDetailByCommitment, getNftCollectionById }

})




// export const useSearchStore = defineStore('search', () => {
//   // const count = ref(0)
//   // const name = ref('Eduardo')
//   // const doubleCount = computed(() => count.value * 2)
//   // function increment() {
//   //   count.value++
//   // }
// })