<template>
  <div class="container">
    <div v-show="state != 2" class="design-container">
      <div id="tool-container">
        <button
          @click="selectTool('cursor')"
          v-bind:class="{ activeTool: toolTracker.cursor }"
          class="tool inactive-tool"
        >
          <img src="../assets/tools/cursor.png" alt />
        </button>
        <button
          @click="selectTool('text')"
          v-bind:class="{ activeTool: toolTracker.text }"
          class="tool inactive-tool"
        >
          <img src="../assets/tools/text.png" alt />
        </button>
        <button
          @click="selectTool('sticker')"
          v-bind:class="{ activeTool: toolTracker.sticker }"
          class="tool inactive-tool"
        >
          <img src="../assets/tools/sticker.png" alt />
        </button>
        <button
          @click="selectTool('undo')"
          v-bind:class="{ activeTool: toolTracker.undo }"
          class="tool inactive-tool"
        >
          <img src="../assets/tools/undo.png" alt />
        </button>
      </div>

      <section id="sign-container" @click="checkAddText()">
        <!-- <canvas id="drawing-canvas" width="537" height="694.08"></canvas> -->
        <!-- <canvas id="text-canvas" width="3222" height="4164.48"></canvas> -->
        <div id="instructions-text" class="draggable centered">
          <textarea
            rows="1"
            style="height:1em;"
            class="large-text-area sign-font-M"
            id="0"
            contenteditable="true"
          >
          Point phone here:
        </textarea>
          <button
            id="0"
            @click="removeElt($event)"
            contenteditable="false"
            class="remove-elt-button"
          >
            <img src="../assets/icons/x.png" alt />
          </button>
        </div>
        <!-- <div
          id="cta-text"
          class="draggable large-text-area centered sign-font-M"
          contenteditable="true"
        >
          to check out our menu!
          <button
            @click="removeElt($event)"
            contenteditable="false"
            class="remove-elt-button"
          >
            <img src="../assets/icons/x.png" alt />
          </button>
        </div>-->
        <!-- 
        <div
          id="name-text"
          class="draggable large-text-area centered sign-font-L"
          contenteditable="true"
        >
          Business Name
          <button
            @click="removeElt($event)"
            contenteditable="false"
            class="remove-elt-button"
          >
            <img src="../assets/icons/x.png" alt />
          </button>
        </div>-->
        <canvas class="draggable centered" id="poster-qr-canvas"></canvas>
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
            <span>JPG</span>
            <button @click="downloadJPEG(signData)" class="download-button">download</button>
          </div>
          <div class="download-option">
            <span>PDF</span>
            <button @click="downloadPDF(signData)" class="download-button">download</button>
          </div>
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

