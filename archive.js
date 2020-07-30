   // const canvas = document.getElementById("drawing-canvas");
    // let ctx = canvas.getContext("2d");

    // // Drawable canvas
    // // Mousedown
    // canvas.addEventListener("mousedown", e => {
    //   if (this.currentTool == "pen") {
    //     ("mouse down!");
    //     let mousePos = this.getMousePos(canvas, e);
    //     this.pMouseX = this.mouseX = parseInt(mousePos.x);
    //     this.pMouseY = this.mouseY = parseInt(mousePos.y);
    //     this.mouseDown = true;
    //   }
    // });

    // // Mouseup
    // canvas.addEventListener("mouseup", () => {
    //   if (this.currentTool == "pen") {
    //     this.mouseDown = false;
    //   }
    // });

    // // Mouse Move
    // canvas.addEventListener("mousemove", e => {
    //   if (this.currentTool == "pen") {
    //     let mousePos = this.getMousePos(canvas, e);
    //     this.mouseX = parseInt(mousePos.x);
    //     this.mouseY = parseInt(mousePos.y);
    //     if (this.mouseDown) {
    //       ctx.beginPath();
    //       ctx.strokeStyle = "#000000FF";
    //       ctx.lineWidth = 2;
    //       ctx.lineJoin = "round";
    //       ctx.lineCap = "round";
    //       ctx.moveTo(this.pMouseX + 0.5, this.pMouseY);
    //       ctx.lineTo(this.mouseX + 0.5, this.mouseY);
    //       ctx.closePath();
    //       ctx.stroke();
    //     }
    //     this.pMouseX = this.mouseX;
    //     this.pMouseY = this.mouseY;
    //   }
    // });