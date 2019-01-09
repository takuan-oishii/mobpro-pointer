const colors = ['#dd302f', '#13aa15', '#304cc8', '#4e2388', '#fcc201', '#da9101'];

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

    var magnification = 8;
    if (gamepad.buttons[0].pressed || gamepad.buttons[1].pressed || gamepad.buttons[2].pressed || gamepad.buttons[3].pressed) {
      magnification = 3;
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

    switch (gamepad.axes[9]) {
      case -1:
        return [0, -2];
      case 1:
        return [-1, -1];
      case 0.7142857313156128:
        return [-2, 0];
      case 0.4285714626312256:
        return [-1, 1];
      case 0.14285719394683838:
        return [0, 2];
      case -0.1428571343421936:
        return [1, 1];
      case -0.4285714030265808:
        return [2, 0];
      case -0.7142857313156128:
        return [1, -1];
      default:
        return [0, 0];
    }
  };

  gamepad() {
    return navigator.getGamepads()[this.gamepadIndex];
  }
}
