let backgroundColor = "rgba(255, 255, 255, 1)";
document.getElementById("white-board").style.backgroundColor = backgroundColor;
document.getElementById("body").style.backgroundColor = backgroundColor;

window.addEventListener("load", () => {
  const canvas = document.getElementById("white-board");
  const context = canvas.getContext("2d");
  context.save();

  // Resize:
  canvas.height = window.innerHeight * 0.88;
  canvas.width = window.innerWidth;
  window.addEventListener("resize", () => {
    const canvas = document.getElementById("white-board");
    canvas.height = window.innerHeight * 0.88;
    canvas.width = window.innerWidth;
  });

  // Variables:
  let drawing = false;

  function startPosition(e) {
    // context.save();
    drawing = true;
    draw(e);
  }

  function finishedPosition() {
    drawing = false;
    context.beginPath();
  }

  function draw(e) {
    if (!drawing) {
      return;
    }
    context.lineWidth = 10;
    context.strokeStyle = "red";
    context.lineCap = "round";
    context.lineTo(e.clientX, e.clientY - 90);
    context.stroke();
    context.beginPath();
    context.moveTo(e.clientX, e.clientY - 90);
  }

  // EventListeners:
  canvas.addEventListener("mousedown", startPosition);
  canvas.addEventListener("mouseup", finishedPosition);
  canvas.addEventListener("mousemove", draw);

  const toggle = document.getElementById("toggle");
  toggle.addEventListener("click", () => {
    if (toggle.checked) {
      backgroundColor = "rgba(0, 0, 0, 1)";
      document.getElementById(
        "white-board"
      ).style.backgroundColor = backgroundColor;
      document.getElementById("body").style.backgroundColor = backgroundColor;
    } else {
      backgroundColor = "rgba(255, 255, 255, 1)";
      document.getElementById(
        "white-board"
      ).style.backgroundColor = backgroundColor;
      document.getElementById("body").style.backgroundColor = backgroundColor;
    }
  });

  const tools = document.getElementById("tools-container");
  const grabber = document.getElementById("grabber");
  let movingTools = false;
  grabber.addEventListener("mousedown", () => {
    movingTools = true;
  });
  grabber.addEventListener("mouseup", () => {
    movingTools = false;
  });
  grabber.addEventListener("mousemove", (e) => {
    if (movingTools) {
      tools.style.left = e.clientX;
      tools.style.top = e.clientY - 90;
    }
  });

  document.addEventListener("keydown", function (event) {
    if (
      (event.ctrlKey && event.key === "x") ||
      (event.ctrlKey && event.key === "z")
    ) {
      context.clearRect(0, 0, canvas.width, canvas.height);
    }
  });
});
