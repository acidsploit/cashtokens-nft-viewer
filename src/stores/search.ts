import { acceptHMRUpdate, defineStore } from "pinia"
import { ref } from "vue"
import { BCMR, Wallet } from "mainnet-js"
import type { NftType } from "mainnet-js/dist/module/wallet/bcmr-v2.schema";
import {
  isValidAddress,
  QueryType,
  formatCashAddress,
  type TokenMetadata
} from '../utils'
import { useSettingsStore } from "./settings";
import router from "@/router";

export interface NFTDetail extends TokenMetadata {
  amount: number;
}

export const useSearchStore = defineStore('search', () => {
  const query = ref("")
  const type = ref("")
  const error = ref(null as any)
  const validatedQuery = ref({
    query: "",
    queryType: QueryType.empty,
  })

  const settings = useSettingsStore()
  const wallet = ref(null as Wallet | null)
  const cachedTokenMetadata = ref([] as TokenMetadata[])
  const nftDetails = ref([] as NFTDetail[])

  async function search(tokenId?: string) {
    error.value = null
    if (query.value !== "" && isValidAddress(query.value)) {
      try {
        validatedQuery.value.query = formatCashAddress(query.value)
        validatedQuery.value.queryType = QueryType.address
        wallet.value = null as Wallet | null
        nftDetails.value = []
        query.value = ""

        await Wallet.fromCashaddr(validatedQuery.value.query).then(async (wlt) => {
          wallet.value = wlt

          if (type.value === "query") {
            router.push(`/nfts/${validatedQuery.value.query}`)
            type.value = ""
          }

          if (tokenId && wallet.value !== null) {
            await loadTokenMetadata(tokenId).then(async (md) => {
              await wallet.value?.getNftTokenBalance(tokenId).then((amount) => {
                const detail = {
                  id: tokenId,
                  amount: amount,
                  BCMR: md?.BCMR
                } as NFTDetail
                // console.log("nftDetails.push")
                nftDetails.value.push(detail)
              })
            })
          }
          else {
            await wallet.value.getAllNftTokenBalances().then(async (nfts) => {
              for (const [id, amount] of Object.entries(nfts)) {
                await loadTokenMetadata(id).then(async (md) => {
                  const detail = {
                    id: id,
                    amount: amount,
                    BCMR: md?.BCMR
                  } as NFTDetail
                  // console.log("nftDetails.push all")
                  nftDetails.value.push(detail)
                })
              }
            })
          }
        })
      } catch (err) {
        error.value = err
      }
    }
    else {
      if (query.value !== "") {
        wallet.value = null
        error.value = "invalid search query"
        // alert("invalid search query")
      }
    }
  }

  async function loadTokenMetadata(tokenId: string): Promise<TokenMetadata | undefined> {
    const cache = cachedTokenMetadata.value.find((md) => md.id === tokenId)
    let result = {} as TokenMetadata
    if (cache !== undefined) {
      result = cache
    } else {
      await BCMR.fetchAuthChainFromChaingraph({
        transactionHash: tokenId,
        chaingraphUrl: settings.chaingraphUrl,
        network: 'mainnet'
      }).then(async (authChain) => {
        const httpsUrl = authChain.pop()?.httpsUrl
        if (httpsUrl !== undefined) {
          await BCMR.addMetadataRegistryFromUri(httpsUrl).then(() => {
            const info = BCMR.getTokenInfo(tokenId);
            // console.log("BCMR: " + JSON.stringify(info))
            const detail: TokenMetadata = {
              id: tokenId,
              BCMR: info
            }
            // console.log("cachedTokenMetadata.push")
            cachedTokenMetadata.value.push(detail)

            result = detail
          })
        }
      })
    }

    return result
  }

  function getNftCollectionById(id: string): NFTDetail | undefined {
    const result = nftDetails.value.find(detail => {
      if (detail.id === id) {
        return true
      }
    });

    return result
  }

  function getNftCollectionNameById(id: string): string | undefined {
    const md = getNftCollectionById(id)
    return md?.BCMR?.name ? md.BCMR.name : undefined
  }

  function getNftTypeByCommitment(tokenId: string, commitment: string): NftType | undefined {
    const collection = getNftCollectionById(tokenId)
    if (collection?.BCMR?.token?.nfts?.parse) {
      for (const [commt, nftType] of Object.entries(collection.BCMR.token.nfts.parse.types)) {
        if (commt === commitment) {
          // console.log("nftDetail: " + JSON.stringify(nftDefinition))
          return nftType
        }
      }
    }

    return undefined
  }

  return {
    query,
    type,
    error,
    validatedQuery,
    wallet,
    cachedTokenMetadata,
    nftDetails,
    search,
    getNftCollectionById,
    getNftCollectionNameById,
    getNftTypeByCommitment,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSearchStore, import.meta.hot))
}