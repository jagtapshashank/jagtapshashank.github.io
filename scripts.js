// Smooth Scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

// Apply theme on page load based on localStorage value
document.addEventListener("DOMContentLoaded", () => {
  const storedTheme = localStorage.getItem("theme") || "light";
  applyTheme(storedTheme);
  
  setActiveLink(); // Set the active link based on the current page or section
  observeSections(); // Observe sections to update active links on scroll
});

// Function to set the active link based on the URL or hash
function setActiveLink() {
  const navLinks = document.querySelectorAll(".nav-links a");
  const currentLocation = window.location.href;
  let isActiveSet = false;

  // Loop through each link and add/remove the 'active' class
  navLinks.forEach(link => {
      if (currentLocation.includes(link.getAttribute("href"))) {
          link.classList.add("active");
          isActiveSet = true; // Track if any link is set active
      } else {
          link.classList.remove("active");
      }
  });

  // If no specific link is active, set 'Home' as the default active link
  if (!isActiveSet) {
    const homeLink = document.querySelector('.nav-links a[href="#home"]');
    if (homeLink) {
      homeLink.classList.add("active");
    }
  }
}

// Function to apply the correct theme based on localStorage
function applyTheme(theme) {
  document.body.classList.toggle("darktheme", theme === "dark");

  // Update icon based on the theme
  var icon = document.getElementById("icon_theme");
  var githubIcon = document.querySelector('.social-icons a:nth-child(1) img');
  var linkedinIcon = document.querySelector('.social-icons a:nth-child(2) img');
  var menuIcon = document.getElementById("menu_icon");
  var closeIcon = document.getElementById("close_icon");

  if (theme === "dark") {
      githubIcon.src = "images/github.svg";
      linkedinIcon.src = "images/linkedin.svg";
      icon.src = "images/sun.png"; // Show sun icon for dark theme
      menuIcon.src = "images/menu.svg"; // Dark theme menu icon
      closeIcon.src = "images/close.svg"; // Dark theme close icon
  } else {
      githubIcon.src = "images/githubdark.svg";
      linkedinIcon.src = "images/linkedindark.svg";
      icon.src = "images/moon.png"; // Show moon icon for light theme
      menuIcon.src = "images/menu_white.svg"; // Dark theme menu icon
      closeIcon.src = "images/close_white.svg"; // Dark theme close icon
  }
}

// Toggle theme and store the preference in localStorage
var icon = document.getElementById("icon_theme");
icon.onclick = function () {
  const newTheme = document.body.classList.contains("darktheme") ? "light" : "dark";
  localStorage.setItem("theme", newTheme);
  applyTheme(newTheme);
};