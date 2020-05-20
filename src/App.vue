<template>
  <div id="app">
    <Generate 
    @updateState="updateState"
    v-show="state=='generate'"/>
    <Create v-show="state=='create'" />
  </div>
</template>

<script>
import Generate from "./components/Generate.vue";
import Create from "./components/Create.vue";

export default {
  name: "App",
  data() {
    return {
      state: "generate"
    };
  },
  components: {
    Generate,
    Create
  },
  methods: {
    updateState(newState) {
      console.log("updating state")
      this.state = newState;
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
  color: #2c3e50;
  background: #f8f9fa;
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
</style>
