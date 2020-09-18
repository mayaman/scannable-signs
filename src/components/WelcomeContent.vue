<template>
  <div class="mobile-container" id="mobile-container">
    <h1 class="mobile-header">
      Welcome to
      <span>
        <img class="nav-circle" id="scannable-circle" src="../assets/icons/desktop_circle.png" alt /> Scannable Signs
      </span>
    </h1>
    <div class="sign-demo">
      <img class="sign" :src="require(`@/assets/demo.gif`)" />
    </div>
    <div class="mobile-description">
      To make a
      <a
        class="green no-underline"
        href="https://twitter.com/hashtag/ScannableSign"
        target="_blank"
      >#ScannableSign</a> you need to be using a full-on computer (so you can design your sign up reaaal nice).
    </div>
  </div>
</template>

<script>
export default {
  name: "welcomecontent",
  props: {},
  watch: {},
  data() {
    return {
      smileyWidth: 58,
    };
  },
  mounted() {
    document.body.addEventListener("mouseup", this.handleMouseUp);
  },
  methods: {
    handleMouseUp(e) {
      let newSmiley = document.getElementById("clonable-frowny").cloneNode();
      newSmiley.style.position = "absolute";

      let leftPos = e.clientX - this.smileyWidth / 2;
      let topPos = e.clientY - this.smileyWidth / 2;
      let rotation = Math.random() * 360;

      newSmiley.style.left = leftPos + "px";
      newSmiley.style.top = topPos + "px";
      newSmiley.style.transform = "rotate(" + rotation + "deg)";
      newSmiley.classList.remove("visuallyhidden");
      document.getElementById("mobile-container").appendChild(newSmiley);
    },
  },
};
</script>

<style scoped>
.mobile-container {
  padding-top: 5%;
}

.mobile-header {
  font-family: "Archivo Narrow", sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 32px;
  line-height: 100%;
  text-align: center;
  letter-spacing: -0.01em;
}

.mobile-description {
  font-family: Source Code Pro;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 136%;
  text-align: center;
  letter-spacing: -0.02em;

  width: 75%;
  margin: auto;
  display: block;
  position: relative;
  padding-top: 15px;
}

.nav-circle {
  position: absolute;
  left: 49%;
  width: 116px;
  /* width: 115%;
  height: 110%; */
}

.sign-demo img {
  width: 90%;
}
</style>
