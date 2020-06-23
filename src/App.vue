<template>
  <div id="app" class="app-container">
    <Header @updateState="updateState" />
    <router-view :key="$route.path"></router-view>
  </div>
</template>

<script>
import Header from "./components/Header.vue";

export default {
  name: "App",
  props: {},
  data() {
    return {
      state: "splash",
      link: ""
    };
  },
  components: {
    Header
  },
  methods: {
    updateState(newState) {
      ("updating state");
      this.state = newState;
    },
    setLink(link) {
      this.link = link;
    }
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@600&display=swap');

@font-face {
  font-family: "Arial Narrow";
  src: url("assets/fonts/Monotype - ArialNarrowMTPro-Bold.otf") format("otf");
  font-weight: bold;
}

body {
  margin: 0px;
  width: 100%;
  height: 100%;
}

#app {
  font-family: "Arial Narrow";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #202124;
  /* width: 100%; */
  /* height: 100%; */
  margin: 70px 100px;
}

.app-container {
  /* position: absolute;
  display: flex;
  flex-direction: row; */
  /* display: grid;
  grid-template-columns: 100px auto auto 100px;
  grid-template-rows: 70px 80px auto; */
  /* left: 50%;
  top: 50%;
  transform: translate(-50%, -50%); */
}

/* HELPERS */
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

/* .left {
  float: left;
}

.right {
  float: right;
} */

.font-M {
  font-size: 24px;
}

.font-L {
  font-size: 32px;
}

.copy-M {
  font-family: "Arial Narrow";
  font-style: normal;
  font-weight: bold;
  font-size: 26px;
  line-height: 125%;

  letter-spacing: -0.01em;
}

button {
  font-family: "Arial Narrow";
  border: none;
}

button:hover {
  cursor: pointer;
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
</style>
