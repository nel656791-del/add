document.addEventListener("DOMContentLoaded", () => {
  const welcomeText =
    "Welcome to YOUR CLUB. Please complete the registration form below to apply for membership.";

  const displayEl = document.getElementById("welcomeMsg");
  const menuBtns = document.getElementById("menuBtns");

  if (!displayEl || !menuBtns) {
    console.error("Missing #welcomeMsg or #menuBtns");
    return;
  }

 
  menuBtns.style.display = "flex";
  menuBtns.style.opacity = "0";
  menuBtns.style.pointerEvents = "none";

  let charIndex = 0;

  function typeWriter() {
    if (charIndex < welcomeText.length) {
      displayEl.innerHTML += welcomeText.charAt(charIndex);
      charIndex++;

      let delay = 25;
      const char = welcomeText.charAt(charIndex - 1);
      if (char === "," || char === ".") delay = 150;

      setTimeout(typeWriter, delay);
    } else {
  
      menuBtns.style.transition = "opacity 0.8s ease";
      menuBtns.style.opacity = "1";
      menuBtns.style.pointerEvents = "auto";
    }
  }

  displayEl.innerHTML = "";
  typeWriter();
});
