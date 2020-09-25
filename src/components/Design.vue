<template>
  <div class="container">
    <div v-show="state != 2" id="design-container" class="design-container">
      <div id="tool-container">
        <button
          @click="selectTool('cursor')"
          v-bind:class="{ activeTool: toolTracker.cursor }"
          class="hidden inactive-tool"
        >
          <img
            v-show="toolTracker.cursor"
            src="../assets/tools/cursor_white.png"
            alt
          />
          <img
            v-show="!toolTracker.cursor"
            src="../assets/tools/cursor.png"
            alt
          />
          <div class="tool-label">MOVE</div>
        </button>
        <button
          @click="selectTool('text')"
          v-bind:class="{ activeTool: toolTracker.text }"
          class="tool inactive-tool"
        >
          <img
            v-show="toolTracker.text"
            src="../assets/tools/text_white.png"
            alt
          />
          <img v-show="!toolTracker.text" src="../assets/tools/text.png" alt />
          <div class="tool-label">TYPE</div>
        </button>
        <button
          @click="selectTool('sticker')"
          v-bind:class="{ activeTool: toolTracker.sticker }"
          class="tool inactive-tool"
        >
          <img
            v-show="toolTracker.sticker"
            src="../assets/tools/frame_white.png"
            alt
          />
          <img
            v-show="!toolTracker.sticker"
            src="../assets/tools/frame.png"
            alt
          />
          <div v-show="!toolTracker.sticker" class="tool-label">
            ADD STICKER
          </div>
        </button>
        <div v-show="toolTracker.sticker" class="frames-container">
          <div class="frame-wrapper">
            <button @click="removeFrame()">
              <img
                class="frame"
                id="remove-frame"
                :src="require(`../assets/frames/withoutguides/Remove.png`)"
              />
            </button>
          </div>
          <div class="frame-wrapper" v-for="frame in frames" :key="frame">
            <button @click="addFrame(frame)">
              <img
                class="frame"
                :id="'frame-' + frame"
                :src="
                  require(`../assets/frames/withoutguides/QR_Frames_QR-${frame}.png`)
                "
              />
            </button>
          </div>
        </div>
      </div>
      <!-- <img id="sign-texture" src="../assets/textures/sign_texture.png" alt /> -->
      <section id="sign-container" @click="checkAddText($event)">
        <!-- <canvas id="drawing-canvas" width="537" height="694.08"></canvas> -->
        <div id="cloneable" class="text-box draggable visuallyhidden">
          <textarea
            rows="1"
            style="height: 1em"
            class="transparent-text large-text-area sign-font-M"
            id="2"
            contenteditable="true"
          ></textarea>
          <button
            id="2"
            @click="removeElt($event)"
            contenteditable="false"
            class="remove-elt-button"
          >
            <img src="../assets/icons/x.png" alt />
          </button>
        </div>
        <canvas class="draggable resizable" id="poster-qr-canvas"></canvas>
        <span class="qr-anchor" id="qr-anchor-ne"></span>
        <span class="qr-anchor" id="qr-anchor-nw"></span>
        <span class="qr-anchor" id="qr-anchor-se"></span>
        <span class="qr-anchor" id="qr-anchor-sw"></span>
      </section>
    </div>
    <div v-show="state == 2" class="export-container">
      <div id="export-info-container" class="half-page">
        <span class="copy-M">
          Thank you for using Scannable Signs!
          <br />Choose a download format:
        </span>
        <div class="download-container">
          <div class="download-option">
            <span>JPEG</span>
            <div class="download-button-container">
              <img
                class="final-download-img"
                :src="require(`@/assets/icons/green_download.png`)"
                alt
              />
              <button @click="downloadJPEG(signData)" class="download-button">
                download
              </button>
            </div>
          </div>

          <div class="download-option">
            <span>PDF</span>

            <div class="download-button-container">
              <img
                class="final-download-img"
                :src="require(`@/assets/icons/green_download.png`)"
                alt
              />
              <button @click="downloadPDF(signData)" class="download-button">
                download
              </button>
            </div>
          </div>
        </div>

        <div class="share-container">
          <span class="copy-M">
            Share your sign with us using
            <a
              class="green no-underline"
              href="https://twitter.com/hashtag/ScannableSign"
              target="_blank"
              >#ScannableSign</a
            >
          </span>
          <br />
          <br />
          <a
            target="_blank"
            class="share-button"
            href="https://twitter.com/intent/tweet?text=I%20just%20made%20a%20%23ScannableSign%20%5Bfor%20my%20store%5D!%20Make%20your%20own%20at%20scannablesigns.com%20%F0%9F%A4%B3%F0%9F%93%83"
            data-size="large"
            >SHARE ON TWITTER</a
          >

          <a
            target="_blank"
            class="share-button"
            href="https://www.facebook.com/sharer/sharer.php?u=https://www.scannablesigns.com"
            data-size="large"
            >SHARE ON FACEBOOK</a
          >
        </div>
      </div>
      <div id="final-sign-container" class="half-page"></div>
    </div>
  </div>
