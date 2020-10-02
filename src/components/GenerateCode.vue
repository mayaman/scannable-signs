<template>
  <div class="generate-container">
    <div class="box-container">
      <div class="qr-box left" id="left-box">
        <div class="top-layer">
          <label for="search" class="visuallyhidden">Input link</label>
          <input
            class="blinking-cursor"
            id="link-input"
            type="text"
            name="link input"
            autofocus
            maxlength="100"
            autocomplete="off"
          />
          <span id="note">(PASTE A LINK)</span>
        </div>
        <img class="zigzag-box" src="../assets/icons/zigzag_left.png" alt />
      </div>
      <div class="qr-box right" id="right-box">
        <div class="top-layer" id="right-box-contents">
          <canvas id="canvas"></canvas>
          <div class="download-button-container">
            <img
              class="download-icon"
              :src="require(`@/assets/icons/green_download.png`)"
              alt
            />
            <button class="download-button" @click="downloadJPEG()">
              DOWNLOAD JPEG
            </button>
          </div>

          <!-- <div class="download-button-container">
            <button class="download-button" @click="downloadSVG()">
              <img class="download-icon" src="../assets/icons/download.png" alt />
              DOWNLOAD SVG
            </button>
          </div>-->
        </div>
        <img class="zigzag-box" src="../assets/icons/zigzag_right.png" alt />
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from "qrcode";

export default {
  name: "Generate",
  props: {},
  data() {
    return {
      QRCanvas: null,
      SVGCavnas: null,
      codeGenerated: false,
      qrOptions: {
        width: 220,
        scale: 4,
        color: {
          dark: "#000000ff",
          light: "#ffffffff",
        },
      },
    };
  },
  mounted() {
    const inputText = "placeholder";

    this.QRCanvas = document.getElementById("canvas");

    QRCode.toCanvas(this.QRCanvas, inputText, this.qrOptions, (error) => {
      if (error) console.error(error);
      ("success!");
      this.$emit("setLink", inputText);
    });

    document.getElementById("link-input").addEventListener("input", (e) => {
      const inputText = e.target.value;
      document.getElementById("right-box-contents").style.opacity = "1.0";
      this.codeGenerated = true;
      QRCode.toCanvas(this.QRCanvas, inputText, this.qrOptions, (error) => {
        if (error) console.error(error);
        ("success!");
        this.$emit("setLink", inputText);
      });
    });
  },
  methods: {
    downloadJPEG() {
      if (this.codeGenerated) {
        let downloadElt = document.createElement("a");
        downloadElt.href = this.QRCanvas.toDataURL("image/jpeg");
        downloadElt.download = "QRCode.jpg";
        document.body.appendChild(downloadElt);
        downloadElt.click();
        document.body.removeChild(downloadElt);
      }
    },
    downloadSVG() {
      if (this.codeGenerated) {
        // let downloadElt = document.createElement("a");
        // downloadElt.href = this.QRCanvas.toDataURL("image/jpeg");
        // downloadElt.download = "QRCode.jpg";
        // document.body.appendChild(downloadElt);
        // downloadElt.click();
        // document.body.removeChild(downloadElt);
        let QRCode = this.SVGCanvas.getSerializedSvg(true);
        console.log(QRCode);
        let downloadElt = document.createElement("a");

        //convert svg source to URI data scheme.
        var url =
          "data:image/svg+xml;charset=utf-8," + encodeURIComponent(QRCode);
        downloadElt.href = url;
        downloadElt.download = "QRCode.svg";
        document.body.appendChild(downloadElt);
        downloadElt.click();
        document.body.removeChild(downloadElt);
      }
    },
  },
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
  margin-right: 10px;
  text-align: left;
}

#right-box {
  width: 36%;
}

#right-box-contents {
  opacity: 0.3;
}

.zigzag-box {
  width: 100%;
  height: 100%;
  height: 400px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -9;
}

.qr-box {
  border-radius: 3px;
  height: 400px;
  text-align: center;
  font-size: 24px;
  display: inline-block;
  margin: 40px 0px;
  position: relative;
}

#link-input {
  font-family: "Archivo Narrow", sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 32px;
  line-height: 125%;
  /* or 32px */

  display: flex;
  align-items: center;
  letter-spacing: -0.01em;

  /* Scannable Green */

  color: #202124;

  border: none;
  text-align: left;
  font-size: 24px;
  font-family: "Archivo Narrow", sans-serif;
  min-width: 90%;
  height: 100%;
  padding: 0px 0 0 4%;
  background: none;
  /* margin: 1%; */
}

#link-input:focus {
  outline: 0;
}

#note {
  font-family: "Archivo Narrow", sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.1em;
  width: 100%;
  /* or 32px */

  display: flex;
  align-items: center;

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
  font-family: "Archivo Narrow", sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 26px;
  line-height: 125%;
  letter-spacing: -0.01em;
  color: #202124;
}

.download-button-container {
  position: absolute;
  left: 50%;
  bottom: 33px;
  transform: translate(-50%, 0);
  text-align: center;
  width: 100%;
  font-size: 14px;
  line-height: 16px;
  align-items: center;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.download-button {
  background: none;
  /* border-bottom: 1px solid; */
  text-transform: uppercase;

  font-weight: bold;

  color: #19b774;
  padding: 0px;
  margin: 0px 5px;
}

.download-icon {
  width: 19px;
  height: 18px;
  vertical-align: text-bottom;
}
</style>
