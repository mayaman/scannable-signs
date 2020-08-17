<template>
  <div id="splash-container" class="container">
    <div class="description-container">
      Need a quick, contactless way to collect orders, tips, or signatures? A new way to make appointments, or leave reviews? Make a
      <a
        href="https://twitter.com/ScannableSigns"
        target="_blank"
      >#ScannableSign</a> with our simple tool.
      <br />
      <div class="create-button">
        <router-link to="/create">CREATE A SIGN</router-link>
      </div>
    </div>
    <div class="sign-demo">
      <img class="sign" :src="require(`@/assets/demo.gif`)" />
    </div>
    <!-- <div class="sign-option-container">
      <div class="sign-option" v-for="sign in signOptions" :key="sign">
        <router-link class="sign-option-link-wrapper" to="/create">
          <img class="sign" :src="require(`@/assets/signs/${sign}.png`)" />
          <img class="sticker" :src="require(`@/assets/stickers/${sign}.png`)" />
        </router-link>
      </div>
    </div>-->
  </div>
</template>

<script>
export default {
  name: "splash",
  props: {},
  data() {
    return {
      smileyWidth: 60,
      signTypes: [
        "MENUS",
        "DONATIONS",
        "RESERVATIONS",
        "CALLS",
        "ORDERS",
        "REVIEWS",
        "EMAILS",
        "CREATE YOUR OWN",
      ],
      signOptions: [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
      ],
    };
  },
  mounted() {
    document.body.addEventListener("click", (e) => {
      console.log(e.target.tagName);
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
    });
  },
  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.description-container {
  text-align: left;
  width: 50%;
  margin: 60px 0px;
  display: inline-block;
  float: left;

  font-family: "Arial Narrow";
  font-style: normal;
  font-weight: bold;
  font-size: 32px;
  line-height: 130%;
  letter-spacing: -0.01em;
  color: #202124;
}

.sign-option-container {
  display: flex; /* or inline-flex */
  flex-flow: row wrap;
  justify-content: space-between;
}

.sign-option-link-wrapper {
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

/* .sign:hover {
  opacity: 1;
  cursor: pointer;
  transform: rotate(-2deg);
} */

/* 
.sign:hover + .sticker {
  display: none;
} */

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

.create-button {
  margin-top: 60px;
  width: 100%;
}

.create-button a {
  background: #19b774;
  border-radius: 3px;
  border: 2px solid #19b774;
  font-size: 24px;
  padding: 11px;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 18px;
  letter-spacing: 0.22em;
  color: #ffffff;
  text-decoration: none;
  display: inline-block;
  width: 100%;
  text-align: center;
}

.create-button a:hover {
  background: #ffffff;
  border: 2px solid #19b774;
  color: #19b774;
  transition: background-color 0.1s ease;
}

.sign-demo {
  width: 40%;
  display: inline-block;
  float: right;
  margin-top: 60px;
}
</style>
