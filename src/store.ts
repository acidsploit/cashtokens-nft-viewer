import { reactive } from 'vue'
import type { Wallet } from "mainnet-js";
import { QueryType } from './utils';

const validatedQuery = {
  query: "",
  queryType: QueryType.empty,
}

let chaingraphUri: string | null = "https://gql.chaingraph.pat.mn/v1/graphql"
if (localStorage.getItem("chaingraphuri")){
  chaingraphUri = localStorage.getItem("chaingraphuri")
}

export const store = reactive({
  query: "",
  validatedQuery: validatedQuery,
  chaingraphUrl: chaingraphUri,
  wallet: null as Wallet | null,
})