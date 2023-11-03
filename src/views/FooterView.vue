<script setup lang="ts">
</script>

<template>
  <div class="container footer">
    <div class="content first">
      <p>
        Building and maintaining a project on a fast and progressively evolving platform like Bitcoin Cash requires
        continious maintenance and updates. In short, a lot of work. I am, nevertheless, having a lot of fun with this.
      </p>
      <p>
        If there is any change you could chuck my way to offset the costs, or buy me a beer, that would make my day :)
      </p>
      <p>
        CashAddress<br />
        <a
          href="bitcoincash:qrnml95v6wmduw6xzwvddph4cevahxzzhq9n56y2sv">bitcoincash:qrnml95v6wmduw6xzwvddph4cevahxzzhq9n56y2sv</a>
      </p>
      <p>
        TokenAddress<br />
        <a
          href="bitcoincash:zrnml95v6wmduw6xzwvddph4cevahxzzhqze8y2v0l">bitcoincash:zrnml95v6wmduw6xzwvddph4cevahxzzhqze8y2v0l</a>
      </p>
      <p>
        By <a href="https://twitter.com/acidsploit" target="_blank">sploit</a> with <span class="heart">❤️</span>
      </p>
    </div>
    <div class="content second">
      <h3>Props</h3>
      <p><a href="https://twitter.com/GeukensMathieu" target="_blank">Mathieu</a></p>
      <p><a href="https://cashonize.com" target="_blank">Cashonize Wallet</a></p>
      <p><a href="https://mainnet.cash" target="_blank">mainnet-js</a></p>
      <p><a href="https://github.com/bitauth/libauth" target="_blank">bitauth/libauth</a></p>
    </div>
    <div class="content third">
      <h3>Links</h3>
      <p>
        <a href="https://github.com/acidsploit/cashtokens-nft-viewer" target="_blank"><img class="logo"
            src="../assets/images/github-logo.svg" /></a>
      </p>
      <p>
        <a href="https://t.me/CashTokensNFTViewer" target="_blank"><img class="telegram"
            src="../assets/images/telegram-logo.svg" /></a>
      </p>

    </div>
  </div>
</template>

<style scoped>
.footer {
  display: flex;
  flex-direction: column;
  /* justify-content: space-around; */
  padding: 5rem 0 5rem 0;
  color: var(--color-lightGrey)
}

.content {
  border-style: solid;
  padding: 0 0 0 2rem;
  border-width: 0 0 0 1px;
  border-color: var(--color-darkGrey);
  margin: 0 0 2rem 0;
}

.first {
    word-wrap: break-word;
  }



.heart {
  color: red;
}

img.logo {
  max-width: 50px;
}

img.telegram {
  /* max-width: 55px; */
  width: 55px;
}

@media only screen and (min-width: 900px) {
  .footer {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding: 5rem 0 5rem 0;
    color: var(--color-lightGrey)
  }

  .first {
    flex: 1 1 33%;
    max-width: 35vw;
    word-wrap: break-word;
  }

  .second {
    flex-grow: 1 1 34%;
    /* width: 34vw; */
  }

  .third {
    flex-grow: 1 1 33%;
    /* width: 33vw; */
  }

}
</style>
