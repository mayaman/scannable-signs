<template>
  <div class="container">
    <div class="box-container">
      <section id="poster"></section>
    </div>
  </div>
</template>

<script>
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default {
  name: "export",
  props: {
    signData: String
  },
  data() {
    return {
      posterWidth: 537, // 425
      posterHeight: 694.08 // 550
    };
  },
  computed: {},
  watch: {
    signData(imgData) {

      var image = new Image();
      image.src = this.signData;
      document.body.appendChild(image);

      // ("trying to append thing");
      // document.getElementById("poster").appendChild(newCanvas);
      // // document.getElementById("box-container").appendChild(newCanvas);
      // document.body.appendChild(newCanvas);
      // let imgData = newCanvas.toDataURL("image/jpeg", 1.0);
      // let testImage = new Image();
      // testImage.src = imgData;
      // document.body.appendChild(testImage);

      // (imgData);
      // ("sign canvs: ");
      // (newCanvas);
    }
  },
  created() {
    ("EXPORT created");
  },
  mounted() {
    ("EXPORT mounted");
  },
  methods: {
    downloadPDF() {
      ("donwloading poster attmpet");

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
#poster {
  background: #ffffff;
  box-shadow: 2px 2px 5px rgba(0, 0, 50, 0.1);
  border: 1px solid #f0f0f0;
  width: 537px;
  height: 694.08px;
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
</style>
