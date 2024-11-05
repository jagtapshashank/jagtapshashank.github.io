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

  setActiveLink(); // Set the active link based on the current URL or section
  observeSections(); // Start observing sections to update active links on scroll
});

// Function to apply the correct theme based on localStorage
function applyTheme(theme) {
  document.body.classList.toggle("darktheme", theme === "dark");

  // Update icon sources based on the theme
  const icon = document.getElementById("icon_theme");
  const githubIcon = document.querySelector('.social-icons div:nth-child(1) img');
  const linkedinIcon = document.querySelector('.social-icons div:nth-child(2) img');
  const menuIcon = document.getElementById("menu_icon");
  const closeIcon = document.getElementById("close_icon");

  if (theme === "dark") {
    githubIcon.src = "images/github.svg";
    linkedinIcon.src = "images/linkedin.svg";
    icon.src = "images/sun.svg";
    menuIcon.src = "images/menu.svg";
    closeIcon.src = "images/close.svg";
  } else {
    githubIcon.src = "images/githubdark.svg";
    linkedinIcon.src = "images/linkedindark.svg";
    icon.src = "images/moon.svg";
    menuIcon.src = "images/menu_white.svg";
    closeIcon.src = "images/close_white.svg";
  }
}

// Toggle theme and store the preference in localStorage
const themeIcon = document.getElementById("icon_theme");
themeIcon.onclick = function () {
  const newTheme = document.body.classList.contains("darktheme") ? "light" : "dark";
  localStorage.setItem("theme", newTheme);
  applyTheme(newTheme);
};

// Function to set the active link based on the URL or hash
function setActiveLink() {
  const navLinks = document.querySelectorAll(".nav-links a");
  const currentLocation = window.location.href;
  let isActiveSet = false;

  navLinks.forEach(link => {
    if (currentLocation.includes(link.getAttribute("href"))) {
      link.classList.add("active");
      isActiveSet = true;
    } else {
      link.classList.remove("active");
    }
  });

  if (!isActiveSet) {
    const homeLink = document.querySelector('.nav-links a[href="#home"]');
    if (homeLink) {
      homeLink.classList.add("active");
    }
  }

  if (!isActiveSet) {
    const projectLink = document.querySelector('.nav-links a[href="#project"]');
    if (projectLink) {
      projectLink.classList.add("active");
    }
  }
}

// Function to observe sections and update active links on scroll
function observeSections() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');

  const observerOptions = {
    root: null, // Use the viewport as the root
    threshold: 0.5 // Trigger when 60% of the section is in view
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const link = document.querySelector(`a[href="#${entry.target.id}"]`);

      if (entry.isIntersecting) {
        if (entry.target.id === 'about') {
          // If About section is in view, keep 'Home' underlined
          homeLink.classList.add('active');
        }else{
          navLinks.forEach(link => link.classList.remove('active'));
          link.classList.add('active');
        }
      }

      if (entry.isIntersecting) {
        if (entry.target.id === 'education') {
          // If About section is in view, keep 'Home' underlined
          experienceLink.classList.add('active');
        }else{
          navLinks.forEach(link => link.classList.remove('active'));
          link.classList.add('active');
        }
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

// Function to update the text of timeline content based on screen size
function updateTimelineContent() {
  const allH3 = document.querySelectorAll(
      '.timeline-content h3, .timeline-content-current h3'
  );
  const allP = document.querySelectorAll(
      '.timeline-content a, .timeline-content-current a'
  );
  const timelineDates = document.querySelectorAll(
      '.timeline-date, .timeline-date-current'
  );
  const schoolmajor = document.querySelectorAll(
      '.school-major a'
  );
  const schoolname = document.querySelectorAll(
      '.school-name p'
  );

  schoolmajor.forEach(p => {
    if (window.innerWidth <= 990) {
        p.textContent = p.getAttribute('data-small');
    } else {
        p.textContent = p.getAttribute('data-full');
    }
  });

  schoolname.forEach(p => {
    if (window.innerWidth <= 690) {
        p.textContent = p.getAttribute('data-small');
    } else {
        p.textContent = p.getAttribute('data-full');
    }
  });

  timelineDates.forEach(date => {
    if (window.innerWidth <= 768) {
        date.textContent = date.getAttribute('data-small');
    } else {
        date.textContent = date.getAttribute('data-full');
    }
  });

  allH3.forEach(h3 => {
      if (window.innerWidth <= 768) {
          h3.textContent = h3.getAttribute('data-small');
      } else {
          h3.textContent = h3.getAttribute('data-full');
      }
  });

  allP.forEach(p => {
      if (window.innerWidth <= 768) {
          p.textContent = p.getAttribute('data-small');
      } else {
          p.textContent = p.getAttribute('data-full');
      }
  });

}

// Run on window resize and page load
window.addEventListener('resize', updateTimelineContent);
document.addEventListener('DOMContentLoaded', updateTimelineContent);
