<template>
  <div class="footer-container">
    <div v-show="state == 0">
      <button
        v-show="!isActive"
        id="next-button"
        class="dull-footer-button full-width"
      >NEXT</button>

      <button
        v-show="isActive"
        @click="$emit('stepForward')"
        id="next-button"
        class="footer-button full-width"
      >NEXT</button>
    </div>
    <div v-show="state > 0">
      <button
        @click="$emit('stepBack')"
        id="back-button-half"
        class="footer-button half-width"
      >BACK</button>
      <button
        @click="$emit('stepForward')"
        id="next-button-half"
        class="footer-button half-width"
      >NEXT</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "footer",
  props: {
    state: Number,
    link: String
  },
  data() {
    return {
      isActive: false
    };
  },
  watch: {
    link(newLink) {
      console.log("updated link footer knows what is up: ", newLink);
      this.isActive = newLink != "";
      console.log("active: ", this.isActive);
    }
  },
  mounted() {}
};
</script>

<style scoped>
/* FOOTER */
.footer-container {
}

.dull-footer-button {
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
  opacity: 0.2;
}

.footer-button {
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
}

.footer-button:hover {
  background: #202124;
  border: 2px solid #202124;
  transition-timing-function: ease;
}

#next-button-half {
  margin-left: 1%;
}

#back-button-half {
  margin-right: 1%;
}

.full-width {
  width: 100%;
}

.half-width {
  width: 48%;
  display: inline-block;
}
</style>
