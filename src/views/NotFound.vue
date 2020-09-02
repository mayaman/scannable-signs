<template>
  <div class="container">
    <div class="contact-container">
      <span class="contact-info">
        The page you are looking for does not exist...
        <a
          href="http://scannablesigns.com"
        >return to home page</a>.
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
