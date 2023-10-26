import { defineStore } from "pinia"
import { ref } from "vue"
import { BCMR, Wallet } from "mainnet-js"
import type { NftType } from "mainnet-js/dist/module/wallet/bcmr-v2.schema";
import {
  isValidAddress,
  isTokenID,
  QueryType,
  formatAddress,
  type TokenMetadata
} from '../utils'
import { useSettingsStore } from "./settings";
import router from "@/router";

export interface NFTDetail extends TokenMetadata {
  amount: number;
}

export interface TokenDetail extends TokenMetadata {
  amount: number;
}

export const useSearchStore = defineStore('search', () => {
  const query = ref("")
  const type = ref("")
  const validatedQuery = ref({
    query: "",
    queryType: QueryType.empty,
  })

  const settings = useSettingsStore()
  const wallet = ref(null as Wallet | null)
  const cachedTokenMetadata = ref([] as TokenMetadata[])
  const nftDetails = ref([] as NFTDetail[])
  const tokenDetails = ref([] as TokenDetail[])

  async function search(tokenId?: string) {
    // if (isValidAddress(query.value) && formatAddress(query.value) !== wallet.value?.cashaddr) {
    if (isValidAddress(query.value)) {

      validatedQuery.value.query = formatAddress(query.value)
      validatedQuery.value.queryType = QueryType.address
      query.value = ""
      wallet.value = {} as Wallet
      nftDetails.value = []
      tokenDetails.value = []

      console.log("router.currentRoute" + JSON.stringify(router.currentRoute, null, 4))

      if (type.value === "query") {
        router.push(`/nfts/${validatedQuery.value.query}`)
        type.value = ""
      }

      await Wallet.fromCashaddr(validatedQuery.value.query).then(async (wlt) => {
        wallet.value = wlt
        if (tokenId && wallet.value !== null) {
          await loadTokenMetadata(tokenId).then(async (md) => {
            await wallet.value?.getNftTokenBalance(tokenId).then((amount) => {
              const detail = {
                id: tokenId,
                amount: amount,
                BCMR: md?.BCMR
              } as NFTDetail
              console.log("nftDetails.push")
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
                console.log("nftDetails.push all")
                nftDetails.value.push(detail)
              })
            }
          })
        }
        // if (!tokenId) {
        //   await wallet.value.getAllTokenBalances().then(async (tokens) => {
        //     for (const [id, amount] of Object.entries(tokens)) {
        //       await loadTokenMetadata(id).then(async (md) => {
        //         const detail = {
        //           id: id,
        //           amount: amount,
        //           BCMR: md?.BCMR
        //         } as TokenDetail
        //         tokenDetails.value.push(detail)
        //       })
        //     }
        //   })
        // }
      })
    }
    // else if (isTokenID(query.value)) {
    //   validatedQuery.value.query = query.value
    //   validatedQuery.value.queryType = QueryType.token
    //   query.value = ""
    // }
    else {
      wallet.value = null
      alert("invalid search query")
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
            console.log("BCMR: " + JSON.stringify(info))
            const detail: TokenMetadata = {
              id: tokenId,
              BCMR: info
            }
            console.log("cachedTokenMetadata.push")
            cachedTokenMetadata.value.push(detail)

            result = detail
          })
        }
      })
    }

    return result
  }

  function getNftCollectionById(id: string): TokenMetadata | undefined {
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

  return {
    query,
    type,
    validatedQuery,
    wallet,
    cachedTokenMetadata,
    nftDetails,
    tokenDetails,
    search,
    getNftCollectionById,
    getNftCollectionNameById,
    getNftDetailByCommitment,
  }

})
