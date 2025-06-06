window.onload = function () {
  fetch('components/navbar.html')
    .then(res => res.text())
    .then(data => {
      const navbarContainer = document.getElementById('navbar-container');
      if (navbarContainer) {
        navbarContainer.innerHTML = data;

        // Now hook the hamburger
        const toggle = document.getElementById("menu-toggle");
        const links = document.getElementById("nav-links");

        if (toggle && links) {
          toggle.addEventListener("click", () => {
            links.classList.toggle("show");
          });
        }
      } else {
        console.error("Missing #navbar-container in HTML.");
      }
    })
    .catch(err => console.error("Failed to load navbar:", err));
};