export default {
  name: "poster",
  props: {
    link: String,
    state: Number
  },
  data() {
    return {
      posterWidth: 537, // 425
      posterHeight: 694.08, // 550
      qrCodeWidth: 200,
      pMouseX: 0,
      pMouseY: 0,
      mouseX: 0,
      mouseY: 0,
      mouseDown: false,
      tooltype: "draw",
      finalPoster: null,
      currentTool: "cursor",
      toolTracker: {
        cursor: true,
        text: false,
        sticker: false,
        undo: false
      },
      firstQRMove: true,
      signData: null,
      signImage: null,
      savedSignElements: [],
      textCanvas: null,
      textCtx: null,
      textElts: [],
      cloneableNode: null,
      textIndex: 1
    };
  },
  computed: {
    toolClassObject: function() {
      return {};
    }
  },
  watch: {
    link: function(newLink) {
      let qrOptions = {
        width: this.qrCodeWidth,
        scale: 4,
        margin: 0,
        color: {
          dark: "#000000ff",
          light: "#ffffffff"
        }
      };
      let QRCanvas = document.getElementById("poster-qr-canvas");

      QRCode.toCanvas(QRCanvas, newLink, qrOptions, function(error) {
        if (error) console.error(error);
      });

      const leftPosVal = this.posterWidth / 2 - this.qrCodeWidth / 2;
      QRCanvas.style = "left: " + leftPosVal + "px";
    },
    state: function(newState, oldState) {
      console.log("new state: ", newState);
      console.log("old state: ", oldState);
      if (newState == 1 && oldState == 0) {
        // Moving forward
        if (this.savedSignElements.length >= 0) {
          this.savedSignElements.innerHTML = "";
          // this.savedSignElements.forEach(elt => {
          //   document.querySelector("#sign-container").appendChild(elt);
          // });
          this.initDraggable();
        }

        // Center Elements
        let initialSignElts = document.getElementsByClassName("centered");
        initialSignElts.forEach(div => {
          const divWidth = div.offsetWidth;
          if (divWidth >= 0) {
            const leftPosVal = this.posterWidth / 2 - divWidth / 2;
            div.style = "left: " + leftPosVal + "px";
          }
        });

        let textDivs = document.getElementsByClassName("large-text-area");
        textDivs.forEach(div => {
          // Add focus listener
          div.addEventListener("focus", e => {
            e.target.innerText = "";
            this.autoExpand(e.target);
          });

          div.addEventListener("input", e => {
            // Setting style to nothing
            e.target.classList.add("transparent-text");
            this.autoExpand(e.target);
          });
        });

        // add x button again
        let xes = document.getElementsByClassName("remove-elt-button");
        xes.forEach(elt => {
          elt.style.display = "block";
        });
      } else if (newState == 1 && oldState == 2) {
        // Going back to poster
        if (this.savedSignElements.length >= 0) {
          this.savedSignElements.innerHTML = "";
          this.savedSignElements.forEach(elt => {
            document.querySelector("#sign-container").appendChild(elt);
          });
          this.initDraggable();
        }

        // Add text div listeners
        let textDivs = document.getElementsByClassName("large-text-area");
        textDivs.forEach(div => {
          // Add focus listener
          div.addEventListener("focus", e => {
            e.target.innerText = "";
            this.autoExpand(e.target);
          });

          div.addEventListener("input", e => {
            // Setting style to nothing
            e.target.classList.add("transparent-text");
            this.autoExpand(e.target);
          });
        });

        // add x button again
        let xes = document.getElementsByClassName("remove-elt-button");
        xes.forEach(elt => {
          elt.style.display = "block";
        });

        // Add border back
        let draggables = document.getElementsByClassName("draggable");
        draggables.forEach(elt => {
          elt.style.border = "1.5px dashed #202124";
        });

        // Add color back
        let textAreas = document.getElementsByClassName("large-text-area");
        textAreas.forEach(elt => {
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
        draggables.forEach(elt => {
          elt.style.border = "none";
        });

        // Remove x button for export
        let xes = document.getElementsByClassName("remove-elt-button");
        xes.forEach(elt => {
          elt.style.display = "none";
        });

        let textAreas = document.getElementsByClassName("large-text-area");
        textAreas.forEach(elt => {
          elt.style.color = "#00000000";
        });

        html2canvas(document.querySelector("#sign-container"), {
          width: this.posterWidth,
          height: this.posterHeight,
          scrollY: window.scrollY * -1
        }).then(canvas => {
          this.finalPoster = canvas;

          this.signData = this.finalPoster.toDataURL("image/jpeg", 1.0);
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
    }
  },
  updated() {
    this.$nextTick(function() {});
  },
  created() {},
  mounted() {
    this.initDraggable();

    this.cloneableNode = document
      .getElementById("instructions-text")
      .cloneNode(true);
    console.log(this.cloneableNode);

    // Create canvas for text
    this.textCanvas = this.createHiDPICanvas(
      this.posterWidth,
      this.posterHeight
    );
    document.getElementById("sign-container").appendChild(this.textCanvas);
    this.textCanvas.style.width = this.posterWidth;
    this.textCanvas.style.height = this.posterHeight;
    this.textCtx = this.textCanvas.getContext("2d");

    window.requestAnimationFrame(this.draw);
  },
  methods: {
    checkAddText() {
      if (this.currentTool == "text") {
        // TODO: Fix this
        let newNode = this.cloneableNode.cloneNode(true);
        document.getElementById("sign-container").appendChild(newNode);
      }
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

      this.textElts.forEach(elt => {
        this.textCtx.font = "bold 34px Arial Narrow";
        this.textCtx.textAlign = "center";
        let xPos = elt.center + elt.xOffset;
        let yPos = elt.y + elt.yOffset;
        let lines = elt.string.split("\n");
        let lineYPos = yPos;
        let maxWidth = this.textCtx.measureText(lines[0]).width;

        for (let l = 0; l < lines.length; l++) {
          const currentLine = lines[l];
          if (this.textCtx.measureText(currentLine).width > maxWidth) {
            maxWidth = this.textCtx.measureText(currentLine).width;
          }
          this.textCtx.fillText(currentLine, xPos, lineYPos);
          lineYPos += 34;
        }
        elt.width = maxWidth;
      });

      window.requestAnimationFrame(this.draw);
    },
    autoExpand(field) {
      field.style.height = "inherit";
      const idNumber = parseInt(field.id);
      const fontSize = 34;

      let computed = window.getComputedStyle(field);

      // Calculate the height
      let height =
        // parseInt(computed.getPropertyValue("border-top-width"), 10) +
        // parseInt(computed.getPropertyValue("padding-top"), 10) +
        field.scrollHeight +
        // parseInt(computed.getPropertyValue("padding-bottom"), 10) +
        parseInt(computed.getPropertyValue("border-bottom-width"), 10);

      field.style.height = height + "px";

      // Handle text positioning and rendering
      let textString = field.value;

      // Calculate number of rows
      let lines = textString.split("\n");
      let maxWidth = 3;
      lines.forEach(line => {
        if (this.textCtx.measureText(line).width > maxWidth) {
          maxWidth = this.textCtx.measureText(line).width;
        }
      });
      let width = maxWidth + 25;
      field.style.width = width + "px";

      // Center
      const divWidth = width;
      let leftPosVal = 0;
      let centerPosVal = 0;
      if (divWidth >= 0) {
        leftPosVal = this.posterWidth / 2 - divWidth / 2 - 10;
        centerPosVal = leftPosVal + divWidth / 2;
        field.parentNode.style.left = leftPosVal + "px";
      }

      let xOffset = 0;
      let yOffset = 0;

      if (field.parentNode.getAttribute("data-x")) {
        xOffset = parseInt(field.parentNode.getAttribute("data-x"));
      }

      if (field.parentNode.getAttribute("data-y")) {
        yOffset = parseInt(field.parentNode.getAttribute("data-y"));
      }

      // Decide text to be rendered
      let newElt = {
        index: idNumber,
        string: textString,
        x: leftPosVal + 25,
        center: centerPosVal + 15,
        y: field.parentNode.offsetTop + fontSize + fontSize / 4,
        xOffset: xOffset,
        yOffset: yOffset
      };
      this.textElts[idNumber] = newElt;
    },
    initDraggable() {
      interact(".draggable").draggable({
        listeners: {
          start: event => {
            if (this.currentTool == "cursor") {
              event.target.style.border = "1.5px dashed #202124";
              "START | document.activeElement: ", document.activeElement;
            }
          },
          move: event => {
            if (this.currentTool == "cursor") {
              var target = event.target;
              // keep the dragged position in the data-x/data-y attributes
              var x =
                (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
              var y =
                (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

              // translate the element
              target.style.webkitTransform = target.style.transform =
                "translate(" + x + "px, " + y + "px)";

              // update the posiion attributes
              target.setAttribute("data-x", x);
              target.setAttribute("data-y", y);

              // TODO: Do not do this for QR code
              if (
                event.target.firstChild &&
                event.target.firstChild.tagName == "TEXTAREA"
              ) {
                this.autoExpand(event.target.firstChild);
              }
            }
          },
          end: event => {
            if (this.currentTool == "cursor") {
              event.target.style.border = "1.5px dashed #202124";
            }
            "END | document.activeElement: ", document.activeElement;
          }
        },
        modifiers: [
          interact.modifiers.restrictRect({
            restriction: "parent"
          })
        ]
      });
    },
    getMousePos(canvas, e) {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width; // relationship bitmap vs. element for X
      const scaleY = canvas.height / rect.height; // relationship bitmap vs. element for Y
      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY
      };
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
            this.toolTracker[key] = true;
          } else {
            this.toolTracker[key] = false;
          }
        }

        if (this.currentTool == "text") {
          console.log("text tool");
          document.getElementById("sign-container").style.cursor = "text";
        } else {
          document.getElementById("sign-container").style.cursor = "default";
        }
      }
    },
    removeElt(event) {
      // console.log("event.target.parentNode: ", event.target.parentNode);
      // console.log("PARENT PARENT: ", event.target.parentNode.parentNode);
      // console.log("id? ", event.target.parentNode.id);

      this.textElts.splice(event.target.parentNode.id, 1);
      event.target.parentNode.parentNode.remove();
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
        floatPrecision: "smart"
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
    }
  }
};
</script>

<style scoped>
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

.design-container {
  position: relative;
}

/* TOOLS */
#tool-container {
  display: inline-block;
  position: absolute;
  left: 15%;
  top: 50%;
  transform: translate(0px, -50%);
}

.inactive-tool {
  border: 1.3014px solid #202124;
  background: #ffffff;
}

.activeTool {
  background: #19b774;
  border: #19b774;
}

.tool {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin: 10px;
  display: block;
}

.tool img {
  width: 20px;
  height: 20px;
}

.tool:hover {
  background: #19b774;
}

/* POSTER */

#sign-container {
  width: 537px;
  height: 694.08px;
  background: #ffffff;
  /* box-shadow: 2px 2px 5px rgba(0, 0, 50, 0.1);
  border: 1px solid #f0f0f0; */
  border: 1.3014px solid #202124;
  box-sizing: border-box;
  position: relative;
  overflow: visible;
  margin: 50px 0px;
  display: inline-block;
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
  /* -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%); */
}

#drawing-canvas {
  cursor: pointer;
  top: 0;
  left: 0;
}

