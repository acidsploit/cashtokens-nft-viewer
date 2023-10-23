import { defineStore } from "pinia"
import { computed, ref } from "vue"
import { Wallet } from "mainnet-js"
import type { IdentitySnapshot } from "mainnet-js/dist/module/wallet/bcmr-v2.schema";

import  router  from "../router"
import {
  isValidCashAddress,
  isTokenID,
  QueryType
} from '../utils'


interface TokenDetail {
  id: string;
  amount: number;
  BCMR: IdentitySnapshot | undefined;
}



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

      router.push("/nfts/" + validatedQuery.value.query)

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

  return { query, validatedQuery, wallet, nftDetails, search }

})




// export const useSearchStore = defineStore('search', () => {
//   // const count = ref(0)
//   // const name = ref('Eduardo')
//   // const doubleCount = computed(() => count.value * 2)
//   // function increment() {
//   //   count.value++
//   // }
// })