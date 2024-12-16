let penColor = "black";

const generatePalette = colors => {
  const paletteContainer = document.querySelector("#palette");
  paletteContainer.innerHTML = '';

  colors.forEach(color => {
    const pen = document.createElement('div');
    pen.className = 'pen';
    pen.style.backgroundColor = color;
    pen.addEventListener("click", event => setPenColor(event.target.style.backgroundColor));
    paletteContainer.appendChild(pen);
  });
};

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

const defaultColors = [
  'white',
  'black',
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'indigo',
  'violet'
];
generatePalette(defaultColors);
generateGrid(20, 20);