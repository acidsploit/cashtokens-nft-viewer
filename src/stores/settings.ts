import { defineStore } from "pinia"
import { computed, ref } from "vue"

const storedChaingraphUri: string | null = localStorage.getItem("chaingraphuri")
const chaingraphUri = storedChaingraphUri ? storedChaingraphUri : "https://gql.chaingraph.pat.mn/v1/graphql"

export const useSettingsStore = defineStore('settings', () => {
  const chaingraphUrl = ref(chaingraphUri)

  return { chaingraphUrl }
})
