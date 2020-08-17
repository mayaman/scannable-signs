<template>
  <div class="footer-container">
    <div v-show="state == 0">
      <button v-show="!isActive" id="next-button" class="dull-footer-button full-width">NEXT</button>

      <button
        v-show="isActive"
        @click="$emit('stepForward')"
        id="next-button"
        class="footer-button full-width"
      >NEXT</button>
    </div>

    <div v-show="state > 0 && state < 2">
      <button @click="$emit('stepBack')" id="back-button-half" class="footer-button half-width">BACK</button>
      <button
        @click="$emit('stepForward')"
        id="next-button-half"
        class="footer-button half-width"
      >NEXT</button>
    </div>

    <div v-show="state == 2">
      <button @click="$emit('stepBack')" id="back-button-half" class="footer-button half-width">BACK</button>
      <button @click="$emit('done')" id="next-button-half" class="footer-button half-width">DONE</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "footer",
  props: {
    state: Number,
    link: String,
  },
  data() {
    return {
      isActive: false,
    };
  },
  watch: {
    link(newLink) {
      "updated link footer knows what is up: ", newLink;
      this.isActive = newLink != "";
      "active: ", this.isActive;
    },
  },
  mounted() {},
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
  font-size: 26px;
  line-height: 30px;
  letter-spacing: -0.01em;

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
  background: #ffffff;
  border: 2px solid #19b774;
  color: #19b774;
  transition: background-color 0.1s ease;
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
  width: 49%;
  display: inline-block;
}
</style>
