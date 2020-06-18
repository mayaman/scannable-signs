<template>
  <div class="generate-container">
    <div class="box-container">
      <div class="qr-box left" id="left-box">
        <label for="search" class="visuallyhidden">Input link</label>
        <input id="link-input" type="text" name="link input" placeholder="PASTE YOUR LINK HERE" />
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
          console.log("success!");
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
  border: none;
  text-align: left;
  font-size: 24px;
  font-family: "Arial Narrow";
  width: 96%;
  height: 96%;
  margin: 1%;
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
}
</style>
