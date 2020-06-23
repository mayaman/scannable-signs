<template>
  <div class="container">
    <div v-show="state != 2" class="design-container">
      <div id="tool-container">
        <button
          @click="selectTool('cursor')"
          v-bind:class="{ activeTool: toolTracker.cursor }"
          class="tool light-gray-background"
        >
          <img src="../assets/tools/cursor.png" alt />
        </button>
        <button
          @click="selectTool('text')"
          v-bind:class="{ activeTool: toolTracker.text }"
          class="tool light-gray-background"
        >
          <img src="../assets/tools/text.png" alt />
        </button>
        <button
          @click="selectTool('pen')"
          v-bind:class="{ activeTool: toolTracker.pen }"
          class="tool light-gray-background"
        >
          <img src="../assets/tools/pen.png" alt />
        </button>
        <button
          @click="selectTool('undo')"
          v-bind:class="{ activeTool: toolTracker.undo }"
          class="tool light-gray-background"
        >
          <img src="../assets/tools/undo.png" alt />
        </button>
      </div>

      <section id="sign-container">
        <canvas id="drawing-canvas" width="537" height="694.08"></canvas>
        <div
          id="instructions-text"
          class="draggable large-text-area centered sign-font-M"
          contenteditable="true"
        >
          Point your phone's
          <br />camera here:
          <button
            @click="removeElt($event)"
            contenteditable="false"
            class="remove-elt-button"
          >x</button>
        </div>

        <div
          id="cta-text"
          class="draggable large-text-area centered sign-font-M"
          contenteditable="true"
        >
          to check out our menu!
          <button
            @click="removeElt($event)"
            contenteditable="false"
            class="remove-elt-button"
          >x</button>
        </div>

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
          >x</button>
        </div>
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
        pen: false,
        undo: false
      },
      firstQRMove: true,
      signData: null,
      signImage: null
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
    state: function(newState) {
      if (newState == 1) {
        // Center things
        let textDivs = document.getElementsByClassName("centered");
        textDivs.forEach(div => {
          const divWidth = div.clientWidth;
          const leftPosVal = this.posterWidth / 2 - divWidth / 2;
          div.style = "left: " + leftPosVal + "px";
        });
      } else if (newState == 2) {
        // Remove border for export
        let draggables = document.getElementsByClassName("draggable");
        draggables.forEach(elt => {
          elt.style.border = "none";
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

          document
            .getElementById("final-sign-container")
            .appendChild(this.signImage);
        });
      }
    }
  },
  created() {},
  mounted() {
    const canvas = document.getElementById("drawing-canvas");
    let ctx = canvas.getContext("2d");

    interact(".draggable").draggable({
      listeners: {
        start: event => {
          if (this.currentTool == "cursor") {
            event.target.style.border = "1.5px dashed #202124";
            console.log(
              "START | document.activeElement: ",
              document.activeElement
            );
          }
        },
        move: event => {
          if (this.currentTool == "cursor") {
            var target = event.target;
            // keep the dragged position in the data-x/data-y attributes
            var x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
            var y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

            // translate the element
            target.style.webkitTransform = target.style.transform =
              "translate(" + x + "px, " + y + "px)";

            // update the posiion attributes
            target.setAttribute("data-x", x);
            target.setAttribute("data-y", y);

            // console.log(
            //   "MOVE | document.activeElement: ",
            //   document.activeElement
            // );
          }
        },
        end: event => {
          if (this.currentTool == "cursor") {
            event.target.style.border = "1.5px dashed #202124";
          }
          console.log("END | document.activeElement: ", document.activeElement);
        }
      },
      modifiers: [
        interact.modifiers.restrictRect({
          restriction: "parent"
        })
      ]
    });

    // Drawable canvas
    // Mousedown
    canvas.addEventListener("mousedown", e => {
      if (this.currentTool == "pen") {
        console.log("mouse down!");
        let mousePos = this.getMousePos(canvas, e);
        this.pMouseX = this.mouseX = parseInt(mousePos.x);
        this.pMouseY = this.mouseY = parseInt(mousePos.y);
        this.mouseDown = true;
      }
    });

    // Mouseup
    canvas.addEventListener("mouseup", () => {
      if (this.currentTool == "pen") {
        this.mouseDown = false;
      }
    });

    // Mouse Move
    canvas.addEventListener("mousemove", e => {
      if (this.currentTool == "pen") {
        let mousePos = this.getMousePos(canvas, e);
        this.mouseX = parseInt(mousePos.x);
        this.mouseY = parseInt(mousePos.y);
        if (this.mouseDown) {
          ctx.beginPath();
          ctx.strokeStyle = "#000000FF";
          ctx.lineWidth = 2;
          ctx.lineJoin = "round";
          ctx.lineCap = "round";
          ctx.moveTo(this.pMouseX + 0.5, this.pMouseY);
          ctx.lineTo(this.mouseX + 0.5, this.mouseY);
          ctx.closePath();
          ctx.stroke();
        }
        this.pMouseX = this.mouseX;
        this.pMouseY = this.mouseY;
      }
    });
  },
  methods: {
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
      }
    },
    removeElt(event) {
      console.log("clicked!");
      console.log(event.target.parentNode);
      event.target.parentNode.remove();
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

.activeTool {
  background: #19b774;
}

.tool {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: none;
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

.draggable {
  touch-action: none;
  user-select: none;
  border: 1.5px dashed #202124;
  box-sizing: border-box;
  padding: 10px;
}

[contenteditable] {
  outline: 0px solid transparent;
}

.large-text-area {
  font-family: "Arial Narrow";
  font-style: normal;
  font-weight: bold;
  font-size: 34px;
  line-height: 100%;
  letter-spacing: -0.02em;

  width: 50%;
  height: 100px;
  color: #202124;
  touch-action: none;
  user-select: none;
  -webkit-transform: translate(0px, 0px);
  transform: translate(0px, 0px);
  text-align: center;
  white-space: pre-line;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  padding: 8px 34px;
}

.remove-elt-button {
  background: #202124;
  color: white;
  width: 14px;
  height: 14px;
  border-radius: 7px;
  font-size: 14px;
  vertical-align: text-top;
  position: absolute;
  line-height: 13px;
  top: -7px;
  right: -7px;
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
  letter-spacing: -0.02em;
}

.sign-font-L {
  font-style: normal;
  font-weight: bold;
  font-size: 64px;
  line-height: 120%;
  letter-spacing: -0.03em;
}

/* EXPORT */
.export-container {
  margin-bottom: 50px;
}

#final-sign-container {
  text-align: right;
}

#export-info-container {
  text-align: left;
}

.half-page {
  display: inline-block;
  width: 50%;
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
