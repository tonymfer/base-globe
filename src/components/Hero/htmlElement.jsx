export default function htmlElement({ d, mobile }) {
  // Constants for configuration
  const fontSize = mobile ? 8 : 10;
  const length = Math.min(Math.sqrt(d.casts) * 1, 15);
  const maxFontSize = mobile ? 30 : 30;
  const id = `${d.countryName}-div`;

  // Check for an existing element or create a new one
  const existingElement = document.getElementById(id);
  const visibleEl = existingElement
    ? existingElement
    : createNewElement(id, d.countryName);

  // Style the element
  styleElement(visibleEl, length, fontSize, maxFontSize, d);

  // Append the styled element to a new div and return
  const containerDiv = document.createElement('div');
  containerDiv.appendChild(visibleEl);
  return containerDiv;
}

function createNewElement(id, innerHTML) {
  const newElement = document.createElement('div');
  newElement.id = id;
  newElement.innerHTML = innerHTML;
  newElement.classList.add('city-label');
  return newElement;
}

function styleElement(element, length, fontSize, maxFontSize, d) {
  const hasColor = d.color ? true : false;
  const scaleFontSize = (casts, minSize, maxSize) => {
    // Define the range for casts
    const minCasts = 1; // Assuming 1 is the minimum number of casts
    const maxCasts = 500; // Set this to what you consider a max reasonable number of casts

    // Scale casts to the fontSize range
    const scaledSize =
      ((casts - minCasts) / (maxCasts - minCasts)) * (maxSize - minSize) +
      minSize;
    if (d.countryName === 'Base') {
      return 50;
    }
    if (d.color) {
      return 30;
    }
    return Math.min(Math.max(scaledSize, minSize), maxSize); // Ensure the size is within bounds
  };

  // Calculate the font size using the scaling function
  const computedFontSize = `${scaleFontSize(d.casts, fontSize, maxFontSize)}px`;

  // ... rest of the styleElement function remains unchanged ...
  element.style.fontSize = computedFontSize;

  element.style.transform = hasColor
    ? `translate(-50%, 0%)`
    : `translate(-50%, ${(length || 0) * -0.5}px)`;
  element.style.textTransform = 'uppercase';
  element.style.whiteSpace = 'nowrap';
  element.style.fontSize = computedFontSize;
  element.style.fontWeight = '500';
  element.style.lineHeight = '1';
  element.style.position = 'absolute';
  element.style.bottom = '0';
  element.style.left = '0';
  element.style.color = hasColor ? '#fff' : '#000';
  // element.style.color = "#104DF1";
  element.style.background = d.color
    ? // ? `linear-gradient(to bottom, ${d.color3}, ${d.color}, ${d.color2})`
      d.color
    : 'rgba(255, 255, 255, 1)';
  element.style.padding = hasColor ? '4px 8px' : '2.5px 5px';
  element.style.borderRadius = hasColor ? '8px' : '5px';
  element.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.3)';
  element.style.textShadow = hasColor
    ? '0 0 1px rgba(0, 0, 0, 1)'
    : '0 0 0px rgba(0, 0, 0, 0.5)';
  element.style.zIndex = '1';
  element.style.display = 'inline-block';
  // element.style.textShadow = "2px 4px 3px #000";
  element.style.transition = 'transform 0.5s ease-out';
  element.addEventListener('click', () => {
    console.log('Clicked on', d.countryName);
  });
}
