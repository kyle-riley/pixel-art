function setPixelColor(pixel) {
  pixel.style.backgroundColor = penColor;
}
var penColor = "black";

function setPenColor(pen) {
  penColor = pen;
}
var pixels = document.querySelectorAll(".pixel");
pixels.forEach((pixel) => {
  pixel.addEventListener("click", (event) => {
    setPixelColor(event.target);
  });
});
var pens = document.querySelectorAll(".pen");
pens.forEach((pen) => {
  pen.addEventListener("click", (event) => {
    setPenColor(event.target.style.backgroundColor);
  });
});
