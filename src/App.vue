<template>
  <div id="app">
    <Splash @updateState="updateState" v-show="state=='splash'" :link="link" />
    <Generate @updateState="updateState" @setLink="setLink" v-show="state=='generate'" />
    <Create v-show="state=='create'" :link="link" />
  </div>
</template>

<script>
import Splash from "./components/Splash.vue";
import Generate from "./components/Generate.vue";
import Create from "./components/Create.vue";

export default {
  name: "App",
  props: {},
  data() {
    return {
      state: "create",
      link: ""
    };
  },
  components: {
    Splash,
    Generate,
    Create
  },
  methods: {
    updateState(newState) {
      console.log("updating state");
      this.state = newState;
    },
    setLink(link) {
      this.link = link;
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Oswald&display=swap");

#app {
  font-family: "Oswald", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #202124;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
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

.left {
  float: left;
}

.right {
  float: right;
}

.font-M {
  font-size: 24px;
}

button {
  font-family: "Oswald", sans-serif;
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
  color: #DADCE0;
}

.light-gray-background {
  background: #DADCE0;
}
</style>
