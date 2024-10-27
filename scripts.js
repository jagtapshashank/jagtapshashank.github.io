// Smooth Scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

var icon = document.getElementById("icon_theme");
icon.onclick = function () {
    document.body.classList.toggle("darktheme");

    // Change the icons
    var githubIcon = document.querySelector('.social-icons a:nth-child(1) img');
    var linkedinIcon = document.querySelector('.social-icons a:nth-child(2) img');
    
    // Check the current state and change the icons accordingly
    if (document.body.classList.contains("darktheme")) {
        // Change to alternative logos for dark theme
        githubIcon.src = "images/github.svg";
        linkedinIcon.src = "images/linkedin.svg";
        icon.src = "images/sun.png"; // Change the moon icon to an alternative
    } else {
        // Change back to original logos for light theme
        githubIcon.src = "images/githubdark.svg";
        linkedinIcon.src = "images/linkedindark.svg";
        icon.src = "images/moon.png"; // Change the moon icon back to original
    }
};
