<script setup lang="ts">
</script>

<template>
    <div class="container footer">
        <div class="content">
            By <a href="https://twitter.com/acidsploit" target="_blank">sploit</a> with <span class="heart">❤️</span>
        </div>
        <div class="content">
            <h3>Props</h3>
            <p><a href="https://twitter.com/GeukensMathieu" target="_blank">Mathieu</a></p>
            <p><a href="https://cashonize.com/" target="_blank">Cashonize Wallet</a></p>
            <p><a href="https://mainnet.cash/" target="_blank">mainnet-js</a></p>
        </div>
        <div class="content">
            <h3>Links</h3>
            <a href="https://github.com/acidsploit/cashtokens-nft-viewer" target="_blank"><img class="logo" src="../assets/images/github-logo.svg" /></a>
        </div>

    </div>
</template>

<style scoped>
.footer {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding: 5rem 0 5rem 0;
    color: var(--color-lightGrey)
}

.content {
    border-style: solid;
    padding: 0 0 0 2rem;
    border-width: 0 0 0 1px;
    border-color: var(--color-darkGrey);
}

.heart {
    color: red;
}

img.logo {
    max-width: 50px;
}

.material-symbols-outlined {
  font-variation-settings:
    'FILL' 0,
    'wght' 400,
    'GRAD' 0,
    'opsz' 24
}

</style>
