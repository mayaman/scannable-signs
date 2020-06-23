<template>
  <div id="header" class="header">
    <div class="title-container">
      <router-link class="title" to="/">Scannable Signs</router-link>

      <!-- <span class="title">Scannable Signs</span> -->
    </div>
    <div class="header-menu-container">
      <span class="header-menu">
        <router-link class="header-menu-option font-M" to="/create">Create your own</router-link>
        <router-link class="header-menu-option font-M" to="/faq">FAQ</router-link>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  height: 80px;
  width: 100%;
  text-align: left;
  position: relative;

  color: #202124;
}

.title-container {
  font-style: normal;
  font-weight: bold;
  font-size: 60px;
  letter-spacing: -0.02em;
  display: inline;
  height: 80px;

  min-width: 50%;
  float: left;
}

.title {
  position: absolute;
  left: 0;
  bottom: 0;

  text-decoration: none;
  color: #202124;
}

.header-menu-container {
  height: 80px;

  position: relative;
  width: 50%;
  float: right;
  text-align: right;
}

.header-menu {
  position: absolute;
  right: 0;
  bottom: 0;
}

.header-menu-option {
  font-family: "Arial Narrow";
  font-style: normal;
  font-weight: bold;
  font-size: 26px;
  letter-spacing: -0.01em;
  display: inline;
  color: #202124;
  margin: 0 0 0 62px;

  text-decoration: none;
}

.header-menu-option:hover {
  text-decoration: underline;
}
</style>
