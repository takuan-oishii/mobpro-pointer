var pointer = null;

const canvas = document.getElementsByTagName('canvas')[0];
const context = canvas.getContext('2d');

window.addEventListener("gamepadconnected", function (e) {
  pointer = new Pointer(e.gamepad.index);

  console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
    e.gamepad.index, e.gamepad.id,
    e.gamepad.buttons.length, e.gamepad.axes.length);
});

var render = function () {
  context.clearRect(0, 0, 3000, 1900);

  if (pointer != null) {
    pointer.render(context);
  }

  requestAnimationFrame(render);
};

requestAnimationFrame(render);
