<template>
  <div class="container">
    <!-- <div
      class=".description"
    >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis ullamco.</div> -->
    <!-- <button @click="$emit('updateState', 'generate')" id="next-button">MAKE YOUR OWN</button> -->
    <!-- <img src="../assets/02.png" alt />

    <img src="../assets/03.png" alt />

    <img src="../assets/04.png" alt /> -->
  </div>
</template>

<script>
export default {
  name: "splash",
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
