import { reactive } from 'vue'
import type { Wallet } from "mainnet-js";
import { QueryType } from '../utils';

const validatedQuery = {
  query: "",
  queryType: QueryType.empty,
}

let chaingraphUri: string = "https://gql.chaingraph.pat.mn/v1/graphql"
const storedChaingraphUri: string | null = localStorage.getItem("chaingraphuri")
if (typeof storedChaingraphUri === 'string'){
  chaingraphUri = storedChaingraphUri
}

export const store = reactive({
  query: "",
  validatedQuery: validatedQuery,
  chaingraphUrl: chaingraphUri,
  wallet: null as Wallet | null,
})