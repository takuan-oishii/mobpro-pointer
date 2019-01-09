var windowWidth = null;
var windowHeight = null;
var context = null;
var pointers = [];

window.addEventListener("gamepadconnected", function (e) {
  pointers.push(new Pointer(e.gamepad.index, pointers.length));

  console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
    e.gamepad.index, e.gamepad.id,
    e.gamepad.buttons.length, e.gamepad.axes.length);
});

window.addEventListener("gamepaddisconnected", function (e) {
  var i = getPointersIndex(e.gamepad.index);
  pointers.splice(i, 1);
});

var getPointersIndex = function (gamepadIndex) {
  for (var k = 0, l = pointers.length; k < l; k++) {
    if (pointers[k].gamepadIndex == gamepadIndex) {
      return k;
    }
  }
};

var render = function () {
  context.clearRect(0, 0, windowWidth, windowHeight);

  pointers.forEach(function (pointer) {
    if (pointer) {
      pointer.render(context);
    }
  });

  requestAnimationFrame(render);
};

window.onload = function () {
  windowWidth = document.body.offsetWidth;
  windowHeight = document.body.offsetHeight;

  var canvas = document.createElement('canvas');
  canvas.width = windowWidth * 2;
  canvas.height = windowHeight * 2;
  canvas.style.width = windowWidth;
  canvas.style.height = windowHeight;
  document.body.appendChild(canvas);

  context = canvas.getContext('2d');

  requestAnimationFrame(render);
};
