<template>
  <div class="container">
    <div class="contact-container">
      <span class="contact-info">
        Questions? Want to suggest a different type of scannable sign? Follow and reach out on Twitter at
        <a href="https://twitter.com/ScannableSigns">@scannablesigns</a>.
      </span>
    </div>
  </div>
</template>


<script>
export default {
  name: "contact",
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.contact-container {
  text-align: left;
  width: 830px;
  margin: 70px 0px;
}

.contact-info {
font-family: 'Archivo Narrow', sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 32px;
  line-height: 125%;
  letter-spacing: -0.01em;
}

a {
  color: #19b774;
  text-decoration: none;
}
</style>
