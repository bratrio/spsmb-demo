const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const socket = new WebSocket("ws:127.0.0.1:8080/karel");

const setCanvasDimensions = () => {
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
};

socket.onopen = () => {
  socket.send("Smrdíš");
  socket.onmessage = event => console.log("Dostal jsi zprávu od serveru: ", event.data);
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