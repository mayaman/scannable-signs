<template>
  <div id="app" class="app-container">
    <div v-if="!onMobile">
      <Header @updateState="updateState" />
      <router-view :key="$route.path"></router-view>
      <img
        class="visuallyhidden"
        width="83px"
        id="clonable-smiley"
        :src="require(`@/assets/icons/smiley.png`)"
      />
    </div>
    <div v-if="onMobile && ($router.currentRoute.name != 'welcome')">
      <img
        class="visuallyhidden"
        width="58px"
        id="clonable-frowny"
        :src="require(`@/assets/icons/frowny.png`)"
      />
      <Mobile></Mobile>
    </div>

    <div v-if="onMobile && ($router.currentRoute.name == 'welcome')">
      <router-view :key="$route.path"></router-view>
    </div>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Mobile from "./components/Mobile.vue";

export default {
  name: "App",
  props: {},
  data() {
    return {
      state: "splash",
      link: "",
      onMobile: false,
    };
  },
  components: {
    Header,
    Mobile,
  },
  mounted() {
    this.onMobile = this.onMobileCheck();
  },
  methods: {
    onMobileCheck() {
      return (
        typeof window.orientation !== "undefined" ||
        navigator.userAgent.indexOf("IEMobile") !== -1
      );
    },
    updateState(newState) {
      ("updating state");
      this.state = newState;
    },
    setLink(link) {
      this.link = link;
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@600&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Archivo+Narrow:wght@700&display=swap");

body {
  margin: 0px;
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
}

#app {
  font-family: "Archivo Narrow", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #202124;
  margin: 70px 8%;
}

::-moz-selection {
  background: #c9f2e2;
}

::selection {
  background: #c9f2e2;
}

/* HELPERS */
.top-layer {
  z-index: 999;
  width: 100%;
  height: 100%;
}

.visuallyhidden {
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
}

.font-M {
  font-size: 24px;
}

.font-L {
  font-size: 32px;
}

.copy-M {
  font-family: "Archivo Narrow", sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 26px;
  line-height: 125%;

  letter-spacing: -0.01em;
}

button {
  font-family: "Archivo Narrow", sans-serif;
  border: none;
}

button:hover {
  cursor: pointer;
}

button:focus {
  outline: #19b774 solid 2px;
}

.chunky-button {
  font-size: 24px;
  padding: 8px;
  font-family: "Archivo Narrow", sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 26px;
  line-height: 30px;
  letter-spacing: -0.01em;
}

.green {
  color: #19b774;
}

.green-button {
  color: #ffffff;
  background: #19b774;
  border-radius: 3px;
  border: 2px solid #19b774;
}

.no-underline {
  text-decoration: none;
}
.inverse-green-button {
  background: #f2f9f6;
  border: 2px solid #19b774;
  border-radius: 3px;
  color: #19b774;
}

.vertically-centered {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
}

.light-gray {
  color: #dadce0;
}

@media screen and (max-width: 768px) {
  #app {
    margin: 28px 8%;
  }
}
</style>
