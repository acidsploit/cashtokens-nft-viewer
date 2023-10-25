import { defineStore } from "pinia"
import { computed, ref } from "vue"
import { BCMR, Wallet } from "mainnet-js"
import type { IdentitySnapshot, NftType } from "mainnet-js/dist/module/wallet/bcmr-v2.schema";
import router from "../router"
import {
  isValidAddress,
  isTokenID,
  QueryType,
  type TokenDetail,
formatAddress
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
    if (isValidAddress(query.value)) {
      validatedQuery.value.query = formatAddress(query.value)
      validatedQuery.value.queryType = QueryType.address
      query.value = ""

      await Wallet.fromCashaddr(validatedQuery.value.query).then(
        async (wlt) => {
          wallet.value = wlt
          await wallet.value.getAllNftTokenBalances().then((nfts) => {
            nftDetails.value = []
            for (const [id, amount] of Object.entries(nfts)) {
              const detail: TokenDetail = {
                id: id,
                amount: amount,
                BCMR: undefined
              }
              nftDetails.value.push(detail)
            }
          })
          await wallet.value.getAllTokenBalances().then((tokens) => {
            tokenDetails.value = []
            for (const [id, amount] of Object.entries(tokens)) {
              const detail: TokenDetail = {
                id: id,
                amount: amount,
                BCMR: undefined
              }
              tokenDetails.value.push(detail)
            }
          })
        })

    } else if (isTokenID(query.value)) {
      validatedQuery.value.query = query.value
      validatedQuery.value.queryType = QueryType.token
      query.value = ""
    } else {
      wallet.value = null
      alert("invalid search query")
    }
  }

  async function loadNftBcmrMetadata(chaingraphUrl: string) {
    nftDetails.value.forEach(async detail => {
      if (detail.BCMR === undefined) {
        try {
          await BCMR.fetchAuthChainFromChaingraph({
            transactionHash: detail.id,
            chaingraphUrl: chaingraphUrl,
            network: 'mainnet'
          }).then(async (authChain) => {
            const httpsUrl = authChain.pop()?.httpsUrl
            if (typeof httpsUrl !== "undefined") {
              await BCMR.addMetadataRegistryFromUri(httpsUrl)
            }
          }).then(() => {
            const info: IdentitySnapshot | undefined = BCMR.getTokenInfo(detail.id);
            detail.BCMR = info
          })
        } catch (error) {
          // console.log("error fetching BCMR for: " + detail.id)
        }
      }
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
