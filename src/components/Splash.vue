<template>
  <div class="container">
    <div id="header">
      <h1 id="title">Scannable Signs</h1>
      <!-- <div id="header-menu">
        <div class="header-menu-option font-M">Explore examples</div>
        <div class="header-menu-option font-M">Create your own</div>
        <div class="header-menu-option font-M">How it works</div>
      </div>-->
      <button @click="$emit('updateState', 'generate')" id="next-button">MAKE YOUR OWN</button>
      <img src="../assets/02.png" alt />

      <img src="../assets/03.png" alt />

      <img src="../assets/04.png" alt />
    </div>
  </div>
</template>

<script>
export default {
  name: "Splash",
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#title {
  font-size: 48px;
  display: inline-block;
}

#header {
  display: inline-block;
  margin-top: 15%;
}

#header-menu {
  display: inline-block;
}

.header-menu-option {
  display: inline-block;
  margin: 50px;
}

button {
  display: block;
  text-align: center;
  margin: auto;
  background: #c08afbff;
  border-radius: 50px;
  border: 2px solid #c08afbff;
  font-size: 24px;
  width: 100%;
}

button:hover {
  background: rgb(214, 176, 255);
  border-radius: 50px;
  border: 2px solid rgb(214, 176, 255);
  transition-timing-function: ease;
}

img {
  width: 200px;
  margin: 50px;
  box-shadow: 2px 2px 5px rgba(0, 0, 50, 0.1);
}
</style>
