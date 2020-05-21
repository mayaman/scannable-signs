<template>
  <div class="container">
    <div class="header">
      <h1 class="step-title">1. GENERATE SCANNABLE CODE</h1>
      <h1 class="step-title active-title">2. CREATE YOUR SIGN</h1>
    </div>
    <div class="box-container">
      <section id="poster">
        <canvas id="poster-qr-canvas"></canvas>
        <canvas id="drawing-canvas" width="425" height="550"></canvas>
      </section>
    </div>
    <div class="footer">
      <button id="next-button" @click="downloadPDF">DOWNLOAD PDF</button>
    </div>
  </div>
</template>

<script>
// import Draggable from "@shopify/draggable";
import QRCode from "qrcode";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

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
      finalPoster: null
    };
  },
  watch: {
    link: function(newLink) {
      let qrOptions = {
        width: 200,
        scale: 4,
        color: {
          dark: "#000000ff",
          light: "#ffffff00"
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
    const canvas = document.getElementById("drawing-canvas");
    let ctx = canvas.getContext("2d");
    // ctx.fillStyle = "#FF0000";
    // ctx.fillRect(0, 0, 150, 75);

    // Mousedown
    canvas.addEventListener("mousedown", e => {
      console.log("mouse down!");
      let mousePos = this.getMousePos(canvas, e);
      this.pMouseX = this.mouseX = parseInt(mousePos.x);
      this.pMouseY = this.mouseY = parseInt(mousePos.y);
      this.mouseDown = true;
    });

    // Mouseup
    canvas.addEventListener("mouseup", e => {
      console.log("mouse up!");
      this.mouseDown = false;
    });

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

        pdf.addImage(imgData, "JPEG", 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
        pdf.save("download.pdf");
      });
    }
  }
};
</script>

<style scoped>
#drawing-canvas {
  cursor: pointer;
  top: 0;
  left: 0;
}

canvas {
  position: absolute;
}

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
#poster {
  background: #ffffff;
  box-shadow: 2px 2px 5px rgba(0, 0, 50, 0.1);
  border: 1px solid #f0f0f0;
  width: 425px;
  height: 550px;
  position: relative;
  overflow: visible;
  margin: 20px auto;
  /* img{
		width: $imgW;
		height: auto;
		position: absolute;
		mix-blend-mode:darken;
		opacity:0.9;
		&.cuts{
			left:$imgW *-1.2;
		}
		&.photo{
			right: $imgW * -1.2;
		}
		&:nth-child(2){
			top:40%;
		}
		&:nth-child(5){
			top:27%;
		}
		&:nth-child(3),&:nth-child(6){
			bottom:0;
		}		
		
	} */
}
</style>
