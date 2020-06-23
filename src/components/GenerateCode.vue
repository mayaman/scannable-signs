<template>
  <div class="generate-container">
    <div class="box-container">
      <div class="qr-box left" id="left-box">
        <label for="search" class="visuallyhidden">Input link</label>
        <input id="link-input" type="text" name="link input" placeholder="PASTE YOUR LINK HERE" />
        <span id="note">(YOUR QR CODE WILL BE GENERATED AUTOMATICALLY)</span>
      </div>
      <div class="qr-box right zigzag" id="right-box">
        <canvas id="canvas"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from "qrcode";

export default {
  name: "Generate",
  props: {},
  mounted() {
    document.getElementById("link-input").addEventListener("input", e => {
      const inputText = e.target.value;
      let qrOptions = {
        width: 220,
        scale: 4,
        color: {
          dark: "#000000ff",
          light: "#ffffffff"
        }
      };

      QRCode.toCanvas(
        document.getElementById("canvas"),
        inputText,
        qrOptions,
        error => {
          if (error) console.error(error);
          ("success!");
          this.$emit("setLink", inputText);
        }
      );
    });
  }
};
</script>

<style scoped>
/* FOOTER */
.footer {
  grid-row: 3;
  grid-column: 1 / 6;
  align-self: center;
}

#next-button {
  background: #19b774;
  border-radius: 50px;
  border: 2px solid #19b774;
  font-size: 24px;
  width: 50%;
}

#next-button:hover {
  background: rgb(214, 176, 255);
  border-radius: 50px;
  border: 2px solid rgb(214, 176, 255);
  transition-timing-function: ease;
}

/* BOXES */
.box-container {
  display: inline-flex;
  width: 100%;
}

#left-box {
  width: 63%;
  margin-right: 2%;
  border-style: solid dotted solid solid;
  text-align: left;
}

#right-box {
  width: 35%;
  border-style: solid solid solid dotted;
}

.qr-box {
  border-radius: 3px;
  height: 400px;
  border: 2px solid #202124;
  text-align: center;
  font-size: 24px;
  display: inline-block;
  margin: 50px 0px;
  position: relative;
}

.zigzag {
  /* background: linear-gradient(-137deg, #e8117f 6px, transparent 0) 0 5px,
    linear-gradient(320deg, #e8117f 5px, #fff 0) 0 5px;
  background-color: #e8117f;
  background-position: left bottom;
  background-repeat: repeat-y;
  background-size: 10px 10px; */
}

#link-input {
  font-family: "Arial Narrow";
  font-style: normal;
  font-weight: bold;
  font-size: 26px;
  line-height: 125%;
  /* or 32px */

  display: flex;
  align-items: center;
  letter-spacing: -0.01em;

  /* Scannable Green */

  color: #19b774;

  border: none;
  text-align: left;
  font-size: 24px;
  font-family: "Arial Narrow";
  min-width: 90%;
  height: 96%;
  padding: 0px 4%;
  margin: 1%;
}

#note {
  font-family: "Source Code Pro";
  font-style: normal;
  font-weight: 600;
  font-size: 11px;
  line-height: 14px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #202124;
  padding-left: 4%;
  position: absolute;
  bottom: 28px;
}

canvas {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
}

::placeholder {
  font-family: "Arial Narrow";
  font-style: normal;
  font-weight: bold;
  font-size: 26px;
  line-height: 125%;
  letter-spacing: -0.01em;

  /* Grey/900 */

  color: #202124;
}
</style>
