const colors = ['#dd302f', '#13aa15', '#304cc8', '#fcc201', '#da9101'];

class Pointer {
  constructor(gamepadIndex, pointerCount) {
    this.gamepadIndex = gamepadIndex;
    this.x = windowWidth / 2;
    this.y = windowHeight / 2;
    this.color = colors[pointerCount % 6];
  }

  render(context) {
    var gamepad = this.gamepad();

    if (gamepad.buttons[5].pressed) {
      this.update();

      context.beginPath();
      context.fillStyle = this.color;
      context.arc(this.x, this.y, 5, 0, Math.PI * 2, true);
      context.fill();
    } else {
      this.hide();
    }
  }

  update() {
    var gamepad = this.gamepad();
    var direction = this.getPointerDirection(gamepad);

    var magnification = 16;
    if (gamepad.buttons[0].pressed || gamepad.buttons[1].pressed || gamepad.buttons[2].pressed || gamepad.buttons[3].pressed) {
      magnification = 8;
    }

    this.x += direction[0] * magnification;
    this.y += direction[1] * magnification;
  };

  hide() {
    this.x = windowWidth / 2;
    this.y = windowHeight / 2;
  }

  getPointerDirection() {
    var gamepad = this.gamepad();
    return gamepad.axes;
  };

  gamepad() {
    return navigator.getGamepads()[this.gamepadIndex];
  }
}
