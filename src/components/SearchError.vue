<script setup lang="ts">
import { useSearchStore } from "@/stores/search";

const props = defineProps<{
    error: any
    type?: string
}>()

const search = useSearchStore()

function close() {
    search.error = null
}
</script>

<template>
    <div v-if="props.type === 'inline'" class="inline">
        Error: {{ props.error }}
    </div>

    <div v-if="props.type === 'page' || props.type !== 'inline'" class="container wrapper">
        <span class="close material-symbols-outlined" @click="close">
            close
        </span>
        <h1>Error</h1>
        <p>
            {{ String(props.error) }}
        </p>
    </div>
</template>

<style scoped>
.wrapper {
    width: 50vw;
    border-radius: 12px;
    padding: 1rem;
    margin-bottom: 3rem;
    color: var(--color-lightGrey);
    background-color: var(--bg-error-color);
    text-align: center;
}

.close {
    float: right;
    cursor: pointer;
    font-size: 4rem;
}

</style>