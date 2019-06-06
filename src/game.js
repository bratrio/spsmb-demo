const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const setCanvasDimensions = () => {
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
};

setCanvasDimensions();
window.onresize = setCanvasDimensions;

function loop() {
  update();
  render();
  window.requestAnimationFrame(loop);
}

function update() {

}

function render() {
  ctx.fillStyle = "red";
  ctx.fillRect(20, 20, 80, 80);
}

window.requestAnimationFrame(loop);