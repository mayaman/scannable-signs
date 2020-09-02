<template>
  <div id="splash-container" class="container">
    <div class="description-container">
      Need a quick, contactless way to collect orders, tips, or signatures? A new way to make appointments, or leave reviews? Create your very own
      <a
        href="https://twitter.com/hashtag/ScannableSign"
        target="_blank"
      >#ScannableSign</a> with this simple tool.
      <br />
      <div class="create-button">
        <router-link to="/create">CREATE A SIGN</router-link>
      </div>
    </div>
    <div class="sign-demo">
      <img class="sign" :src="require(`@/assets/demo.gif`)" />
    </div>
  </div>
</template>

<script>
export default {
  name: "splash",
  props: {},
  data() {
    return {
      smileyWidth: 83,
      addedListener: false,
    };
  },
  created() {},
  mounted() {
    document.body.addEventListener("mouseup", this.handleMouseUp);
  },
  destroyed() {
    document.body.removeEventListener("mouseup", this.handleMouseUp);
  },
  methods: {
    handleMouseUp(e) {
      let newSmiley = document.getElementById("clonable-smiley").cloneNode();
      newSmiley.style.position = "absolute";

      let leftPos = e.clientX - this.smileyWidth / 2;
      let topPos = e.clientY - this.smileyWidth / 2;
      let rotation = Math.random() * 360;

      newSmiley.style.left = leftPos + "px";
      newSmiley.style.top = topPos + "px";
      newSmiley.style.transform = "rotate(" + rotation + "deg)";
      newSmiley.classList.remove("visuallyhidden");
      document.getElementById("splash-container").appendChild(newSmiley);
    },
  },
};
</script>

<style scoped>
.description-container {
  text-align: left;
  width: 50%;
  margin: 60px 0px;
  display: inline-block;
  float: left;

  font-family: "Archivo Narrow", sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 32px;
  line-height: 130%;
  letter-spacing: -0.01em;
  color: #202124;
}

.sign-option-container {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
}

.sign-option {
  position: relative;
  margin: 5% 0px;
  max-width: 22.5%;
}

.sign {
  width: 100%;
  opacity: 1;
  transition: ease 0.25s;
}

.sticker {
  position: absolute;
  width: 50%;
  height: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -80%);
  opacity: 1;
}

.description-container a {
  color: #19b774;
  text-decoration: none;
}

.description-container a:hover {
  color: #000000;
}

.create-button {
  margin-top: 60px;
  width: 100%;
}

.create-button a {
  background: #19b774;
  border-radius: 3px;
  border: 2px solid #19b774;
  font-size: 24px;
  padding: 8px 0px;

  font-family: "Archivo Narrow", sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 26px;
  line-height: 30px;
  letter-spacing: -0.01em;

  color: #ffffff;
  text-decoration: none;
  display: inline-block;
  width: 100%;
  text-align: center;
}

.create-button a:hover {
  background: #f2f9f6;
  border: 2px solid #19b774;
  color: #19b774;
  transition: background-color 0.1s ease;
}

.sign-demo {
  width: 42%;
  display: inline-block;
  float: right;
  margin-top: 5px;
}
</style>
