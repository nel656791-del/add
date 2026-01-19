(function () {
  function initWelcome() {
    const displayEl = document.getElementById("welcomeMsg");
    const menuBtns  = document.getElementById("menuBtns");

    if (!displayEl || !menuBtns) {
      setTimeout(initWelcome, 50); 
      return;
    }

    const welcomeText =
      "Welcome to YOUR CLUB. Please complete the registration form below to apply for membership.";

    let i = 0;
    displayEl.innerHTML = "";

    function typeWriter() {
      if (i < welcomeText.length) {
        displayEl.innerHTML += welcomeText.charAt(i);
        i++;

        let delay = 25;
        const c = welcomeText.charAt(i - 1);
        if (c === "," || c === ".") delay = 150;

        setTimeout(typeWriter, delay);
      } else {
        menuBtns.style.opacity = "1";
        menuBtns.style.pointerEvents = "auto";
        menuBtns.style.transition = "opacity 0.8s ease";
      }
    }

    typeWriter();
  }

  
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initWelcome);
  } else {
    initWelcome();
  }
})();