</template>

<script>
import QRCode from "qrcode";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import interact from "interactjs";
import { changeDpiDataUrl } from "changedpi";

export default {
  name: "poster",
  props: {
    link: String,
    state: Number,
  },
  data() {
    return {
      posterWidth: 480, // 480
      posterHeight: 620, // 620
      letterWidth: 563,
      letterHeight: 750,
      qrCodeWidth: 170,
      pMouseX: 0,
      pMouseY: 0,
      mouseX: 0,
      mouseY: 0,
      signFontSize: 32,
      signLineHeight: 43,
      mouseDown: false,
      tooltype: "draw",
      finalPoster: null,
      currentTool: "cursor",
      toolTracker: {
        cursor: true,
        text: false,
        sticker: false,
        undo: false,
      },
      firstQRMove: true,
      signData: null,
      signImage: null,
      savedSignElements: [],
      textCanvas: null,
      textCtx: null,
      textElts: [],
      cloneableNode: null,
      currentIDNumber: 1,
      frames: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      QRCanvas: null,
      frameAdded: false,
      textWidthPadding: 25,
      qrScale: 1,
      qrOptions: {
        width: 170,
        scale: 1, // 4
        margin: 2,
        color: {
          dark: "#000000ff",
          light: "#ffffff00",
        },
      },
      undoStates: [],
      qrResized: false,
      showVerticalCenterGuide: false,
      showHorizontalCenterGuide: false,
      dpr: window.devicePixelRatio || 1,
    };
  },
  computed: {
    toolClassObject: function () {
      return {};
    },
  },
  watch: {
    link: function (newLink) {
      this.QRCanvas = document.getElementById("poster-qr-canvas");
      QRCode.toCanvas(this.QRCanvas, newLink, this.qrOptions, (error) => {
        if (error) console.error(error);
      });
    },
    state: function (newState, oldState) {
      if (newState == 1 && oldState == 0) {
        // Moving forward
        if (this.savedSignElements.length >= 0) {
          this.savedSignElements.innerHTML = "";
          this.initDraggable();
        }
        this.addTextEventListeners();

        this.addText(
          "Scan the code to ...",
          this.posterWidth / 2 - 10,
          this.posterHeight * 0.8
        );

        const qrLeftPosVal = this.posterWidth / 2 - 193 / 2;
        this.QRCanvas.style = "left: " + qrLeftPosVal + "px";
        this.adjustQRAnchors();
      } else if (newState == 1 && oldState == 2) {
        // Going back to poster
        if (this.savedSignElements.length >= 0) {
          this.savedSignElements.innerHTML = "";
          this.savedSignElements.forEach((elt) => {
            document.querySelector("#sign-container").appendChild(elt);
          });
        }
        this.addTextEventListeners();

        // add x button again
        let xes = document.getElementsByClassName("remove-elt-button");
        xes.forEach((elt) => {
          elt.style.display = "block";
        });

        // Add color back
        let textAreas = document.getElementsByClassName("large-text-area");
        textAreas.forEach((elt) => {
          elt.style.color = "#202124";
        });
      } else if (newState == 2) {
        // Prep for export
        // Save current state
        this.savedSignElements = document.querySelector(
          "#sign-container"
        ).children;

        // Remove border for export
        let draggables = document.getElementsByClassName("draggable");
        draggables.forEach((elt) => {
          this.removeBorder(elt);
        });

        // Remove x button for export
        let xes = document.getElementsByClassName("remove-elt-button");
        xes.forEach((elt) => {
          elt.style.display = "none";
        });

        let textAreas = document.getElementsByClassName("large-text-area");
        textAreas.forEach((elt) => {
          elt.style.color = "#00000000";
        });

        html2canvas(document.querySelector("#sign-container"), {
          width: this.posterWidth,
          height: this.posterHeight,
          scrollY: window.scrollY * -1,
        }).then((canvas) => {
          this.finalPoster = canvas;

          let dataURL = this.finalPoster.toDataURL("image/jpeg", 1.0);
          console.log("DATA URL:", dataURL);
          this.signData = changeDpiDataUrl(dataURL, 300);
          console.log("SIGN DATA:", this.signData);
          this.signImage = new Image();
          this.signImage.src = this.signData;
          this.signImage.width = this.posterWidth;
          this.signImage.height = this.posterHeight;

          const finalSignContainer = document.getElementById(
            "final-sign-container"
          );

          if (finalSignContainer.firstChild) {
            finalSignContainer.removeChild(finalSignContainer.firstChild);
          }
          document
            .getElementById("final-sign-container")
            .appendChild(this.signImage);
        });
      }
    },
  },
  updated() {
    this.$nextTick(function () {});
  },
  created() {},
  mounted() {
    this.cloneableNode = document.getElementById("cloneable").cloneNode(true);

    // Create canvas for text
    this.textCanvas = this.createHiDPICanvas(
      this.posterWidth,
      this.posterHeight
    );
    this.textCanvas.id = "main-canv";

    document.getElementById("sign-container").appendChild(this.textCanvas);
    this.textCanvas.style.width = this.posterWidth;
    this.textCanvas.style.height = this.posterHeight;
    this.textCtx = this.textCanvas.getContext("2d");
    this.textCtx.font = "bold " + this.signFontSize + "px Arial Narrow";
    this.textCtx.textAlign = "center";

    document.body.addEventListener("click", (e) => {
      if (e.target.id == "design-container") {
        if (this.currentTool != "cursor") {
          this.selectTool("cursor");
        }
      }
    });

    // Loop
    window.requestAnimationFrame(this.draw);
  },
  methods: {
    addBorder(elt) {
      elt.style.border = "1.5px dashed #19b774";
      if (elt.firstChild && elt.firstChild.tagName == "TEXTAREA") {
        elt.firstChild.nextSibling.style.opacity = "1.0";
      } else {
        let anchors = document.getElementsByClassName("qr-anchor");
        anchors.forEach((anchor) => {
          anchor.style.display = "block";
        });
      }
    },
    removeBorder(elt) {
      elt.style.border = "1.5px dashed #19b77400";
      if (elt.firstChild && elt.firstChild.tagName == "TEXTAREA") {
        elt.firstChild.nextSibling.style.opacity = "0.0";
      } else {
        let anchors = document.getElementsByClassName("qr-anchor");
        anchors.forEach((anchor) => {
          anchor.style.display = "none";
        });
      }
    },
    addTextEventListeners() {
      let textDivs = document.getElementsByClassName("large-text-area");
      textDivs.forEach((div) => {
        div.addEventListener("focusin", (e) => {
          console.log("focus in: ", e.target);
          e.target.classList.remove("placeholder");
          this.addBorder(e.target.parentNode);
          this.autoExpand(e.target);
        });

        div.addEventListener("focusout", (e) => {
          this.removeBorder(e.target.parentNode);
        });

        div.addEventListener("input", (e) => {
          e.target.classList.add("transparent-text");
          this.autoExpand(e.target);
          this.addBorder(e.target.parentNode);
        });
      });

      let xes = document.getElementsByClassName("remove-elt-button");
      xes.forEach((xElt) => {
        xElt.addEventListener("click", (e) => {
          this.removeElt(e);
        });
      });
    },
    removeFrame() {
      // this.QRCanvas.width = this.qrCodeWidth;
      // this.QRCanvas.height = this.qrCodeWidth;

      this.QRCanvas.style.width = this.qrCodeWidth * this.qrScale + "px";
      this.QRCanvas.width = this.qrCodeWidth * this.qrScale * this.dpr;
      this.QRCanvas.height = this.qrCodeWidth * this.qrScale * this.dpr;

      this.QRContext = this.QRCanvas.getContext("2d");
      this.QRContext.scale(this.dpr * this.qrScale, this.dpr * this.qrScale);
      let qrCanv;

      let widthAdjustedOptions = this.qrOptions;
      widthAdjustedOptions.width = widthAdjustedOptions.width * this.qrScale;

      QRCode.toCanvas(this.link, this.qrOptions, (error, canvas) => {
        if (error) console.error(error);
        const frameOffsetX = 60;
        const frameOffsetY = 73;

        qrCanv = canvas;

        this.QRContext.drawImage(
          qrCanv,
          0,
          0,
          this.qrCodeWidth,
          this.qrCodeWidth
        );

        if (!this.qrResized) {
          const leftPosVal =
            parseInt(this.QRCanvas.style.left.split("px")[0]) + frameOffsetX;
          const topPosVal =
            parseInt(this.QRCanvas.style.top.split("px")[0]) + frameOffsetY;
          this.QRCanvas.style.left = leftPosVal.toString() + "px";
          this.QRCanvas.style.top = topPosVal.toString() + "px";
        }

        this.frameAdded = false;
      });
      this.adjustQRAnchors();
    },
    addFrame(frameIndex) {
      const frameWidth = 290;
      const frameHeight = 320;
      this.QRCanvas.style.width = frameWidth * this.qrScale + "px";
      // this.QRCanvas.style.height = frameHeight + 'px';
      console.log("dpi: ", this.dpr);
      this.QRCanvas.width = frameWidth * this.qrScale * this.dpr;
      this.QRCanvas.height = frameHeight * this.qrScale * this.dpr;
      // this.QRCanvas.width = frameWidth;
      // this.QRCanvas.height = frameHeight;

      this.QRContext = this.QRCanvas.getContext("2d");
      this.QRContext.scale(this.dpr * this.qrScale, this.dpr * this.qrScale);

      let frame = document.getElementById("frame-" + frameIndex);
      let qrCanv;
      QRCode.toCanvas(this.link, this.qrOptions, (error, canvas) => {
        if (error) console.error(error);
        const frameOffsetX = 60; // 60
        const frameOffsetY = 78; // 73

        qrCanv = canvas;
        this.QRContext.drawImage(frame, 0, 0, frameWidth, frameHeight);
        this.QRContext.drawImage(
          qrCanv,
          frameOffsetX,
          frameOffsetY,
          this.qrCodeWidth,
          this.qrCodeWidth
        );

        if (!this.frameAdded && !this.qrResized) {
          // First frame
          const leftPosVal = this.posterWidth / 2 - frameWidth / 2;
          const topPosVal = this.posterHeight * 0.3 - frameOffsetY + 10;
          this.QRCanvas.style.left = leftPosVal + "px";
          this.QRCanvas.style.top = topPosVal + "px";
        }
        this.frameAdded = true;
      });
      this.adjustQRAnchors();
    },
    adjustQRAnchors(transX, transY) {
      const anchorWidth = 6;
      let neAnchor = document.getElementById("qr-anchor-ne");
      let nwAnchor = document.getElementById("qr-anchor-nw");
      let seAnchor = document.getElementById("qr-anchor-se");
      let swAnchor = document.getElementById("qr-anchor-sw");

      this.QRCanvas = document.getElementById("poster-qr-canvas");
      let QRStyle = getComputedStyle(this.QRCanvas);
      neAnchor.style.left =
        parseInt(QRStyle.getPropertyValue("left"), 10) - anchorWidth / 2 + "px";
      neAnchor.style.top =
        parseInt(QRStyle.getPropertyValue("top"), 10) - anchorWidth / 2 + "px";

      nwAnchor.style.left =
        parseInt(QRStyle.getPropertyValue("left"), 10) +
        parseInt(QRStyle.getPropertyValue("width"), 10) -
        anchorWidth / 2 +
        "px";
      nwAnchor.style.top =
        parseInt(QRStyle.getPropertyValue("top"), 10) - anchorWidth / 2 + "px";

      seAnchor.style.left =
        parseInt(QRStyle.getPropertyValue("left"), 10) +
        parseInt(QRStyle.getPropertyValue("width"), 10) -
        anchorWidth / 2 +
        "px";
      seAnchor.style.top =
        parseInt(QRStyle.getPropertyValue("top"), 10) +
        parseInt(QRStyle.getPropertyValue("height"), 10) -
        anchorWidth +
        "px";

      swAnchor.style.left =
        parseInt(QRStyle.getPropertyValue("left"), 10) - anchorWidth / 2 + "px";
      swAnchor.style.top =
        parseInt(QRStyle.getPropertyValue("top"), 10) +
        parseInt(QRStyle.getPropertyValue("height"), 10) -
        anchorWidth +
        "px";

      neAnchor.style.webkitTransform = neAnchor.style.transform =
        "translate(" + transX + "px, " + transY + "px)";
      nwAnchor.style.webkitTransform = nwAnchor.style.transform =
        "translate(" + transX + "px, " + transY + "px)";
      seAnchor.style.webkitTransform = seAnchor.style.transform =
        "translate(" + transX + "px, " + transY + "px)";
      swAnchor.style.webkitTransform = swAnchor.style.transform =
        "translate(" + transX + "px, " + transY + "px)";
    },
    checkCenterGuides(x, y, w, h) {
      const centerOffset = 1;
      let centerXPos = x + w / 2;
      const lowerVerticalBound = this.posterWidth / 2 - centerOffset;
      const upperVerticalBound = this.posterWidth / 2 + centerOffset;

      if (centerXPos > lowerVerticalBound && centerXPos < upperVerticalBound) {
        this.showVerticalCenterGuide = true;
      } else {
        this.showVerticalCenterGuide = false;
      }

      let centerYPos = y + h / 2;
      if (
        centerYPos > this.posterHeight / 2 - centerOffset &&
        centerYPos < this.posterHeight / 2 + centerOffset
      ) {
        this.showHorizontalCenterGuide = true;
      } else {
        this.showHorizontalCenterGuide = false;
      }
    },
    checkAddText(e) {
      if (this.currentTool == "text") {
        this.currentIDNumber++;
        var x = e.offsetX - 25;
        var y = e.offsetY - 25;
        this.addText("", x, y);
      }
    },
    addText(string, posX, posY) {
      let newNode = this.cloneableNode.cloneNode(true);
      newNode.childNodes.forEach((child) => {
        child.id = this.currentIDNumber.toString(10);
      });

      newNode.classList.remove("visuallyhidden");
      newNode.style.top = "0px";
      newNode.style.left = "0px";
      newNode.firstChild.value = string;
      document.getElementById("sign-container").appendChild(newNode);

      let target = newNode;
      let x = posX;
      let y = posY;

      target.style.webkitTransform = target.style.transform =
        "translate(" + x + "px, " + y + "px)";
      target.setAttribute("data-x", x);
      target.setAttribute("data-y", y);
      this.addTextEventListeners();
      newNode.firstChild.focus();
    },
    getPixelRatio() {
      var ctx = document.createElement("canvas").getContext("2d"),
        dpr = window.devicePixelRatio || 1,
        bsr =
          ctx.webkitBackingStorePixelRatio ||
          ctx.mozBackingStorePixelRatio ||
          ctx.msBackingStorePixelRatio ||
          ctx.oBackingStorePixelRatio ||
          ctx.backingStorePixelRatio ||
          1;

      return dpr / bsr;
    },
    createHiDPICanvas(w, h) {
      let ratio = this.getPixelRatio();

      let can = document.createElement("canvas");
      can.width = w * ratio;
      can.height = h * ratio;
      can.style.width = w + "px";
      can.style.height = h + "px";
      can.getContext("2d").setTransform(ratio, 0, 0, ratio, 0, 0);
      return can;
    },
    draw() {
      this.textCtx.clearRect(0, 0, this.posterWidth, this.posterHeight); // clear canvas
      this.textElts.forEach((elt) => {
        if (elt != null) {
          this.textCtx.fillStyle = "#000000";

          this.textCtx.font = "bold " + elt.fontSize + "px Arial Narrow";
          this.textCtx.textAlign = "center";
          let xPos = elt.x;
          let yPos = elt.y + elt.yOffset;
          let lines = elt.string.split("\n");
          let lineYPos = yPos;
          let maxWidth = this.textCtx.measureText(lines[0]).width;

          for (let l = 0; l < lines.length; l++) {
            const currentLine = lines[l];
            if (this.textCtx.measureText(currentLine).width > maxWidth) {
              maxWidth = this.textCtx.measureText(currentLine).width;
            }
            this.textCtx.save();
            let deltaWidth = maxWidth - maxWidth / elt.scaleX;
            let deltaHeight =
              lines.length * this.signFontSize -
              (lines.length * this.signFontSize) / elt.scaleX;
            this.textCtx.scale(elt.scaleX, elt.scaleX);
            this.textCtx.translate(deltaWidth / 2, deltaHeight);
            this.textCtx.fillText(
              currentLine,
              xPos / elt.scaleX,
              lineYPos / elt.scaleX
            );
            this.textCtx.restore();
            lineYPos += this.signLineHeight;
          }
          elt.width = maxWidth;
        }
      });

      // Center guides
      if (this.showVerticalCenterGuide) {
        this.textCtx.beginPath();
        this.textCtx.moveTo(this.posterWidth / 2, 0);
        this.textCtx.lineTo(this.posterWidth / 2, this.posterHeight);
        this.textCtx.strokeStyle = "#19b774";
        this.textCtx.stroke();
      }

      if (this.showHorizontalCenterGuide) {
        this.textCtx.beginPath();
        this.textCtx.moveTo(0, this.posterHeight / 2);
        this.textCtx.lineTo(this.posterWidth, this.posterHeight / 2);
        this.textCtx.strokeStyle = "#19b774";
        this.textCtx.stroke();
      }
      window.requestAnimationFrame(this.draw);
    },
    autoExpand(field) {
      field.style.height = "inherit";
      const idNumber = parseInt(field.id);
      const fontSize = this.signFontSize; //34

      let computed = window.getComputedStyle(field);
      let textString = field.value;
      let placeholder = field.classList.contains("placeholder");

      // Calculate width
      let lines = textString.split("\n");
      let maxWidth = 3;
      lines.forEach((line) => {
        if (this.textCtx.measureText(line).width > maxWidth) {
          maxWidth = this.textCtx.measureText(line).width;
        }
      });
      let width = maxWidth + this.textWidthPadding;

      let height = field.offsetHeight * lines.length;
      field.style.height = height + "px";

      // Center
      let leftPosVal = 0;
      let centerPosVal = width / 2;
      if (width >= 0) {
        leftPosVal = parseInt(field.parentNode.getAttribute("data-x"));
      }

      let target = field.parentNode;
      let x = leftPosVal - width / 2;
      let y = (parseFloat(target.getAttribute("data-y")) || 0) + 0; // Nothing

      // Translate the element
      target.style.webkitTransform = target.style.transform =
        "translate(" + x + "px, " + y + "px)";

      let xOffset = 0;
      let yOffset = 0;
      if (field.parentNode.getAttribute("data-x")) {
        xOffset = parseFloat(field.parentNode.getAttribute("data-x"));
      }

      if (field.parentNode.getAttribute("data-y")) {
        yOffset = parseFloat(field.parentNode.getAttribute("data-y"));
      }

      let scaleX = 1;
      let scaleY = 1;
      if (field.parentNode.getAttribute("data-scale-x")) {
        scaleX = parseFloat(field.parentNode.getAttribute("data-scale-x"));
        let newWidth = scaleX * width;
        field.style.width = newWidth + "px";
      } else {
        field.style.width = width + "px";
      }

      if (field.parentNode.getAttribute("data-scale-y")) {
        scaleY = parseFloat(field.parentNode.getAttribute("data-scale-y"));
      }

      let boxWidth = 1;
      let boxHeight = 1;
      if (field.parentNode.getAttribute("data-width")) {
        boxWidth = parseFloat(field.parentNode.getAttribute("data-width"));
      }

      if (field.parentNode.getAttribute("data-height")) {
        boxHeight = parseFloat(field.parentNode.getAttribute("data-height"));
      }

      // Decide text to be rendered
      let newElt = {
        index: idNumber,
        string: textString,
        x: leftPosVal + this.textWidthPadding / 2, // not used
        center: centerPosVal + 17,
        y: field.parentNode.offsetTop + fontSize + fontSize / 3,
        xOffset: xOffset,
        yOffset: yOffset,
        scaleX: scaleX,
        scaleY: scaleY,
        placeholder: placeholder,
        fontSize: fontSize,
        boxWidth: boxWidth,
        boxHeight: boxHeight,
        height: fontSize,
      };
      this.textElts[idNumber] = newElt;

      if (!placeholder) {
        field.parentNode.firstChild.focus();
      }
    },
    initDraggable() {
      let draggables = document.getElementsByClassName("draggable");
      draggables.forEach((elt) => {
        elt.addEventListener("click", () => {
          this.addBorder(elt);
        });
      });

      document
        .getElementById("sign-container")
        .addEventListener("click", (e) => {
          if (e.target.id && e.target.id == "main-canv") {
            if (this.currentTool != "text") {
              draggables.forEach((elt) => {
                this.removeBorder(elt);
              });
            } else {
              this.selectTool("cursor");
            }
          }
        });

      interact(".resizable").resizable({
        edges: { left: true, right: true, bottom: true, top: true },
        listeners: {
          move: (event) => {
            var target = event.target;
            var x = parseFloat(target.getAttribute("data-x")) || 0;
            var y = parseFloat(target.getAttribute("data-y")) || 0;

            this.qrScale = event.rect.width / this.qrOptions.width;

            target.style.width = event.rect.width + "px";

            // translate when resizing from top or left edges
            x += event.deltaRect.left;
            y += event.deltaRect.top;

            target.style.webkitTransform = target.style.transform =
              "translate(" + x + "px," + y + "px)";

            target.setAttribute("data-x", x);
            target.setAttribute("data-y", y);
            this.qrResized = true;
            this.adjustQRAnchors(x, y);
          },
        },
        modifiers: [
          // keep the edges inside the parent
          interact.modifiers.restrictEdges({
            outer: "parent",
          }),

          // minimum size
          interact.modifiers.restrictSize({
            min: { width: 150, height: 150 },
          }),
        ],

        inertia: true,
      });

      interact(".draggable").draggable({
        listeners: {
          start: (event) => {
            let draggables = document.getElementsByClassName("draggable");
            draggables.forEach((elt) => {
              this.removeBorder(elt);
            });
            this.addBorder(event.target);
            "START | document.activeElement: ", document.activeElement;
          },
          move: (event) => {
            var target = event.target;
            var x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
            var y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

            target.style.webkitTransform = target.style.transform =
              "translate(" + x + "px, " + y + "px)";

            target.setAttribute("data-x", x);
            target.setAttribute("data-y", y);

            let computedStyle = getComputedStyle(target);
            const setX =
              parseInt(computedStyle.getPropertyValue("left"), 10) + x;
            const setY =
              parseInt(computedStyle.getPropertyValue("top"), 10) + y;

            if (target.firstChild && target.firstChild.tagName == "TEXTAREA") {
              this.autoExpand(target.firstChild);
              this.checkCenterGuides(
                setX,
                setY,
                22,
                parseInt(computedStyle.getPropertyValue("height"), 10)
              );
            } else {
              this.adjustQRAnchors(x, y);
              this.checkCenterGuides(
                setX,
                setY,
                parseInt(computedStyle.getPropertyValue("width"), 10),
                parseInt(computedStyle.getPropertyValue("height"), 10)
              );
            }
          },
          end: (event) => {
            this.showVerticalCenterGuide = false;
            this.showHorizontalCenterGuide = false;
            "END | document.activeElement: ", document.activeElement;
          },
        },
        modifiers: [
          interact.modifiers.restrictRect({
            restriction: "parent",
          }),
        ],
      });
    },
    selectTool(newTool) {
      if (newTool == "undo") {
        // handle undo
        const canvas = document.getElementById("drawing-canvas");
        let ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, this.posterWidth, this.posterHeight);
      } else {
        this.currentTool = newTool;

        for (let key in this.toolTracker) {
          if (key == newTool) {
            if (this.toolTracker[key]) {
              this.toolTracker[key] = false;
            } else {
              this.toolTracker[key] = true;
            }
          } else {
            this.toolTracker[key] = false;
          }
        }

        if (this.currentTool == "text") {
          document.getElementById("sign-container").style.cursor = "text";
          let draggables = document.getElementsByClassName("draggable");
          draggables.forEach((elt) => {
            this.removeBorder(elt);
          });
        } else {
          document.getElementById("sign-container").style.cursor = "default";
        }
      }
    },
    removeElt(event) {
      let textEltToRemove = this.textElts[event.target.parentNode.id];
      this.textCtx.clearRect(
        textEltToRemove.x,
        textEltToRemove.y + textEltToRemove.yOffset,
        textEltToRemove.width,
        textEltToRemove.string.split("\n") * this.signFontSize
      );

      this.undoStates.push({
        action: "remove",
        elt: event.target.parentNode,
      });

      this.textElts[event.target.parentNode.id] = null;
      event.target.parentNode.parentNode.remove();
    },
    addElt(elt) {
      document.getElementById("sign-container").appendChild(elt);
    },
    downloadJPEG(signImage) {
      var link = document.createElement("a");
      link.href = signImage;
      link.download = "MyScannableSign.jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    downloadPDF(signData) {
      let imgData = signData;
      let pdf = new jsPDF({
        orientation: "p",
        unit: "px",
        format: "letter",
        floatPrecision: "smart",
      });

      pdf.addImage(
        imgData,
        "JPEG",
        0,
        0,
        pdf.internal.pageSize.getWidth(),
        pdf.internal.pageSize.getHeight()
      );
      pdf.save("MyScannableSign.pdf");
    },
  },
};
</script>

