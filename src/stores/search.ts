import { acceptHMRUpdate, defineStore } from "pinia"
import { ref } from "vue"
import { BCMR, Wallet } from "mainnet-js"
import type { IdentitySnapshot } from "mainnet-js/dist/module/wallet/bcmr-v2.schema";
import {
  formatCashAddress,
  isValidAddress,
  type Token
} from '../utils'
import { useSettingsStore } from "./settings";
import router from "@/router";

export const useSearchStore = defineStore('search', () => {
  const settings = useSettingsStore()
  const error = ref(null as any)
  const result = ref({
    address: null as string | null,
    wallet: null as Wallet | null,
    tokens: [] as Token[],
    fullAddressLookup: false
  })

  async function search(type: string, address: string, tokenId?: string) {
    error.value = null
    if (address !== "") {
      const isValidatedAddress = isValidAddress(address)
      if (isValidatedAddress === true) {
        if (type === "query") {
          router.push(`/nfts/${formatCashAddress(address)}`)
        } else {
          result.value.address = formatCashAddress(address)
          console.log("Validate address as: " + result.value.address)
          result.value.wallet = null as Wallet | null
          result.value.tokens = [] as Token[]

          try {
            await Wallet.fromCashaddr(result.value.address).then(async (wallet) => {
              console.log("Created watch-only wallet from: " + result.value.address)
              console.log("Wallet CashAddress:  " + wallet.cashaddr)
              console.log("Wallet TokenAddress: " + wallet.tokenaddr)

              result.value.wallet = wallet
              if (tokenId) {
                result.value.fullAddressLookup = false
                try {
                  await result.value.wallet.getNftTokenBalance(tokenId).then(async (balance) => {
                    console.log(`Fetched token balance (${balance} units) for tokenid: ${tokenId}`)
                    await result.value.wallet?.getTokenUtxos(tokenId).then((utxos) => {
                      console.log(`Fetched (${utxos.length}) token utxos for tokenid: ${tokenId}`)
                      // console.log(JSON.stringify(utxos, null, 4))

                      //move minting utxo to top of array
                      for (let i = 0; i < utxos.length; i++) {
                        if (utxos[i].token?.capability === "minting") {
                          const mint = utxos.splice(i, 1)
                          utxos.unshift(...mint)
                          break
                        }
                      }

                      result.value.tokens.push({
                        id: tokenId,
                        amount: balance,
                        utxos: utxos,
                        bcmr: undefined
                      })

                      // Fetch metadata in background
                      fetchTokenMetadata(tokenId).then((snapshot) => {
                        if (snapshot !== undefined) {
                          result.value.tokens.forEach((token) => {
                            if (token.id === tokenId) {
                              console.log("Fetched and pushed bcmr metadata for: " + tokenId)
                              token.bcmr = snapshot
                            }
                          })
                        }
                      })
                    })
                  })
                } catch (err) {
                  error.value = "Failed to fetch token data: " + err
                }
              } else {
                result.value.fullAddressLookup = true
                try {
                  console.log("no tokenid")
                  await result.value.wallet.getAllNftTokenBalances().then(async (balances) => {
                    if (Object.keys(balances).length >= 1) {
                      console.log(`Fetched token balances for (${Object.keys(balances).length}) tokens`)
                      for (const [id, amount] of Object.entries(balances)) {
                        await result.value.wallet?.getTokenUtxos(id).then((utxos) => {
                          console.log(`Fetched (${utxos.length}) token utxos for token: ${id}`)
                          result.value.tokens.push({
                            id: id,
                            amount: amount,
                            utxos: utxos,
                            bcmr: undefined
                          })

                          // Fetch metadata in background
                          fetchTokenMetadata(id).then((snapshot) => {
                            if (snapshot !== undefined) {
                              result.value.tokens.forEach((token) => {
                                if (token.id === id) {
                                  console.log("Fetched and pushed bcmr metadata for: " + id)
                                  token.bcmr = snapshot
                                }
                              })
                            }
                          })
                        })
                      }
                    } else {
                      error.value = `There are no NFTs on this address: ${result.value.wallet?.tokenaddr}`
                      console.log(error.value)
                    }
                  })
                } catch (err) {
                  error.value = "Failed to fetch token data: " + err
                  console.log(error.value)
                }
              }
            })
          } catch (err) {
            error.value = `Failed to create wallet from ${result.value.address}: ${err}`
            console.log(error.value)
          }
        }
      } else {
        error.value = "Invalid CashAddress: " + isValidatedAddress
        console.log(error.value)
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

  return {
    error,
    result,
    search,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSearchStore, import.meta.hot))
}