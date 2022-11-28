<template>
  <div id="loading">
    <div class="swapping-squares-spinner" :style="spinnerStyle">
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
    </div>
  </div>
</template>

<script>
export default {};
</script>
<style>
#loading {
  top: 0;
  left: 0;
  position: fixed;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.7);
  height: 100vh;
  width: 100vw;
  text-align: center;
  line-height: 100vh;
}
.img {
  position: relative;
  margin: auto;
  margin-top: 20%;
}
.swapping-squares-spinner,
.swapping-squares-spinner * {
  box-sizing: border-box;
}

.swapping-squares-spinner {
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.swapping-squares-spinner .square {
  height: calc(65px * 0.25 / 1.3);
  width: calc(65px * 0.25 / 1.3);
  animation-duration: 1000ms;
  border: calc(65px * 0.04 / 1.3) solid #d8cbcf;
  margin-right: auto;
  margin-left: auto;
  position: absolute;
  animation-iteration-count: infinite;
}

.swapping-squares-spinner .square:nth-child(1) {
  animation-name: swapping-squares-animation-child-1;
  animation-delay: 500ms;
}

.swapping-squares-spinner .square:nth-child(2) {
  animation-name: swapping-squares-animation-child-2;
  animation-delay: 0ms;
}

.swapping-squares-spinner .square:nth-child(3) {
  animation-name: swapping-squares-animation-child-3;
  animation-delay: 500ms;
}

.swapping-squares-spinner .square:nth-child(4) {
  animation-name: swapping-squares-animation-child-4;
  animation-delay: 0ms;
}

@keyframes swapping-squares-animation-child-1 {
  50% {
    transform: translate(150%, 150%) scale(2, 2);
  }
}

@keyframes swapping-squares-animation-child-2 {
  50% {
    transform: translate(-150%, 150%) scale(2, 2);
  }
}

@keyframes swapping-squares-animation-child-3 {
  50% {
    transform: translate(-150%, -150%) scale(2, 2);
  }
}

@keyframes swapping-squares-animation-child-4 {
  50% {
    transform: translate(150%, -150%) scale(2, 2);
  }
}
</style>
