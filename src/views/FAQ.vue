<template>
  <div class="container">
    <div class="qa-container">
      <span class="question">What is a Scannable Sign?</span>
      <div
        class="answer"
      >A scannable sign is a printable sign for your business that uses QR code technology to send the customer to a designated webpage to complete an action for your business.</div>
      <span
        class="divider"
      >**********************************************************************************</span>
    </div>

    <div class="qa-container">
      <span class="question">What can I do with it?</span>
      <div
        class="answer"
      >You can link the QR code to any relevant action you would like the customer to take with your business. For example, you can link to your menu page, online ordering system or any URL/phone number that relates to your business.</div>
      <span
        class="divider"
      >**********************************************************************************</span>
    </div>

    <!-- <div class="qa-container">
      <span class="question">Is it safe? Is the information I put on my sign protected?</span>
      <div
        class="answer"
      >Yes. The QR code you create is uniquely yours and can’t be changed by anyone else. The sign you create is saved to your own computer and only you have the option to share it publicly.</div>
      <span
        class="divider"
      >**********************************************************************************</span>
    </div>-->

    <div class="qa-container">
      <span class="question">What is a QR code?</span>
      <div class="answer">
        A
        <a href="https://en.wikipedia.org/wiki/QR_code">QR code</a>, or “quick response” code is a uniquely generated image that allows a user to scan the code with their phone's camera to gain instant access to the information embedded in the code. The QR code you create is uniquely yours and can’t be changed by anyone else.
      </div>
      <span
        class="divider"
      >**********************************************************************************</span>
    </div>

    <div class="qa-container">
      <span class="question">What happens if I want to update my link?</span>
      <div
        class="answer"
      >Your code only points to the link that you gave it. If you want to update your link, you’ll need to make another code.</div>
      <span
        class="divider"
      >**********************************************************************************</span>
    </div>

    <div class="qa-container">
      <span class="question">Is any of my information being stored?</span>
      <div class="answer">Nope – Scannable Signs doesn’t collect or store any information.</div>
      <span
        class="divider"
      >**********************************************************************************</span>
    </div>

    <div class="qa-container">
      <span class="question">Who made this?</span>
      <div class="answer">
        Design:
        <a target="_blank" href="http://www.hanatanimura.com/">Hana Tanimura</a>
        <br />Development:
        <a target="_blank" href="http://mayaontheinter.net/">Maya Man</a>
        <br />Illustration:
        <a target="_blank" href="https://www.joseguizar.com/">José Guizar</a>
        <br />
        <br />You can follow and reach out on Twitter:
        <a
          target="_blank"
          href="https://twitter.com/ScannableSigns"
        >@ScannableSigns</a>
      </div>
      <span
        class="divider"
      >**********************************************************************************</span>
    </div>
  </div>
</template>


<script>
export default {
  name: "faq",
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.qa-container {
  text-align: left;
  width: 830px;
  margin: 70px 0px;
}

.question {
  font-family: "Archivo Narrow", sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 32px;
  line-height: 125%;
  /* or 40px */
  letter-spacing: -0.01em;
}

.answer {
  margin-top: 18px;
  margin-bottom: 10px;

  font-family: "Source Code Pro";
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 160%;
  /* or 32px */

  letter-spacing: -0.02em;
}

.answer a {
  text-decoration: none;
  color: #19b774;
}

.answer a:hover {
  text-decoration: none;
  color: #202124;
}

.divider {
  font-family: "Source Code Pro";
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 15px;
  display: flex;
  align-items: center;
  letter-spacing: 0.32em;
  text-transform: uppercase;
}
</style>
