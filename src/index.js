const path = require("path");
const express = require("express");
const app = express();
const port = 8080;
const { GameObject, Human } = require('./gameobjects.js');

const ws = require("express-ws")(app);

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "web/index.html")));
app.get("/main.css", (req, res) => res.sendFile(path.join(__dirname, "web/main.css")));
app.get("/gameobjects.js", (req, res) => res.sendFile(path.join(__dirname, "gameobjects.js")));
app.get("/game.js", (req, res) => res.sendFile(path.join(__dirname, "game.js")));

app.listen(port, () => console.log("Server běží"));

const objs = {};

const connected = [];

app.ws("/karel", ws => {
  const player = new Human(100, 100);
  addObj(player);
  connected.push(ws);
  console.log("Připojil se hráč");

  ws.on("message", msg => {
    console.log(msg);
    try {
      const json = JSON.parse(msg);
      if (json.type == "move") {
        if (json.x !== undefined) player.moveX = json.x;
        if (json.y !== undefined) player.moveY = json.y;
      }
    } catch (e) { console.log(e); }
  });

  ws.on("close", () => {
    console.log("Odpojil se hráč");
    delete objs[player.uuid];
    connected.slice(connected.indexOf(ws), 1);
  });
});

setInterval(() => {
  let data = Object.values(objs).reduce((acc, obj) => {
    obj.update();
    acc[obj.uuid] = obj.serialize();
    return acc;
  }, {});
  const text = JSON.stringify(data);
  connected.forEach(conn => conn.send(text));
}, 16);

let lid = 1;
function addObj(obj) {
  const uuid = ++lid;
  objs[uuid] = obj;
  obj.uuid = uuid;
}