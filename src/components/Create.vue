<template>
  <div class="container">
    <div class="header">
      <h1 class="step-title">1. GENERATE SCANNABLE CODE</h1>
      <h1 class="step-title active-title">2. CREATE YOUR SIGN</h1>
    </div>
    <div class="box-container">
      
    </div>
    <div class="footer">
      <button id="next-button">NEXT</button>
    </div>
  </div>
</template>

<script>

export default {
  name: "Create",
  props: {},
  mounted() {
    console.log("mounted!");
  }
};
</script>

<style scoped>
/* WRAPPERS */
.container {
  position: absolute;
  display: grid;
  grid-template-columns: 100px 500px 50px 500px 100px;
  grid-template-rows: 100px 600px 100px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

/* HEADER */
.header {
  grid-row: 1;
  grid-column: 1 / 6;
  align-self: center;
}

.step-title {
  display: inline;
  margin: 25px;
  color: #202124;
}

.active-title {
  text-decoration: underline;
}

/* FOOTER */
.footer {
  grid-row: 3;
  grid-column: 1 / 6;
  align-self: center;
}

#next-button {
  background: #c08afbff;
  border-radius: 50px;
  border: 2px solid #c08afbff;
  font-size: 24px;
  width: 50%;
}

/* BOXES */
.box-container {
  grid-column-start: 2;
  grid-column-end: 5;
  grid-row-start: 2;
  grid-row-end: 3;
}

#left-box {
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 2;
  grid-row-end: 3;
}

#right-box {
  grid-column-start: 4;
  grid-column-end: 5;
}

.qr-box {
  width: 500px;
  height: 500px;
  border-radius: 5px;
  border: 2px solid #c08afbff;
  text-align: center;
  font-size: 24px;
  grid-row-start: 2;
  grid-row-end: 3;
  display: inline-block;
  margin: 50px 0px;
}

#link-input {
  width: 480px;
  height: 480px;
  border: none;
  text-align: center;
  font-size: 24px;
  margin: 10px;
  font-family: "Oswald", sans-serif;
}

canvas {
  width: 500px;
  height: 500px;
  margin: 0;
}

::placeholder {
  font-family: "Oswald", sans-serif;
}
</style>
