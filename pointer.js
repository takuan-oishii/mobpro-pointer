const colors = ['#dd302f', '#13aa15', '#304cc8', '#4e2388', '#fcc201', '#da9101'];

class Pointer {
  constructor(gamepadIndex, pointerCount) {
    this.gamepadIndex = gamepadIndex;
    this.x = 1500;
    this.y = 900;
    this.color = colors[pointerCount % 6];
  }

  render(context) {
    var gamepad = this.gamepad();

    if (gamepad.buttons[15].pressed) {
      this.update();

      context.beginPath();
      context.fillStyle = this.color;
      context.arc(this.x, this.y, 10, 0, Math.PI * 2, true);
      context.fill();
    } else {
      this.hide();
    }
  }

  update() {
    var gamepad = this.gamepad();
    var direction = this.getPointerDirection(gamepad);

    var magnification = 10;
    if (gamepad.buttons[14].pressed) {
      magnification = 4;
    }

    if (gamepad.id.match(/^Joy-Con \(R\)/)) {
      magnification *= -1;
    }

    this.x += direction[0] * magnification;
    this.y += direction[1] * magnification;
  };

  hide() {
    this.x = 1500;
    this.y = 900;
  }

  getPointerDirection() {
    var gamepad = this.gamepad();

    switch (gamepad.axes[9]) {
      case -1:
        return [2, 0];
      case 1:
        return [1, -1];
      case 0.7142857313156128:
        return [0, -2];
      case 0.4285714626312256:
        return [-1, -1];
      case 0.14285719394683838:
        return [-2, 0];
      case -0.1428571343421936:
        return [-1, 1];
      case -0.4285714030265808:
        return [0, 2];
      case -0.7142857313156128:
        return [1, 1];
      default:
        return [0, 0];
    }
  };

  gamepad() {
    return navigator.getGamepads()[this.gamepadIndex];
  }
}
