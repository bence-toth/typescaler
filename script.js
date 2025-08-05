const ratioSelectElement = document.getElementById("ratio");
const baseFontSizeInputElement = document.getElementById("base-font-size");
const darkModeToggleElement = document.getElementById("dark-mode-toggle");
const fontFamilySelectElement = document.getElementById("font-family");
const ratioValueInputElement = document.getElementById("ratio-value");

// On ratio dropdown change, update multiplier and ratio value input
ratioSelectElement.addEventListener("change", (event) => {
  const selectedRatio = parseFloat(event.target.value);
  if (!isNaN(selectedRatio) && selectedRatio > 0) {
    document.documentElement.style.setProperty("--multiplier", selectedRatio);
    ratioValueInputElement.value = selectedRatio.toFixed(2);
  }
  ratioValueInputElement.disabled = selectedRatio !== 1.15;
});

// On ratio value input change, update multiplier
ratioValueInputElement.addEventListener("change", (event) => {
  const customRatio = parseFloat(event.target.value);
  if (!isNaN(customRatio) && customRatio > 1) {
    document.documentElement.style.setProperty("--multiplier", customRatio);
  } else {
    console.warn("Invalid custom ratio value");
  }
});

// On base font size change, update the root font size
baseFontSizeInputElement.addEventListener("change", (event) => {
  const baseFontSize = parseFloat(event.target.value);
  if (!isNaN(baseFontSize) && baseFontSize > 0) {
    document.documentElement.style.fontSize = `${baseFontSize.toFixed(2)}px`;
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
