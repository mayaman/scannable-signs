<template>
  <div class="container">
    <div class="qa-container">
      <span class="question">What is a Scannable Sign?</span>
      <div
        class="answer"
      >A scannable sign is a printable sign for your business that uses QR code technology to send the customer to a designated webpage to complete an action for your business.</div>
      <span class="divider">**********************************************************************************</span>
    </div>

    <div class="qa-container">
      <span class="question">What can I do with it?</span>
      <div
        class="answer"
      >You can link the QR code to any relevant action you would like the customer to take with your business. For example, you can link to your menu page, online ordering system or any URL/phone number that relates to your business. Check out the gallery for more ideas on how to effectively use Scannable signs.</div>
      <span class="divider">**********************************************************************************</span>
    </div>

    <div class="qa-container">
      <span class="question">Is it safe? Is the information I put on my sign protected?</span>
      <div
        class="answer"
      >Yes. The QR code you create is uniquely yours and can’t be changed by anyone else. The sign you create is saved to your own computer and only you have the option to share it publicly.</div>
      <span class="divider">**********************************************************************************</span>
    </div>

    <div class="qa-container">
      <span class="question">What is a QR code?</span>
      <div
        class="answer"
      >A QR, or “quick response” code is a uniquely generated image that allows a user to scan the code with their phone's camera to gain instant access to the information embedded in the code.</div>
      <span class="divider">**********************************************************************************</span>
    </div>

    <div class="qa-container">
      <span class="question">What happens if I want to update my link?</span>
      <div
        class="answer"
      >Each code is attached to a unique web link. If you want to update your link, you’ll need to make another code.</div>
      <span class="divider">**********************************************************************************</span>
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
  font-family: "Arial Narrow";
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
