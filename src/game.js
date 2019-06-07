const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const socket = new WebSocket("ws:127.0.0.1:8080/karel");

const setCanvasDimensions = () => {
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
};

var objects = {};

socket.onopen = () => {
  socket.onmessage = event => {
    try {
      const json = JSON.parse(event.data);
      for (const uuid in json) {
        const data = json[uuid];
        
        if (typeof objects[uuid] === "undefined") {
          objects[uuid] = new Human(data.x, data.y);
        } else {
          const obj = objects[uuid];
          obj.x = data.x;
          obj.y = data.y;
        }
      }
    } catch (e) { console.log(e); }
  };

  let moveX = 0, moveY = 0;
  window.onkeydown = event => {
    if (event.key == 'a') moveX = -1;
    if (event.key == 'd') moveX = 1;
    if (event.key == 'w') moveY = -1;
    if (event.key == 's') moveY = 1;

    sendMove(moveX, moveY);
  };

  window.onkeyup = event => {
    if (event.key == 'a' && moveX == -1) moveX = 0;
    if (event.key == 'd' && moveX == 1) moveX = 0;
    if (event.key == 'w' && moveY == -1) moveY = 0;
    if (event.key == 's' && moveY == 1) moveY = 0;

    sendMove(moveX, moveY);
  };

  function sendMove(x, y) {
    socket.send(JSON.stringify({
      type: "move",
      x: x,
      y: y
    }));
  }
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
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

  Object.values(objects).forEach(obj => obj.render());
}

window.requestAnimationFrame(loop);