<template>
  <div class="container">
    <div class="description-container">
      Transform any sign into a menu, order form, tip jar, and more! Explore the sample gallery below to see what you can create. Ready to make a sign of your own?
      <router-link class to="/create">Create a sign</router-link> to get started.
    </div>
    <div class="sign-option-container">
      <div class="sign-option" v-for="sign in signOptions" :key="sign">
        <router-link class="sign-option-link-wrapper" to="/create">
          <img class="sign" :src="require(`@/assets/signs/${sign}.png`)" />
          <!-- <img class="sticker" :src="require(`@/assets/stickers/${sign}.png`)" /> -->
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "splash",
  props: {},
  data() {
    return {
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
       '01', '02', '03', '04', '05', '06', "07", "08", "09", "10", "11", "12", "13", "14", "15"
      ],
    };
  },
  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.description-container {
  text-align: left;
  width: 65%;
  margin: 60px 0px;

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

.sign:hover {
  opacity: 1;
  cursor: pointer;
  transform: rotate(-2deg);
}
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
}
</style>
