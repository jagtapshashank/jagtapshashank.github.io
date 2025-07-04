// Smooth Scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// 👇 Set current year in footer
document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("current-year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});

// Apply theme on page load based on localStorage value
document.addEventListener("DOMContentLoaded", () => {
  const storedTheme = localStorage.getItem("theme") || "dark";
  applyTheme(storedTheme);

  setActiveLink();         // Set the active nav link
  observeSections();       // Observe sections for scroll-based highlighting
  updateTimelineContent(); // Set responsive content
  setupTimelineToggle();   // Enable timeline expand/collapse
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
    githubIcon.src = "/images/github.svg";
    linkedinIcon.src = "/images/linkedin.svg";
    icon.src = "/images/sun.svg";
    menuIcon.src = "/images/menu.svg";
    closeIcon.src = "/images/close.svg";
  } else {
    githubIcon.src = "/images/githubdark.svg";
    linkedinIcon.src = "/images/linkedindark.svg";
    icon.src = "/images/moon.svg";
    menuIcon.src = "/images/menu_white.svg";
    closeIcon.src = "/images/close_white.svg";
  }
}

// Toggle theme and store the preference in localStorage
const themeIcon = document.getElementById("icon_theme");
themeIcon.onclick = function () {
  const newTheme = document.body.classList.contains("darktheme") ? "light" : "dark";
  localStorage.setItem("theme", newTheme);
  applyTheme(newTheme);
};

// Set active nav link based on URL or hash
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
    if (homeLink) homeLink.classList.add("active");
  }

  if (!isActiveSet) {
    const projectLink = document.querySelector('.nav-links a[href="#project"]');
    if (projectLink) projectLink.classList.add("active");
  }
}

// Observe sections for scroll-based nav highlighting
function observeSections() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');

  const observerOptions = {
    root: null,
    threshold: 0.5
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const link = document.querySelector(`a[href="#${entry.target.id}"]`);

      if (entry.isIntersecting) {
        if (entry.target.id === 'about') {
          const homeLink = document.querySelector('.nav-links a[href="#home"]');
          homeLink?.classList.add('active');
        } else {
          navLinks.forEach(link => link.classList.remove('active'));
          link?.classList.add('active');
        }
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

// Responsive timeline text updates
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
    p.textContent = window.innerWidth <= 990
      ? p.getAttribute('data-small')
      : p.getAttribute('data-full');
  });

  schoolname.forEach(p => {
    p.textContent = window.innerWidth <= 690
      ? p.getAttribute('data-small')
      : p.getAttribute('data-full');
  });

  timelineDates.forEach(date => {
    date.textContent = window.innerWidth <= 768
      ? date.getAttribute('data-small')
      : date.getAttribute('data-full');
  });

  allH3.forEach(h3 => {
    h3.textContent = window.innerWidth <= 768
      ? h3.getAttribute('data-small')
      : h3.getAttribute('data-full');
  });

  allP.forEach(p => {
    p.textContent = window.innerWidth <= 768
      ? p.getAttribute('data-small')
      : p.getAttribute('data-full');
  });
}

window.addEventListener('resize', updateTimelineContent);

// 👇 New Function: Toggle Timeline Details
function setupTimelineToggle() {
  const timelineItems = document.querySelectorAll('.timeline-item');

  timelineItems.forEach(item => {
    item.addEventListener('click', function (e) {
      // Don't toggle if a link is clicked
      if (e.target.closest('a')) return;

      // Toggle this item's expanded state
      this.classList.toggle("expanded");

      // Optional: Only one open at a time
      timelineItems.forEach(i => i !== this && i.classList.remove('expanded'));
    });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".card");

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      const filter = button.getAttribute("data-filter");

      // Highlight the active button
      filterButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      projectCards.forEach(card => {
        const categories = card.getAttribute("data-category").split(" ");
        if (filter === "all" || categories.includes(filter)) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
});