.centered {
  width: auto;
}

.draggable {
  touch-action: none;
  user-select: none;
  border: 1.5px dashed #202124;
  box-sizing: border-box;
  padding: 10px;

  display: inline-block;
  width: auto;
}

[contenteditable] {
  outline: 0px solid transparent;
}

.transparent-text {
  -webkit-text-fill-color: transparent;
}

.large-text-area {
  font-family: "Arial Narrow";
  font-style: normal;
  font-weight: bold;
  font-size: 34px;
  line-height: 100%;
  /* letter-spacing: -0.02em; */

  color: #202124;
  touch-action: none;
  user-select: none;
  -webkit-transform: translate(0px, 0px);
  transform: translate(0px, 0px);
  text-align: center;
  white-space: pre-line;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  border: none;
  background: none;
  resize: none;
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
  position: absolute;
  top: 15%;
  width: auto;
  height: auto;
}

#cta-text {
  position: absolute;
  top: 65%;
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
  font-size: 34px;
  line-height: 100%;
  /* letter-spacing: -0.02em; */
}

.sign-font-L {
  font-style: normal;
  font-weight: bold;
  font-size: 64px;
  line-height: 120%;
  /* letter-spacing: -0.03em; */
}

/* EXPORT */
.export-container {
  margin-bottom: 50px;
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

.download-option,
.download-button {
  font-family: "Source Code Pro", monospace;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 25px;
  letter-spacing: 0.2em;
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
  padding: 0px;
}
</style>
