let penColor = "black";
let isDrawing = false;

// Add mouse state tracking
document.addEventListener('mousedown', () => isDrawing = true);
document.addEventListener('mouseup', () => isDrawing = false);
document.addEventListener('mouseleave', () => isDrawing = false);

// Add touch state tracking
document.addEventListener('touchstart', () => isDrawing = true);
document.addEventListener('touchend', () => isDrawing = false);
document.addEventListener('touchcancel', () => isDrawing = false);

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

      // Handle both click and drag events
      pixel.addEventListener('mousedown', event => setPixelColor(event.target));
      pixel.addEventListener('mouseover', event => {
        if (isDrawing) setPixelColor(event.target);
      });

      // Handle touch events
      pixel.addEventListener('touchstart', event => {
        event.preventDefault();
        setPixelColor(event.target);
      });
      pixel.addEventListener('touchmove', event => {
        event.preventDefault();
        const touch = event.touches[0];
        const target = document.elementFromPoint(touch.clientX, touch.clientY);
        if (target?.classList.contains('pixel')) {
          setPixelColor(target);
        }
      });

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