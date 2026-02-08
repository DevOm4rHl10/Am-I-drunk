// --- Sticker reacts while typing ---
const weightInput = document.getElementById('weight');
const weightSticker = document.getElementById('weightSticker');

weightInput.addEventListener('input', () => {
  const weight = parseFloat(weightInput.value) || 0;

  // Sticker size formula (min 24px, max 80px)
  const newSize = Math.min(24 + weight * 0.5, 80);
  weightSticker.style.fontSize = `${newSize}px`;
});


// --- Sticker Animation trigger while typing ---
const genderSelect = document.getElementById("gender");
const genderSticker = document.getElementById("genderSticker");

genderSelect.addEventListener("change", () => {
  // Reset animation
  genderSticker.classList.remove("drop");
  void genderSticker.offsetWidth; // forces reflow

  if (genderSelect.value === "female") {
    genderSticker.textContent = "🍳";
  } else if (genderSelect.value === "male") {
    genderSticker.textContent = "🏋️";
  } else {
    genderSticker.textContent = "🤔";
  }

  genderSticker.classList.add("drop");
});


const ageInput = document.getElementById("age");
const ageSticker = document.getElementById("ageSticker");

ageInput.addEventListener("input", () => {
  const age = parseInt(ageInput.value);

  // Reset animation
  ageSticker.classList.remove("drop");
  void ageSticker.offsetWidth;

  if (isNaN(age)) {
    ageSticker.textContent = "👶";
  } else if (age < 0) {
    ageSticker.textContent = "🖕";
  } else if (age <= 12) {
    ageSticker.textContent = "👶";
  } else if (age <= 19) {
    ageSticker.textContent = "🧒";
  } else if (age <= 29) {
    ageSticker.textContent = "🧑";
  } else if (age <= 49) {
    ageSticker.textContent = "🧑‍🦱";
  } else if (age <= 64) {
    ageSticker.textContent = "🧑‍🦳";
  } else if (age < 100) {
    ageSticker.textContent = "🧓";
  } else {
    ageSticker.textContent = "💀";
  }

  ageSticker.classList.add("drop");
});



// Volume sticker animation
const volumeInput = document.getElementById("volume");
const volumeSticker = document.getElementById("volumeSticker");

volumeInput.addEventListener("input", () => {
  const volume = parseFloat(volumeInput.value) || 0;

  // Negative volume → 🌙 and fixed size
  if (volume < 0) {
    volumeSticker.textContent = "🌙";
    volumeSticker.style.fontSize = "40px";
    return;
  }

  // Volume >= 1000 → 🇮🇪 fixed size
  if (volume >= 1000) {
    volumeSticker.textContent = "🇮🇪";
    volumeSticker.style.fontSize = "56px";
    return;
  }

  // Progressive beer scaling
  volumeSticker.textContent = "🍺";

  // Sticker size formula (min 24px, max 100px)
  const newSize = Math.min(24 + volume * 0.05, 100); 
  volumeSticker.style.fontSize = `${newSize}px`;
});


const abvInput = document.getElementById("abv");
const abvSticker = document.getElementById("abvSticker");

abvInput.addEventListener("input", () => {
  const abv = parseFloat(abvInput.value);

  if (isNaN(abv)) {
    abvSticker.textContent = "🍺";
  } else if (abv < 0) {
    abvSticker.textContent = "🌙";
  } else if (abv <= 4) {
    abvSticker.textContent = "🍺"; // Beer
  } else if (abv <= 12) {
    abvSticker.textContent = "🍷"; // Wine
  } else if (abv <= 20) {
    abvSticker.textContent = "🥃"; // Whiskey / spirits
  } else if (abv <= 59) {
    abvSticker.textContent = "🥂"; // Champagne / strong liquor
  } else if (abv <= 99) {
    abvSticker.textContent = "🍀"; // Absinthe
  } else {
    abvSticker.textContent = "🇫🇷"; // French extreme drinks
  }
});


// Loading Image Memes

function showBACResult(bac) {
  const bacImage = document.getElementById("bacImage");
  const bacText = document.getElementById("bacText");

  // Get all input values
  const weight = parseFloat(document.getElementById("weight").value);
  const age = parseFloat(document.getElementById("age").value);
  const gender = document.getElementById("gender").value;
  const volume = parseFloat(document.getElementById("volume").value);
  const abv = parseFloat(document.getElementById("abv").value);
  const hours = parseFloat(document.getElementById("hours").value);

  // Check for invalid inputs
  const invalidInput =
    isNaN(weight) || weight <= 0 ||
    isNaN(age) || age < 0 ||
    !gender ||
    isNaN(volume) ||
    isNaN(abv) || abv < 0 ||
    isNaN(hours) || hours < 0;

  if (invalidInput) {
    // Show invalid input meme
    bacImage.src = "images/sus-cat.jpg"; // Your meme for invalid input
    bacText.textContent = "THINK YOU'RE SO SMART BI*?";
    return; // Exit early
  }

  // Normal BAC ranges
  if (bac < 0.03) {
    bacImage.src = "images/cat-thumbs-up.gif";
    bacText.textContent = "LOOKING HANDSOME! 😎";
  } else if (bac < 0.08) {
    bacImage.src = "images/tipsy.jpg";
    bacText.textContent = "STAY AWAY FROM THE WHEEL! 🚗";
  } else if (bac < 0.15) {
    bacImage.src = "images/drunk-cat.jpg";
    bacText.textContent = "You drunk bruh! 🥴";
  } else {
    bacImage.src = "images/scared-cat.jpg";
    bacText.textContent = "Please stop, we love you! ❤️";
  }
}




// Hours drinking sticker
const hoursInput = document.getElementById("hours");
const hoursSticker = document.getElementById("hoursSticker");

hoursInput.addEventListener("input", () => {
  const hours = parseFloat(hoursInput.value);

  if (isNaN(hours) || hours >= 0) {
    hoursSticker.textContent = ""; // no sticker for valid hours
  } else {
    hoursSticker.textContent = "😕"; // confused face for negative hours
  }
});


// --- BAC calculation on form submit ---
document.getElementById('bacForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const weightKg = parseFloat(weightInput.value);
  const gender = document.getElementById('gender').value;
  const volumeML = parseFloat(document.getElementById('volume').value);
  const abv = parseFloat(document.getElementById('abv').value);
  const hours = parseFloat(document.getElementById('hours').value);

  if (!weightKg || !gender || !volumeML || !abv || !hours) return;

  const weightLbs = weightKg * 2.20462; // kg → lbs
  const alcoholOz = volumeML * 0.033814 * (abv / 100); // mL → oz * ABV
  const r = gender === 'male' ? 0.73 : 0.66;

  let bac = (alcoholOz * 5.14) / (weightLbs * r) - 0.015 * (hours / 60); // Convert minutes to hours for calculation
  bac = Math.max(0, bac);

  const resultDiv = document.getElementById('result');
  resultDiv.style.display = 'block';
  resultDiv.className = '';

  let message = '';
  if (bac < 0.03) {
    message = `BAC: ${bac.toFixed(3)} 🍀 You're sober!`;
    resultDiv.classList.add('low');
  } else if (bac < 0.08) {
    message = `BAC: ${bac.toFixed(3)} 😎 You're tipsy!`;
    resultDiv.classList.add('medium');
  } else {
    message = `BAC: ${bac.toFixed(3)} 🚨 Be careful!`;
    resultDiv.classList.add('high');
  }

  // NEW: Update the meme image based on BAC
  showBACResult(bac);
  resultDiv.innerText = message;
});
