<template>
  <div class="warning-container">
    <div class="warning-background"></div>
    <div class="warning-dialog">
      <!-- <div class="texture"></div> -->
      <img class="texture" src="@/assets/textures/texture-16.png" alt />
      Are you sure you’re done?
      <br />Your design will not be saved.
      <br />
      <div class="warning-options">
        <button
          @click="$emit('cancelNext')"
          class="chunky-button green-button warning-option"
        >CANCEL</button>
        <button
          @click="$emit('goNext')"
          class="chunky-button inverse-green-button warning-option"
        >DONE</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "warning",
  props: {},
  watch: {},
  data() {
    return {};
  },
  mounted() {},
};
</script>

<style scoped>
.warning-container {
  position: absolute;
  z-index: 0;
  top: 0;
  left: 0;
  width: 100vw;
  min-height: 105%;
}

.warning-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  min-height: 105%;
  background: #ffffff;
  opacity: 0.75;
  -webkit-filter: blur(5px);
  -moz-filter: blur(5px);
  -o-filter: blur(5px);
  -ms-filter: blur(5px);
  filter: blur(5px);
  z-index: -2;
}

.warning-dialog {
  width: 40%;
  opacity: 1;
  position: absolute;
  top: 35%;
  left: 30%;
  background: #ffffff;
  border: 2px solid #000000;
  box-sizing: border-box;

  padding: 40px 64px;

  /* Main copy */
  text-align: center;
  font-family: "Arial Narrow";
  font-style: normal;
  font-weight: bold;
  font-size: 32px;
  line-height: 125%;
  letter-spacing: -0.01em;
  color: #202124;
}

.warning-options {
  margin-top: 34px;
}

.warning-option {
  width: 42%;
  margin: 3%;
}

.texture {
  position: absolute;
  width: 100%;
  height: 100%;
  transform: translate(10px, 8px);
  top: 0;
  left: 0;
  z-index: -1;
}
</style>
