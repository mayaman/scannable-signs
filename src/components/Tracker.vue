<template>
  <div class="tracker-container">
    <!-- <span class="line"></span> -->
    <div class="all-step-container">
      <div id="one" class="step-container">
        <div class="step">
          <span class="number">1</span>
          <img v-show="state >=0" class="smiley" src="@/assets/icons/smiley.png" alt />
        </div>
        <span class="step-label">GENERATE QR CODE</span>
      </div>

      <div id="two" class="step-container">
        <div class="step">
          <span class="number">2</span>
          <img v-show="state >=1" class="smiley" src="@/assets/icons/smiley.png" alt />
        </div>
        <span class="step-label">CREATE SIGN</span>
      </div>

      <div id="three" class="step-container">
        <div class="step">
          <span class="number">3</span>
          <img v-show="state >=2" class="smiley" src="@/assets/icons/smiley.png" alt />
        </div>
        <span class="step-label">EXPORT</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "tracker",
  props: {
    state: Number,
  },
  data() {
    return {
      test: true,
    };
  },
  watch: {},
  mounted() {},
};
</script>

<style scoped>
/* FOOTER */
.tracker-container {
  margin-top: 40px;
  /* background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='25' ry='25' stroke='black' stroke-width='3' stroke-dasharray='3%2c 10' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e"); */

  border-top: 1.5px dashed #202124;
}

.all-step-container {
  width: 100%;
  position: relative;
}

.step-container {
  position: absolute;
  height: 50px;
  width: 200px;
}

.step-label {
  width: 200px;
  bottom: 0px;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);

  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.1em;
}

.number {
  font-family: Arial Narrow;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  letter-spacing: -0.01em;
  color: #202124;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.step {
  width: 50px;
  height: 50px;
  /* border: 1.5px dashed #202124; */
  display: inline-block;
  background: #ffffff;
  position: absolute;
  transform: translate(-50%, -50%);

  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='25' ry='25' stroke='black' stroke-width='4' stroke-dasharray='1%2c 10' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
  border-radius: 25px;
}

#one {
  left: 107px;
}

#two {
  left: 50%;
  transform: translate(-50%, 0);
}

#three {
  right: 107px;
}

.smiley {
  width: 83px;
  height: 83px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
