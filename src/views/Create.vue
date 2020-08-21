<template>
  <div class="create-container">
    <Tracker class="tracker" :state="state"></Tracker>
    <Generate v-show="state == 0" @setLink="setLink"></Generate>
    <Design v-show="state >= 1" :state="state" :link="link" @setSign="setSign"></Design>
    <Footer
      :state="state"
      :link="link"
      @stepForward="stepForward"
      @stepBack="stepBack"
      @done="done"
    ></Footer>
    <Warning v-show="showWarning" @goNext="goNext" @cancelNext="cancelNext"></Warning>
  </div>
</template>

<script>
import Generate from "../components/GenerateCode.vue";
import Design from "../components/Design.vue";
import Footer from "../components/Footer.vue";
import Tracker from "../components/Tracker.vue";
import Warning from "../components/Warning.vue";

export default {
  name: "create",
  components: {
    Generate,
    Design,
    Footer,
    Tracker,
    Warning,
  },
  beforeRouteLeave(to, from, next) {
    console.log("CREATE to: ", to);
    console.log("CREATE from: ", from);
    // const answer = window.confirm(
    //   "Do you really want to leave? you have unsaved changes!"
    // );
    this.showWarning = true;
    this.next = next;
    // if (answer) {
    //   next();
    // } else {
    //   next(false);
    // }
  },
  props: {},
  data() {
    return {
      state: 0,
      link: "",
      signCanvas: null,
      signData: "",
      signDataSet: false,
      showWarning: false,
    };
  },
  methods: {
    goNext() {
      console.log("GO NEXT");
      this.showWarning = false;
      this.next();
    },
    cancelNext() {
      console.log("CANCEL NEXT");
      this.showWarning = false;
      this.next(false);
    },
    stepForward() {
      this.state++;
      "updating state to: ", this.state;
    },
    stepBack() {
      this.state--;
      "updating state to: ", this.state;
    },
    setLink(link) {
      this.link = link;
      ("set link!");
    },
    done() {
      this.$router.push({ path: "/" });
    },
    setSign(signData) {
      this.signData = signData;
      this.signDataSet = true;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tracker {
  margin: 75px 0px 40px 0px;
}
</style>
