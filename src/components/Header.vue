<template>
  <div id="header" class="header">
    <div class="title-container">
      <router-link class="title nav-link" to="/">
        Scannable Signs
        <img
          v-show="$route.name == 'splash'"
          class="nav-circle"
          id="scannable-circle"
          src="../assets/icons/scannable_circle.png"
          alt
        />
      </router-link>

      <!-- <span class="title">Scannable Signs</span> -->
    </div>
    <div class="header-menu-container">
      <span class="header-menu">
        <router-link class="header-menu-option font-M nav-link" to="/create">
          Create a sign
          <img
            v-show="$route.name == 'create'"
            class="nav-circle"
            id="scannable-circle"
            src="../assets/icons/green_create_circle.png"
            alt
          />
        </router-link>
        <router-link class="header-menu-option font-M nav-link" to="/faq">
          FAQ
          <img
            v-show="$route.name == 'faq'"
            class="nav-circle"
            id="scannable-circle"
            src="../assets/icons/green_faq_circle.png"
            alt
          />
        </router-link>
        <!-- <router-link class="header-menu-option font-M nav-link" to="/contact">
          Contact
          <img
            v-show="$route.name == 'contact'"
            class="nav-circle"
            id="scannable-circle"
            src="../assets/icons/green_contact_circle.png"
            alt
          />
        </router-link> -->
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: {},
  mounted() {
    console.log("hello scannable");
    console.log(this.$route);
  },
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
  color: #202124 !important;
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
  position: relative;
}

.nav-circle {
  position: absolute;
  left: -10%;
  top: -5%;
  width: 115%;
  height: 110%;
}

.router-link-exact-active {
  color: #19b774;
}

.nav-link:hover {
  color: #19b774 !important;
}
</style>
