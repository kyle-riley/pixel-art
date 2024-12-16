let penColor = "black";
const pens = document.querySelectorAll(".pen");

const setPixelColor = pixel => pixel.style.backgroundColor = penColor;
const setPenColor = pen => penColor = pen;

const saveImage = async (elementId, filename) => {
  if (typeof html2canvas === 'undefined') {
    await new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://html2canvas.hertzen.com/dist/html2canvas.min.js';
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  const canvas = await html2canvas(document.querySelector(elementId));
  const data = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.download = `${filename}.png`;
  link.href = data;
  link.click();
};

const generateGrid = (rows, columns) => {
  const artContainer = document.querySelector("#art");
  artContainer.innerHTML = '';

  for (let i = 0; i < rows; i++) {
    const row = document.createElement('div');
    row.className = 'row';

    for (let j = 0; j < columns; j++) {
      const pixel = document.createElement('div');
      pixel.className = 'pixel';
      pixel.addEventListener("click", event => setPixelColor(event.target));
      row.appendChild(pixel);
    }

    artContainer.appendChild(row);
  }
};

pens.forEach(pen => {
  pen.addEventListener("click", event => setPenColor(event.target.style.backgroundColor));
});

generateGrid(10, 10);