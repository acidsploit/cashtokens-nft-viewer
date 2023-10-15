import { reactive } from 'vue'
// import { Wallet } from 'mainnet-js'

// const wallet = await  Wallet.named("namedWallet")

export const store = reactive({
  query: '',
  chaingraphUrl: "https://gql.chaingraph.pat.mn/v1/graphql",
  // wallet: await new Wallet(),
})