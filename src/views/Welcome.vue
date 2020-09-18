<template>
  <div class="mobile-container" id="mobile-container">
    <img
      class="visuallyhidden"
      width="64px"
      id="clonable-smiley"
      :src="require(`@/assets/icons/smiley.png`)"
    />
    <h1 class="mobile-header">
      Welcome to
      <br />
      <span>
        <img
          class="nav-circle"
          id="scannable-circle"
          src="../assets/icons/scannable_circle.png"
          alt
        /> Scannable Signs
      </span>
    </h1>
    <div class="mobile-description">
      Please visit
      <a
        class="green no-underline"
        href="https://twitter.com/hashtag/ScannableSign"
        target="_blank"
      >ScannableSigns.com</a> on desktop to make your own sign.
    </div>

    <div class="sign-demo">
      <img class="sign" :src="require(`@/assets/demo.gif`)" />
    </div>

    <div class="mobile-description">
      Send yourself the link:
      <br />
      <br />
      <a
        class="green no-underline green-button reminder"
        target="_blank"
        href="mailto:<YOUR-EMAIL-HERE>?subject=Check%20out%20Scannable%20Signs!&body=Head%20to%20the%20link%20ScannableSigns.com%20on%20a%20laptop%20(or%20any%20desktop%20computer)%20to%20make%20your%20own%20QR-code%20powered%20sign%20%3A-)"
      >Email</a>
      <a
        class="green no-underline green-button reminder"
        href="sms://Myself?body=Head%20to%20the%20link%20ScannableSigns.com%20on%20a%20laptop%20(or%20any%20desktop%20computer)%20to%20make%20your%20own%20QR-code%20powered%20sign%20%3A-)"
      >Text</a>
    </div>
    <br />
    <br />
    <div class="ty-note">
      <img class="ty" :src="require(`@/assets/icons/ty.png`)" />
    </div>
  </div>
</template>

<script>
export default {
  name: "welcome",
  props: {},
  watch: {},
  data() {
    return {
      smileyWidth: 58,
      smileyPositions: [
        { x: 17, y: 286 },
        { x: 5, y: 11 },
        { x: 310, y: 106 },
        { x: 226, y: 544 },
        { x: 4, y: 588 },
        { x: 315, y: 369 },
        { x: 297, y: 680 },
        { x: 0, y: 158 },
        { x: 37, y: 746 },
        { x: 251, y: -16 },
      ],
    };
  },
  mounted() {
    document.body.addEventListener("mouseup", this.handleMouseUp);
    this.smileyPositions.forEach((position) => {
      let newSmiley = document.getElementById("clonable-smiley").cloneNode();
      newSmiley.style.position = "absolute";

      let leftPos = position.x;
      let topPos = position.y;
      let rotation = Math.random() * 360;
      newSmiley.style.left = leftPos + "px";
      newSmiley.style.top = topPos + "px";
      newSmiley.style.transform = "rotate(" + rotation + "deg)";
      newSmiley.classList.remove("visuallyhidden");
      document.getElementById("mobile-container").appendChild(newSmiley);
    });
  },
  methods: {
    handleMouseUp(e) {
      let newSmiley = document.getElementById("clonable-smiley").cloneNode();
      newSmiley.style.position = "absolute";

      let leftPos = e.clientX - this.smileyWidth / 2;
      let topPos = e.clientY - this.smileyWidth / 2;
      let rotation = Math.random() * 360;
      console.log(leftPos);
      console.log(topPos);
      newSmiley.style.left = leftPos + "px";
      newSmiley.style.top = topPos + "px";
      newSmiley.style.transform = "rotate(" + rotation + "deg)";
      newSmiley.classList.remove("visuallyhidden");
      document.getElementById("mobile-container").appendChild(newSmiley);
    },
  },
};
</script>

<style scoped>
.mobile-container {
  padding-top: 2%;
}

.mobile-header {
  font-family: "Archivo Narrow", sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 32px;
  line-height: 100%;
  text-align: center;
  letter-spacing: -0.01em;
}

.mobile-description {
  font-family: "Source Code Pro";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 136%;
  text-align: center;
  letter-spacing: -0.02em;

  width: 75%;
  margin: auto;
  display: block;
  position: relative;
  padding-top: 15px;
}

.nav-circle {
  position: absolute;
  left: 50%;
  width: 220px;
  transform: translate(-50%, 0);
  /* width: 115%;
  height: 110%; */
}

.sign-demo img {
  width: 90%;
}

.ty-note img {
  width: 130px;
}

.reminder {
  margin: 12px;
  padding: 3px 5px;
}
</style>
