<template>
  <div class="container">
    <div id="header" class="header">
      <div class="title">Scannable Signs</div>
      <div class="header-menu">
        <button class="header-menu-option font-M">Explore examples</button>
        <button @click="$emit('updateState', 'generate')" class="header-menu-option font-M">Create your own</button>
        <button @click="$emit('updateState', 'about')" class="header-menu-option font-M">How it works</button>
      </div>
    </div>
    <div
      class=".description"
    >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis ullamco.</div>
    <!-- <button @click="$emit('updateState', 'generate')" id="next-button">MAKE YOUR OWN</button> -->
    <img src="../assets/02.png" alt />

    <img src="../assets/03.png" alt />

    <img src="../assets/04.png" alt />
  </div>
</template>

<script>
export default {
  name: "faq",
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  grid-row: 1;
  grid-column: 1 / 6;
  display: inline;
}

.title {
  font-size: 48px;
  display: inline-block;
  grid-row: 1;
  grid-column: 1 / 3;
  align-items: start;
  align-self: center;
  margin: 0px;
}

/* #header {
  display: inline-block;
  margin-top: 15%;
} */

.header-menu {
  display: inline-block;
  grid-row: 1;
  grid-column: 4 / 6;
  align-items: start;
  align-self: center;
}

.header-menu-option {
  display: inline-block;
  margin: 0px 50px;
  align-items: start;
  align-self: center;
}

.header-menu-option:hover {
  text-decoration: underline;
}

img {
  width: 200px;
  margin: 50px;
  box-shadow: 2px 2px 5px rgba(0, 0, 50, 0.1);
}
</style>
