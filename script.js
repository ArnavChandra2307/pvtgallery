// ========== 🔐 Lock Screen Logic ==========

// 🎧 Load Sound Effects
const sounds = {
  hover: new Audio("sounds/hover.mp3"),
  click: new Audio("sounds/click.mp3"),
  rotate: new Audio("sounds/rotating.mp3"),
  type: new Audio("sounds/typing.mp3"),
};

// 💡 Set volume for all sounds
for (let key in sounds) {
  sounds[key].volume = 0.25;
}

// 👉 DOM Elements for Lock Screen
const passwordInput = document.getElementById("passwordInput");
const togglePassword = document.getElementById("togglePassword");
const lockScreen = document.getElementById("lockScreen");
const homePage = document.getElementById("homePage");

// 🔑 Multiple Valid Passwords
const CORRECT_PASSWORDS = ["soul", "emotion", "gallery", "7004210477"];
const savedAccess = localStorage.getItem("galleryAccess");

if (savedAccess === "granted") {
  unlockPageImmediately();
}


// 👁 Toggle Password Visibility
togglePassword.addEventListener("click", () => {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    togglePassword.textContent = "🙈";
  } else {
    passwordInput.type = "password";
    togglePassword.textContent = "🐵";
  }

  sounds.click.currentTime = 0;
  sounds.click.play();
});

// 🎹 Play typing sound
passwordInput.addEventListener("keydown", () => {
  sounds.type.currentTime = 0;
  sounds.type.play();
});

// 🔓 Check Password on Enter
passwordInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    checkPassword();
  }
});

// ✅ Unlock if correct password
function checkPassword() {
  const remember = document.getElementById("rememberMe").checked;
  const entered = passwordInput.value.trim();

  if (CORRECT_PASSWORDS.includes(entered)) {
    if (remember) {
      localStorage.setItem("galleryAccess", "granted");
    }
    unlockPageImmediately();
  } else {
    alert("Wrong password! Try again.");
  }
}

// ========== 🖋️ Typewriter Text ==========

const textElement = document.getElementById("typewriterText");
const phrases = [
  "Every soul has a story to tell.",
  "Pain hides behind even the brightest smiles.",
  "Dive into the emotions that shape us.",
  "This is your inner gallery. Explore it."
];

let i = 0, j = 0, isDeleting = false;

function typeEffect() {
  const currentPhrase = phrases[i];
  if (isDeleting) {
    textElement.textContent = currentPhrase.substring(0, j--);
  } else {
    textElement.textContent = currentPhrase.substring(0, j++);
  }

  if (!isDeleting && j === currentPhrase.length) {
    isDeleting = true;
    setTimeout(typeEffect, 1000);
  } else if (isDeleting && j === 0) {
    isDeleting = false;
    i = (i + 1) % phrases.length;
    setTimeout(typeEffect, 500);
  } else {
    setTimeout(typeEffect, isDeleting ? 30 : 60);
  }
}
typeEffect();

// ========== 🎯 Get Started Button ==========

const getStartedBtn = document.getElementById("getStartedBtn");
const carouselSection = document.getElementById("carouselSection");

getStartedBtn.addEventListener("click", () => {
  sounds.click.currentTime = 0;
  sounds.click.play();

  homePage.classList.add("fade-out");

  setTimeout(() => {
    homePage.classList.add("hidden");
    carouselSection.classList.remove("hidden");
    carouselSection.classList.add("fade-in");

    setTimeout(() => {
      carouselSection.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, 700);
});

// ========== 🎡 Carousel Rotation Logic ==========

const carouselInner = document.getElementById("carouselInner");
const tiles = carouselInner.querySelectorAll(".tile");

let angle = 0;
let selectedIndex = 0;
const totalTiles = tiles.length;

// 🔄 Position each tile in a 3D circle
tiles.forEach((tile, i) => {
  const rotateAngle = i * (360 / totalTiles);
  tile.style.transform = `rotateY(${rotateAngle}deg) translateZ(400px)`;
});

// ↩️ Rotate carousel to focused tile
function rotateCarousel() {
  const newAngle = selectedIndex * -(360 / totalTiles);
  carouselInner.style.transform = `translateX(-50%) rotateY(${newAngle}deg)`;
}

// ⌨️ Rotate with Arrow Keys
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    selectedIndex = (selectedIndex + 1) % totalTiles;
    rotateCarousel();
    sounds.rotate.currentTime = 0;
    sounds.rotate.play();
  } else if (e.key === "ArrowLeft") {
    selectedIndex = (selectedIndex - 1 + totalTiles) % totalTiles;
    rotateCarousel();
    sounds.rotate.currentTime = 0;
    sounds.rotate.play();
  }
});

// ========== 🖱️ Clickable Tiles ==========

tiles.forEach((tile, index) => {
  tile.addEventListener("mouseenter", () => {
    sounds.hover.currentTime = 0;
    sounds.hover.play();
  });

  tile.addEventListener("click", () => {
    selectedIndex = index;
    rotateCarousel();

    tile.classList.add("clicked");
    setTimeout(() => tile.classList.remove("clicked"), 300);

    sounds.click.currentTime = 0;
    sounds.click.play();

    const title = tile.querySelector("span")?.textContent.trim().toLowerCase();
    if (title) {
      window.location.href = `pages/${title}.html`; // e.g., love.html
    }
  });
});
function unlockPageImmediately() {
  lockScreen.classList.add("fade-out");
  document.body.classList.remove("lock-active");

  setTimeout(() => {
    homePage.classList.remove("hidden");
    homePage.classList.add("visible");
  }, 1000);
}