<style scoped>
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

.design-container {
  position: relative;
}

/* TOOLS */
#tool-container {
  display: inline-block;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-325px, -50%);
}

.inactive-tool {
  border: 1.3014px solid #202124;
  background: #ffffff;
}

.activeTool {
  background: #19b774;
  border: #19b774;
}

.inactive-tool:hover {
  background: lightgray;
}

.activeTool:hover {
  background: #19b774;
  border: #19b774;
}

.hidden {
  display: none;
}

.tool {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin: 10px;
  display: block;
  position: relative;
}

.tool:focus {
  /* outline: 1px dashed #000; */
  outline: 0px;
  box-shadow: 0 0 0 1pt #19b774;
}

.tool img {
  width: 16px;
  height: auto;
}

.tool-label {
  position: absolute;
  right: 70px;
  top: 50%;
  transform: translate(0, -50%);

  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 125%;
  /* or 22px */

  display: flex;
  align-items: center;
  text-align: right;
  letter-spacing: -0.01em;
  display: none;
}

.tool-label:focus {
  outline: none;
}

.inactive-tool:hover > .tool-label {
  display: none;
}

/* POSTER */
#sign-container {
  width: 480px;
  height: 620px;
  background: #ffffff;
  border: 1.3014px solid #202124;
  box-sizing: border-box;
  position: relative;
  overflow: visible;
  margin: 35px 0px 28px 0px;
  display: inline-block;
}

