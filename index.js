const widthCenter = 1500;
const heightCenter = 900;
var x = 0;
var y = 0;
var gpIndex = null;

const canvas = document.getElementsByTagName('canvas')[0];
const context = canvas.getContext('2d');

window.addEventListener("gamepadconnected", function (e) {
  gpIndex = e.gamepad.index;
  console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
    e.gamepad.index, e.gamepad.id,
    e.gamepad.buttons.length, e.gamepad.axes.length);
});

var updatePosition = function (gp) {
  direction = getPointerDirection(gp);

  var magnification = 10;
  if (gp.buttons[14].pressed) {
    magnification = 4;
  }

  x += direction[0] * magnification;
  y += direction[1] * magnification;
};

var getPointerDirection = function (gp) {
  switch (gp.axes[9]) {
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

function renderPointer() {
  context.beginPath();
  context.fillStyle = '#ff0000';
  context.arc(x, y, 10, 0, Math.PI * 2, true);
  context.fill();
}

var render = function () {
  context.clearRect(0, 0, 3000, 1900);

  if (gpIndex != null) {
    var gp = navigator.getGamepads()[gpIndex];

    if (gp.buttons[15].pressed) {
      renderPointer();
      updatePosition(gp);
    } else {
      x = widthCenter;
      y = heightCenter;
    }
  }

  requestAnimationFrame(render);
};

requestAnimationFrame(render);
