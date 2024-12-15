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
async function saveimage() {
  console.log("save image");
  const canvas = await html2canvas(document.querySelector("#art"));
  const data = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.download = "art.png";
  link.href = data;
  link.click();
}
