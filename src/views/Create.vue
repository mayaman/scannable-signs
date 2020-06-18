<template>
  <div class="create-container">
    <Tracker class="tracker" :state="state"></Tracker>
    <Generate v-show="state == 0" @setLink="setLink"></Generate>
    <Design v-show="state == 1" :link="link"></Design>
    <Footer :state="state" :link="link" @stepForward="stepForward" @stepBack="stepBack"></Footer>
  </div>
</template>

<script>
import Generate from "../components/GenerateCode.vue";
import Design from "../components/Design.vue";
import Footer from "../components/Footer.vue";
import Tracker from "../components/Tracker.vue";

export default {
  name: "create",
  components: {
    Generate,
    Design,
    Footer,
    Tracker
  },
  props: {},
  data() {
    return {
      state: 0,
      link: ""
    };
  },
  methods: {
    stepForward() {
      this.state++;
      console.log("updating state to: ", this.state);
    },
    stepBack() {
      this.state--;
      console.log("updating state to: ", this.state);
    },
    setLink(link) {
      this.link = link;
      console.log("set link!");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.create-container {
}

.tracker {
  margin: 75px 0px;
}
</style>