#sign-texture {
  position: absolute;
  width: 480px;
  height: 620px;
  top: 50%;
  left: 50%;
  transform: translate(-47.5%, -47.5%);
}

canvas {
  position: absolute;
  top: 0;
  left: 0;
}

/* POSTER ELEMENTS */
#poster-qr-canvas {
  position: absolute;
  top: 30%;
}

.qr-anchor {
  width: 6px;
  height: 6px;
  background: #ffffff;
  border: 1.5px solid #19b774;
  position: absolute;
  touch-action: none;
  user-select: none;
  pointer-events: none;
}

#drawing-canvas {
  cursor: pointer;
  top: 0;
  left: 0;
}

.draggable {
  border: 1.5px dashed #19b774;
  box-sizing: border-box;
  padding: 10px;
  width: auto;
  display: inline-block;
}

[contenteditable] {
  outline: 0px solid transparent;
}

.transparent-text {
  -webkit-text-fill-color: transparent;
  /* -webkit-text-fill-color: hotpink; */
}

.text-box {
  position: absolute;
  width: auto;
  height: auto;
  padding-bottom: 0px;
}

.large-text-area {
  font-family: "Archivo Narrow", sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 32px;
  line-height: 43px;
  /* letter-spacing: -0.02em; */
  color: #202124;
  -webkit-user-select: text;
  user-select: text;
  -webkit-transform: translate(0px, 0px);
  transform: translate(0px, 0px);
  text-align: center;
  white-space: pre-line;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  border: none;
  background: none;
  resize: none;
  caret-color: #000;
}

