class GameObject {
  constructor(id, x, y, width, height) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.uuid = null;

    this.moveX = 0;
    this.moveY = 0;
  }

  update() {
    const speed = 2;
    this.x += this.moveX * speed;
    this.y += this.moveY * speed;
  }

  render() {
    ctx.strokeStyle = "red";
    ctx.strokeRect(this.x, this.y, 32, 32);
  }

  receiveUpdate(x, y) {
    this.x = x;
    this.y = y;
  }

  serialize() {
    return {
      id: this.id,
      x: this.x,
      y: this.y
    }
  }
}

class Human extends GameObject {
  constructor(x, y) {
    super(1, x, y, 32, 32);
  }

  render() {
    super.render();
  }
}

if (typeof window === "undefined") {
  module.exports = {
    GameObject,
    Human
  };
}