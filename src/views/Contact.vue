<template>
  <div class="container">
    <div class="contact-container">
      <span class="contact-info">Questions? Want to suggest a different type of scannable sign? Follow and reach out on Twitter at <a href="https://twitter.com/ScannableSigns">@scannablesigns</a>.</span>
    </div>
  </div>
</template>


<script>
export default {
  name: "contact",
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.contact-container {
  text-align: left;
  width: 650px;
  margin: 40px 0px;
}

.contact-info {
  font-family: "Arial Narrow";
  font-style: normal;
  font-weight: bold;
  font-size: 26px;
  line-height: 125%;
  /* or 32px */
  letter-spacing: -0.01em;
}

a {
  color: #19B774;
  text-decoration: none;
}
</style>
