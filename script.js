var penColor = "black";
var pens = document.querySelectorAll(".pen");

async function saveimage() {
  console.log("save image");
  const canvas = await html2canvas(document.querySelector("#art"));
  const data = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.download = "art.png";
  link.href = data;
  link.click();
}

function setPixelColor(pixel) {
  pixel.style.backgroundColor = penColor;
}

function setPenColor(pen) {
  penColor = pen;
}

function generateGrid(rows, columns) {
  const artContainer = document.querySelector("#art");
  artContainer.innerHTML = '';

  for (let i = 0; i < rows; i++) {
    const row = document.createElement('div');
    row.className = 'row';

    for (let j = 0; j < columns; j++) {
      const pixel = document.createElement('div');
      pixel.className = 'pixel';
      pixel.addEventListener("click", (event) => {
        setPixelColor(event.target);
      });
      row.appendChild(pixel);
    }

    artContainer.appendChild(row);
  }
}

pens.forEach((pen) => {
  pen.addEventListener("click", (event) => {
    setPenColor(event.target.style.backgroundColor);
  });
});

generateGrid(10, 10);