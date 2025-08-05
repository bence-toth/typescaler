const ratioSelectElement = document.getElementById("ratio");
const baseFontSizeInputElement = document.getElementById("base-font-size");
const darkModeToggleElement = document.getElementById("dark-mode-toggle");
const fontFamilySelectElement = document.getElementById("font-family");
const ratioValueInputElement = document.getElementById("ratio-value");

// Recalculate and render pixel values
const recalculateAndRenderPixelValues = ({ baseFontSize, ratio }) => {
  const pixelValues = {
    paragraph: {
      fontSize: baseFontSize,
      lineHeight: baseFontSize * (1 + ratio / 2),
      marginTop: 0,
      marginBottom: baseFontSize,
    },
    h1: {
      fontSize: baseFontSize * ratio ** 3,
      lineHeight: baseFontSize * ratio ** 3,
      marginTop: baseFontSize * ratio ** 3 * 1.5,
      marginBottom: baseFontSize * ratio ** 3 * 0.5,
    },
    h2: {
      fontSize: baseFontSize * ratio ** 2,
      lineHeight: baseFontSize * ratio ** 2,
      marginTop: baseFontSize * ratio ** 2 * 1.25,
      marginBottom: baseFontSize * ratio ** 2 * 0.5,
    },
    h3: {
      fontSize: baseFontSize * ratio,
      lineHeight: baseFontSize * ratio,
      marginTop: baseFontSize * ratio,
      marginBottom: baseFontSize * ratio * 0.5,
    },
    small: {
      fontSize: baseFontSize / ratio,
      lineHeight: baseFontSize / ratio + (1 + ratio / 2),
      marginTop: 0,
      marginBottom: (baseFontSize / ratio) * 0.5,
    },
  };
  document.getElementById(
    "h1-font-size"
  ).innerText = `${pixelValues.h1.fontSize.toFixed(2)}px`;
  document.getElementById(
    "h1-line-height"
  ).innerText = `${pixelValues.h1.lineHeight.toFixed(2)}px`;
  document.getElementById(
    "h1-margin-block-start"
  ).innerText = `${pixelValues.h1.marginTop.toFixed(2)}px`;
  document.getElementById(
    "h1-margin-block-end"
  ).innerText = `${pixelValues.h1.marginBottom.toFixed(2)}px`;
  document.getElementById(
    "h2-font-size"
  ).innerText = `${pixelValues.h2.fontSize.toFixed(2)}px`;
  document.getElementById(
    "h2-line-height"
  ).innerText = `${pixelValues.h2.lineHeight.toFixed(2)}px`;
  document.getElementById(
    "h2-margin-block-start"
  ).innerText = `${pixelValues.h2.marginTop.toFixed(2)}px`;
  document.getElementById(
    "h2-margin-block-end"
  ).innerText = `${pixelValues.h2.marginBottom.toFixed(2)}px`;
  document.getElementById(
    "h3-font-size"
  ).innerText = `${pixelValues.h3.fontSize.toFixed(2)}px`;
  document.getElementById(
    "h3-line-height"
  ).innerText = `${pixelValues.h3.lineHeight.toFixed(2)}px`;
  document.getElementById(
    "h3-margin-block-start"
  ).innerText = `${pixelValues.h3.marginTop.toFixed(2)}px`;
  document.getElementById(
    "h3-margin-block-end"
  ).innerText = `${pixelValues.h3.marginBottom.toFixed(2)}px`;
  document.getElementById(
    "p-font-size"
  ).innerText = `${pixelValues.paragraph.fontSize.toFixed(2)}px`;
  document.getElementById(
    "p-line-height"
  ).innerText = `${pixelValues.paragraph.lineHeight.toFixed(2)}px`;
  document.getElementById(
    "p-margin-block-start"
  ).innerText = `${pixelValues.paragraph.marginTop.toFixed(2)}px`;
  document.getElementById(
    "p-margin-block-end"
  ).innerText = `${pixelValues.paragraph.marginBottom.toFixed(2)}px`;
  document.getElementById(
    "small-font-size"
  ).innerText = `${pixelValues.small.fontSize.toFixed(2)}px`;
  document.getElementById(
    "small-line-height"
  ).innerText = `${pixelValues.small.lineHeight.toFixed(2)}px`;
  document.getElementById(
    "small-margin-block-start"
  ).innerText = `${pixelValues.small.marginTop.toFixed(2)}px`;
  document.getElementById(
    "small-margin-block-end"
  ).innerText = `${pixelValues.small.marginBottom.toFixed(2)}px`;
};

// On ratio dropdown change, update multiplier and ratio value input
ratioSelectElement.addEventListener("change", (event) => {
  const selectedRatio = parseFloat(event.target.value);
  if (!isNaN(selectedRatio) && selectedRatio > 0) {
    document.documentElement.style.setProperty("--multiplier", selectedRatio);
    ratioValueInputElement.value = selectedRatio.toFixed(2);
    recalculateAndRenderPixelValues({
      baseFontSize: parseFloat(baseFontSizeInputElement.value),
      ratio: selectedRatio,
    });
  }
  ratioValueInputElement.disabled = selectedRatio !== 1.15;
});

// On ratio value input change, update multiplier
ratioValueInputElement.addEventListener("change", (event) => {
  const customRatio = parseFloat(event.target.value);
  if (!isNaN(customRatio) && customRatio > 1) {
    document.documentElement.style.setProperty("--multiplier", customRatio);
    recalculateAndRenderPixelValues({
      baseFontSize: parseFloat(baseFontSizeInputElement.value),
      ratio: customRatio,
    });
  } else {
    console.warn("Invalid custom ratio value");
  }
});

// On base font size change, update the root font size
baseFontSizeInputElement.addEventListener("change", (event) => {
  const baseFontSize = parseFloat(event.target.value);
  if (!isNaN(baseFontSize) && baseFontSize > 0) {
    document.documentElement.style.fontSize = `${baseFontSize.toFixed(2)}px`;
    recalculateAndRenderPixelValues({
      baseFontSize: baseFontSize,
      ratio: parseFloat(ratioValueInputElement.value),
    });
  } else {
    console.warn("Invalid base font size value");
  }
});

// On font family change, load the selected font and apply it to the article
fontFamilySelectElement.addEventListener("change", (event) => {
  const selectedFontFamilyName = event.target.value;
  const selectedFontFamily = fontFamilies.find(
    (fontFamily) => fontFamily.name === selectedFontFamilyName
  );
  if (!selectedFontFamily.isLoaded) {
    const linkElement = document.createElement("link");
    linkElement.rel = "stylesheet";
    linkElement.href = `https://fonts.googleapis.com/css2?family=${selectedFontFamilyName.replace(
      " ",
      "+"
    )}&display=swap`;
    document.head.appendChild(linkElement);
    selectedFontFamily.isLoaded = true;
  }
  document.querySelector("article").style.fontFamily = selectedFontFamilyName;
});

// On dark mode toggle change, add or remove the dark class from the body
darkModeToggleElement.addEventListener("change", (event) => {
  const isDarkMode = event.target.checked;
  if (isDarkMode) {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
});