.remove-elt-button {
  position: absolute;
  line-height: 13px;
  top: -8px;
  right: -8px;
  background: none;
  padding: 0px;
}

.remove-elt-button img {
  width: 16px;
  height: 16px;
}

.remove-elt-button:hover {
  transform: scale(1.5);
}

#instructions-text {
  bottom: 10%;
  position: absolute;
  width: auto;
  height: auto;
}

#cta-text {
  top: 70%;
  position: absolute;
  width: auto;
  height: auto;
}

#name-text {
  position: absolute;
  top: 80%;
  width: auto;
  height: auto;
}

.sign-font-M {
  font-style: normal;
  font-weight: bold;
  font-size: 32px;
  line-height: 43px;
}

.sign-font-L {
  font-style: normal;
  font-weight: bold;
  font-size: 64px;
  line-height: 120%;
}

.frames-container {
  display: flex;
  flex-wrap: wrap;
  width: 15vw;
  max-width: 250px;
  position: absolute;
  top: -125%;
  right: 90px;
  border: 1px solid black;
}

.frame-wrapper button {
  background: none;
  margin: 0px;
  font-size: 0px;
  border-radius: 0px;
  padding: 1px;
}

.frame-wrapper button:focus {
  outline: 0px;
  box-shadow: 0 0 0 1pt #19b774;
}

