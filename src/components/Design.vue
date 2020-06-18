<template>
  <div class="container">
    <div class="box-container">
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
      <section id="poster">
        <canvas id="drawing-canvas" width="425" height="550"></canvas>
        <!-- <textarea
          id
          class="draggable large-text-area"
          type="text"
          placeholder="YOUR BUSINESS NAME HERE"
        ></textarea>-->
        <!-- <textarea name id class="draggable large-text-area" cols="30" rows="10">testing my biz name out here!!!!</textarea> -->
        <div
          id="instructions-text"
          class="draggable large-text-area"
          contenteditable="true"
        >Point your phone camera here to scan</div>

        <div
          id="name-text"
          class="draggable large-text-area"
          contenteditable="true"
        >BUSINESS NAME</div>
        <canvas class="draggable" id="poster-qr-canvas"></canvas>
      </section>
    </div>
  </div>
</template>

<script>
// import { Draggable } from "@shopify/draggable";
import QRCode from "qrcode";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import interact from "interactjs";

export default {
  name: "poster",
  props: {
    link: String,
    state: String
  },
  data() {
    return {
      posterWidth: 425,
      posterHeight: 550,
      qrCodeWidth: 100,
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
      firstQRMove: true
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
        console.log("success!");
      });

      const leftPosVal = this.posterWidth / 2 - this.qrCodeWidth / 2;
      QRCanvas.style = "left: " + leftPosVal + "px";
    },
    state: function(newState) {
      if (newState == "create") {
        // Center things
        let textDivs = document.getElementsByClassName("large-text-area");
        textDivs.forEach(div => {
          const divWidth = div.clientWidth;
          console.log("divWidth: ", divWidth);
          const leftPosVal = this.posterWidth / 2 - divWidth / 2;
          div.style = "left: " + leftPosVal + "px";
        });
      }
    }
  },
  mounted() {
    // const testLink = "test";
    // let qrOptions = {
    //   width: this.qrCodeWidth,
    //   scale: 4,
    //   margin: 0,
    //   color: {
    //     dark: "#000000ff",
    //     light: "#ffffffff"
    //   }
    // };
    // let QRCanvas = document.getElementById("poster-qr-canvas");

    // QRCode.toCanvas(QRCanvas, testLink, qrOptions, function(error) {
    //   if (error) console.error(error);
    //   console.log("success!");
    // });

    // const leftPosVal = this.posterWidth / 2 - this.qrCodeWidth / 2;
    // QRCanvas.style = "left: " + leftPosVal + "px";

    // // Center things
    // let textDivs = document.getElementsByClassName("large-text-area");
    // textDivs.forEach(div => {
    //   const divWidth = div.clientWidth;
    //   const leftPosVal = this.posterWidth / 2 - divWidth / 2;
    //   div.style = "left: " + leftPosVal + "px";
    // });

    const canvas = document.getElementById("drawing-canvas");
    let ctx = canvas.getContext("2d");

    interact(".draggable").draggable({
      listeners: {
        start: event => {
          if (this.currentTool == "cursor") {
            event.target.style.border = "3px solid #c7ff2b";
            event.target.style.borderRadius = "2px";
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
          }
        },
        end: event => {
          if (this.currentTool == "cursor") {
            event.target.style.border = "3px solid #ffffff00";
          }
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
          console.log("trying to draw");
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
      console.log("updating tool: ", this.currentTool);
    },
    downloadPDF() {
      console.log("donwloading poster attmpet");

      // Preview as single canvas
      html2canvas(document.querySelector("#poster")).then(canvas => {
        // canvas.width = this.posterWidth;
        // canvas.height = this.posterHeight;

        this.finalPoster = canvas;
        // document.body.appendChild(this.finalPoster);
        // Download as PDF
        // only jpeg is supported by jsPDF
        let imgData = this.finalPoster.toDataURL("image/jpeg", 1.0);
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
        pdf.save("download.pdf");
      });
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

/* TOOLS */
#tool-container {
  display: inline-block;
  position: absolute;
  left: 25%;
  top: 50%;
  transform: translate(0, -50%);
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
.box-container {
  grid-column-start: 2;
  grid-column-end: 5;
  grid-row-start: 2;
  grid-row-end: 3;
}

#poster {
  background: #ffffff;
  box-shadow: 2px 2px 5px rgba(0, 0, 50, 0.1);
  border: 1px solid #f0f0f0;
  width: 425px;
  height: 550px;
  position: relative;
  overflow: visible;
  margin: 20px auto;
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
}

.large-text-area {
  width: 50%;
  height: 100px;
  color: black;
  border: 3px solid #ffffff00;
  border-radius: 0.75em;
  touch-action: none;
  user-select: none;
  -webkit-transform: translate(0px, 0px);
  transform: translate(0px, 0px);
  text-align: center;
  white-space: pre-line;
  white-space: pre-wrap;
  overflow-wrap: break-word;
}

#instructions-text {
  font-size: 18px;
  position: absolute;
  top: 15%;
  width: auto;
  height: auto;
}

#name-text {
  font-size: 42px;
  position: absolute;
  top: 65%;
  width: auto;
  height: auto;
}
</style>
