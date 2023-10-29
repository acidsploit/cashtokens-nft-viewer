import { acceptHMRUpdate, defineStore } from "pinia"
import { ref } from "vue"
import { BCMR, TokenSendRequest, Wallet, type UtxoI } from "mainnet-js"
import type { IdentitySnapshot, NftType } from "mainnet-js/dist/module/wallet/bcmr-v2.schema";
import {
  isValidAddress,
  QueryType,
  formatCashAddress,
  type TokenMetadata,
  isValidAddress2,
type Token
} from '../utils'
import { useSettingsStore } from "./settings";
import router from "@/router";

export interface NFTDetail extends TokenMetadata {
  amount: number;
}

// export interface Token {
//   id: string,
//   amount?: number,
//   utxos?: UtxoI[]
//   bcmr?: IdentitySnapshot
// }

export const useSearchStore = defineStore('search', () => {
  const query = ref("")
  const type = ref("")
  const error = ref(null as any)
  const validatedQuery = ref({
    query: null as string | null,
    queryType: QueryType.empty,
  })

  const settings = useSettingsStore()
  const wallet = ref(null as Wallet | null)
  const cachedTokenMetadata = ref([] as TokenMetadata[])
  const nftDetails = ref([] as NFTDetail[])


  const result = ref({
    address: null as string | null,
    wallet: null as Wallet | null,
    tokens: [] as Token[]
  })

  async function search2(type: string, address: string, tokenId?: string) {
    error.value = null

    if (address !== "") {
      const isValidatedAddress = isValidAddress2(address)
      if (isValidatedAddress === true) {
        result.value.address = formatCashAddress(address)
        console.log("Validate address as :" + result.value.address)
        result.value.wallet = null as Wallet | null
        result.value.tokens = [] as Token[]

        try {
          await Wallet.fromCashaddr(result.value.address).then(async (wallet) => {
            console.log("Created watch-only wallet from: " + result.value.address)
            console.log("Wallet CashAddress:  " + wallet.cashaddr)
            console.log("Wallet TokenAddress: " + wallet.tokenaddr)

            result.value.wallet = wallet

            if (type === "query") {
              router.push(`/nfts/${validatedQuery.value.query}`)
            }

            if (tokenId) {
              try {
                const token = { id: tokenId } as Token
                await result.value.wallet.getNftTokenBalance(tokenId).then(async (balance) => {
                  console.log(`Fetched token balance (${balance}) for tokenid: tokenId`)
                  token.amount = balance
                  await result.value.wallet?.getTokenUtxos(tokenId).then(async (utxos) => {
                    console.log(`Fetched ${utxos.length} token utxos for tokenid: ${tokenId}`)
                    token.utxos = utxos
                    result.value.tokens.push(token)

                    fetchTokenMetadata(tokenId).then((snapshot) => {
                      result.value.tokens.forEach((token) => {
                        if (token.id === tokenId) {
                          console.log("Fetched bcmr metadata for: " + tokenId)
                          token.bcmr = snapshot
                        }
                      })
                    })
                  })
                })
              } catch (err) {
                error.value = "Failed to fetch token data: " + err
              }
            } else {
              console.log("no tokenid")
            }
          })
        } catch (err) {
          error.value = `Failed to create wallet from ${result.value.address}: ${err}`
          console.log(error.value)
        }
      } else {
        error.value = "Invalid CashAddress: " + isValidatedAddress
        console.log(error.value)
      }
    }
  }

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
  
  async function fetchTokenMetadata(tokenId: string): Promise<IdentitySnapshot | undefined> {
      try {
        let snapshot = BCMR.getTokenInfo(tokenId)
        if (snapshot === undefined) {
          await BCMR.fetchAuthChainFromChaingraph({
            transactionHash: tokenId,
            chaingraphUrl: settings.chaingraphUrl,
            network: 'mainnet'
          }).then(async (authChain) => {
            console.log("Fetched authchain from chaingraph for tokenId: " + tokenId)
            // console.log(JSON.stringify(authChain, null, 4))
            const httpsUrl = authChain.pop()?.httpsUrl
            if (httpsUrl !== undefined) {
              await BCMR.addMetadataRegistryFromUri(httpsUrl).then(() => {
                console.log("Added metadata registry from: " + httpsUrl)
                snapshot = BCMR.getTokenInfo(tokenId)
              })
            }
          })
        }

        return snapshot

      } catch (err) {
        error.value = `Failed to fetch token metadata for tokenid: ${tokenId} Error: ${err}`
        console.log(error.value)
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
    result,
    search,
    search2,
    getNftCollectionById,
    getNftCollectionNameById,
    getNftTypeByCommitment,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSearchStore, import.meta.hot))
}