.frame-wrapper {
  width: 27%;
  padding: 3%;
  z-index: 999999;
}

.frame-wrapper img {
  width: 100%;
  height: 100%;
}

/* EXPORT */
.export-container {
  margin-bottom: 50px;
  margin-top: 100px;
}

#final-sign-container {
  text-align: right;
  margin-left: 3%;
}

#final-sign-container img {
  width: 100%;
  height: auto;
}

#export-info-container {
  text-align: left;
  margin-right: 3%;
}

.half-page {
  display: inline-block;
  width: 47%;
  vertical-align: text-top;
}

.download-container {
  margin-top: 26px;
}

.download-option,
.download-button {
  font-family: "Source Code Pro", monospace;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #202124;
}

.download-option {
  padding: 15px 0px;
  border-bottom: 1px dashed;
}

.download-button {
  background: none;
  border-bottom: 1px solid;
  float: right;
  text-align: right;
  text-transform: uppercase;
  color: #19b774;
  padding: 0px;
  margin: 0px 5px;
}

.download-button-container {
  float: right;
}

.download-button-container img {
  width: 18px;
  padding-top: 1px;
}

.share-container {
  margin-top: 70px;
}

.share-button {
  text-decoration: none;
  color: #202124;
  padding: 11px 18px;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;
  border: 2px solid #202124;
  box-sizing: border-box;
  border-radius: 4px;
  display: inline-block;
  margin-right: 21px;
}

.share-button:hover {
  color: #19b774;
  border: 2px solid #19b774;
  box-sizing: border-box;
  border-radius: 4px;
}
</style>
