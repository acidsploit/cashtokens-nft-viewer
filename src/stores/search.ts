import { defineStore } from "pinia"
import { computed, ref } from "vue"
import { BCMR, Wallet } from "mainnet-js"
import type { IdentitySnapshot, NftType } from "mainnet-js/dist/module/wallet/bcmr-v2.schema";
import router from "../router"
import {
  isValidAddress,
  isTokenID,
  QueryType,
  formatAddress,
  type TokenMetadata
} from '../utils'
import { makeDestructurable } from "@vueuse/core";

export const useSearchStore = defineStore('search', () => {
  const query = ref("")
  const validatedQuery = ref({
    query: "",
    queryType: QueryType.empty,
  })

  interface WalletS {
    address: string,
    wallet: Wallet
  }

  const chaingraphUrl = ref("https://gql.chaingraph.pat.mn/v1/graphql")

  const wallet = ref(null as Wallet | null)
  const wallets = ref([] as WalletS[])
  const nftDetails = ref([] as TokenMetadata[])
  const tokenDetails = ref([] as TokenMetadata[])
  const nftMetadata = ref([] as TokenMetadata[])
  const tokenMetadata = ref([] as TokenMetadata[])

  async function search() {
    if (isValidAddress(query.value)) {
      validatedQuery.value.query = formatAddress(query.value)
      validatedQuery.value.queryType = QueryType.address
      query.value = ""

      const cashedWallet = wallets.value.find((wallet) => wallet.address === validatedQuery.value.query)
      if (cashedWallet !== undefined) {
        wallet.value = cashedWallet.wallet
      } else {
        await Wallet.fromCashaddr(validatedQuery.value.query).then(async (wlt) => {
          wallet.value = wlt
          await wallet.value.getAllNftTokenBalances().then(async (nfts) => {
            for (const [id] of Object.entries(nfts)) {
              if (nftMetadata.value.find((md) => md.id === id) === undefined) {
                await BCMR.fetchAuthChainFromChaingraph({
                  transactionHash: id,
                  chaingraphUrl: chaingraphUrl.value,
                  network: 'mainnet'
                }).then(async (authChain) => {
                  const httpsUrl = authChain.pop()?.httpsUrl
                  if (typeof httpsUrl !== "undefined") {
                    await BCMR.addMetadataRegistryFromUri(httpsUrl)
                  }
                }).then(() => {
                  const info = BCMR.getTokenInfo(id);
                  const detail: TokenMetadata = {
                    id: id,
                    BCMR: info
                  }
                  nftMetadata.value.push(detail)
                })
              }
            }
          })
          await wallet.value.getAllTokenBalances().then(async (tokens) => {
            for (const [id] of Object.entries(tokens)) {
              if (tokenMetadata.value.find((md) => md.id === id) === undefined) {
                await BCMR.fetchAuthChainFromChaingraph({
                  transactionHash: id,
                  chaingraphUrl: chaingraphUrl.value,
                  network: 'mainnet'
                }).then(async (authChain) => {
                  const httpsUrl = authChain.pop()?.httpsUrl
                  if (typeof httpsUrl !== "undefined") {
                    await BCMR.addMetadataRegistryFromUri(httpsUrl)
                  }
                }).then(() => {
                  const info = BCMR.getTokenInfo(id);
                  const detail: TokenMetadata = {
                    id: id,
                    BCMR: info
                  }
                  tokenMetadata.value.push(detail)
                })
              }
            }
          })
        })
      }
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

  function getNftCollectionById(id: string): TokenMetadata | undefined {
    const result = nftMetadata.value.find(detail => {
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

  return { query, validatedQuery, wallet, nftDetails, tokenDetails, nftMetadata, tokenMetadata, search, loadNftBcmrMetadata, getNftDetailByCommitment, getNftCollectionById }

})
