<template>
  <div class="container">
    <div class="header">
      <h1 class="step-title">1. GENERATE SCANNABLE CODE</h1>
      <h1 class="step-title active-title">2. CREATE YOUR SIGN</h1>
    </div>
    <div class="box-container">
      <div id="tool-container">
        <button
          @click="selectTool('cursor')"
          v-bind:class="{ active: isActive }"
          class="tool light-gray-background"
        >
          <img src="../assets/tools/cursor.png" alt />
        </button>
        <button @click="selectTool('text')" class="tool light-gray-background">
          <img src="../assets/tools/text.png" alt />
        </button>
        <button @click="selectTool('pen')" class="tool light-gray-background">
          <img src="../assets/tools/pen.png" alt />
        </button>
      </div>
      <section id="poster">
        <canvas id="drawing-canvas" width="425" height="550"></canvas>
        <input id="drag-div" class="draggable" type="text" placeholder="YOUR BUSINESS NAME HERE" />
        <canvas class="draggable" id="poster-qr-canvas"></canvas>
      </section>
    </div>
    <div class="footer">
      <button id="next-button" @click="downloadPDF">DOWNLOAD PDF</button>
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
  name: "Create",
  props: {
    link: String
  },
  data() {
    return {
      posterWidth: 425,
      posterHeight: 550,
      pMouseX: 0,
      pMouseY: 0,
      mouseX: 0,
      mouseY: 0,
      mouseDown: false,
      tooltype: "draw",
      finalPoster: null,
      currentTool: "cursor"
    };
  },
  computed: {
    classObject: function() {
      return {
        active: this.isActive && !this.error,
        "text-danger": this.error && this.error.type === "fatal"
      };
    }
  },
  watch: {
    link: function(newLink) {
      let qrOptions = {
        width: 100,
        scale: 4,
        margin: 0,
        color: {
          dark: "#000000ff",
          light: "#ffffffff"
        }
      };

      QRCode.toCanvas(
        document.getElementById("poster-qr-canvas"),
        newLink,
        qrOptions,
        function(error) {
          if (error) console.error(error);
          console.log("success!");
        }
      );
    }
  },
  mounted() {
    const testLink = "test";
    let qrOptions = {
      width: 100,
      scale: 4,
      margin: 0,
      color: {
        dark: "#000000ff",
        light: "#ffffffff"
      }
    };

    QRCode.toCanvas(
      document.getElementById("poster-qr-canvas"),
      testLink,
      qrOptions,
      function(error) {
        if (error) console.error(error);
        console.log("success!");
      }
    );

    const canvas = document.getElementById("drawing-canvas");
    let ctx = canvas.getContext("2d");

    const position = { x: 0, y: 0 };

    interact(".draggable").draggable({
      //   inertia: true,
      listeners: {
        start(event) {
          console.log(event.type, event.target);
          event.target.style.border = "3px solid #c7ff2b";
          event.target.style.borderRadius = "2px";
        },
        move(event) {
          //   position.x += event.dx;
          //   position.y += event.dy;

          //   event.target.style.transform = `translate(${position.x}px, ${position.y}px)`;
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
        },
        end(event) {
          event.target.style.border = "3px solid white";
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
      console.log("mouse down!");
      let mousePos = this.getMousePos(canvas, e);
      this.pMouseX = this.mouseX = parseInt(mousePos.x);
      this.pMouseY = this.mouseY = parseInt(mousePos.y);
      this.mouseDown = true;
    });

    // Mouseup
    canvas.addEventListener("mouseup", () => {
      console.log("mouse up: ");
      this.mouseDown = false;
    });

    // Mouse Move
    canvas.addEventListener("mousemove", e => {
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
      this.currentTool = newTool;
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

/* TOOLS */
#tool-container {
  display: inline-block;
  position: absolute;
  left: 25%;
  top: 50%;
  transform: translate(0, -50%);
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
  background: #c08afbff;
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
  left: 40%;
  top: 40%;
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
  /* border: 3px solid white;
  border-radius: 2px; */
}

#drag-div {
  width: 50%;
  font-size: 12px;
  color: black;
  border: 3px solid white;
  border-radius: 0.75em;
  padding: 5px;
  margin: 25px;
  touch-action: none;
  user-select: none;
  -webkit-transform: translate(0px, 0px);
  transform: translate(0px, 0px);
  text-align: center;
}
</style>
