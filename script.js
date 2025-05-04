document.addEventListener("DOMContentLoaded", () => {
  // Mobile Navigation Toggle
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (navToggle) {
    navToggle.addEventListener("click", () => {
      navToggle.classList.toggle("active");
      navMenu.classList.toggle("active");
    });
  }

  // Close mobile menu when clicking on a nav link
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const headerHeight = document.querySelector(".header").offsetHeight;
        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.pageYOffset -
          headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Header scroll effect
  const header = document.querySelector(".header");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Form validation
  const contactForm = document.querySelector(".contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Basic form validation
      const nameInput = document.getElementById("name");
      const emailInput = document.getElementById("email");
      const messageInput = document.getElementById("message");
      let isValid = true;

      if (!nameInput.value.trim()) {
        isValid = false;
        nameInput.style.borderColor = "var(--color-secondary)";
      } else {
        nameInput.style.borderColor = "var(--color-gray-light)";
      }

      if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
        isValid = false;
        emailInput.style.borderColor = "var(--color-secondary)";
      } else {
        emailInput.style.borderColor = "var(--color-gray-light)";
      }

      if (!messageInput.value.trim()) {
        isValid = false;
        messageInput.style.borderColor = "var(--color-secondary)";
      } else {
        messageInput.style.borderColor = "var(--color-gray-light)";
      }

      if (isValid) {
        // Form submission logic would go here
        alert("Thank you for your message! I will get back to you soon.");
        contactForm.reset();
      } else {
        alert("Please fill out all required fields correctly.");
      }
    });
  }

  // Email validation helper function
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Animation on scroll
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(
      ".service-card, .about-content, .contact-content, .portfolio-item, .resume-section, .skill-progress, .resume-header, .education-item, .timeline-item"
    );

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementPosition < windowHeight - 100) {
        element.style.opacity = "1";
        element.style.transform = element.classList.contains("skill-progress")
          ? element.style.transform
          : "translateY(0)";
      }
    });
  };

  // Set initial styles for animation
  document
    .querySelectorAll(
      ".service-card, .about-content, .contact-content, .portfolio-item, .resume-section, .resume-header, .education-item, .timeline-item"
    )
    .forEach((element) => {
      element.style.opacity = "0";
      element.style.transform = "translateY(20px)";
      element.style.transition = "opacity 0.8s ease, transform 0.8s ease";
    });

  // Initialize skill progress bars with 0 width
  document.querySelectorAll(".skill-progress").forEach((element) => {
    const width = element.style.width;
    element.style.width = "0";
    element.dataset.width = width;
  });

  // Animate skill bars on scroll
  const animateSkillBars = () => {
    const skillBars = document.querySelectorAll(".skill-progress");

    skillBars.forEach((bar) => {
      const barPosition = bar.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (barPosition < windowHeight - 100) {
        bar.style.width = bar.dataset.width;
      }
    });
  };

  // Run animation on page load and scroll
  window.addEventListener("load", () => {
    animateOnScroll();
    animateSkillBars();
  });

  window.addEventListener("scroll", () => {
    animateOnScroll();
    animateSkillBars();
  });

  // Hero Slider Functionality
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  let currentSlide = 0;
  let slideInterval;

  // Initialize slider
  function initSlider() {
    if (slides.length > 0) {
      // Start automatic slideshow
      startSlideshow();

      // Add event listeners for manual navigation
      if (prevBtn) {
        prevBtn.addEventListener("click", () => {
          clearInterval(slideInterval);
          changeSlide(currentSlide - 1);
          startSlideshow();
        });
      }

      if (nextBtn) {
        nextBtn.addEventListener("click", () => {
          clearInterval(slideInterval);
          changeSlide(currentSlide + 1);
          startSlideshow();
        });
      }

      // Add event listeners for dots
      dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
          clearInterval(slideInterval);
          changeSlide(index);
          startSlideshow();
        });
      });
    }
  }

  // Change slide
  function changeSlide(index) {
    // Remove active class from current slide and dot
    slides[currentSlide].classList.remove("active");
    dots[currentSlide].classList.remove("active");

    // Calculate new index (loop back if needed)
    currentSlide = index;
    if (currentSlide < 0) {
      currentSlide = slides.length - 1;
    } else if (currentSlide >= slides.length) {
      currentSlide = 0;
    }

    // Add active class to new slide and dot
    slides[currentSlide].classList.add("active");
    dots[currentSlide].classList.add("active");
  }

  // Start automatic slideshow
  function startSlideshow() {
    slideInterval = setInterval(() => {
      changeSlide(currentSlide + 1);
    }, 5000); // Change slide every 5 seconds
  }

  // Portfolio Filter Functionality
  const filterBtns = document.querySelectorAll(".filter-btn");
  const portfolioItems = document.querySelectorAll(".portfolio-item");

  // Initialize portfolio filter
  function initPortfolioFilter() {
    if (filterBtns.length > 0) {
      filterBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          // Remove active class from all buttons
          filterBtns.forEach((btn) => btn.classList.remove("active"));

          // Add active class to clicked button
          btn.classList.add("active");

          // Get filter value
          const filterValue = btn.getAttribute("data-filter");

          // Filter portfolio items
          portfolioItems.forEach((item) => {
            if (
              filterValue === "all" ||
              item.getAttribute("data-category") === filterValue
            ) {
              item.style.display = "block";
              setTimeout(() => {
                item.style.opacity = "1";
                item.style.transform = "translateY(0)";
              }, 100);
            } else {
              item.style.opacity = "0";
              item.style.transform = "translateY(20px)";
              setTimeout(() => {
                item.style.display = "none";
              }, 500);
            }
          });

          // Arrange visible items in rows
          arrangePortfolioItems();
        });
      });
    }
  }

  // Function to arrange portfolio items in rows
  function arrangePortfolioItems() {
    const visibleItems = Array.from(portfolioItems).filter(
      (item) => item.style.display !== "none"
    );

    // Reset margins to ensure proper alignment
    portfolioItems.forEach((item) => {
      item.style.marginRight = "";
      item.style.marginLeft = "";
    });
  }

  // Call arrange function on window resize
  window.addEventListener("resize", arrangePortfolioItems);

  // Initial arrangement
  window.addEventListener("load", arrangePortfolioItems);

  // Logo Upload Functionality
  const logoUpload = document.getElementById("logo-upload");
  const logoImg = document.getElementById("logo-img");

  function initLogoUpload() {
    if (logoUpload && logoImg) {
      logoUpload.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            logoImg.src = e.target.result;

            // Save to localStorage for persistence
            localStorage.setItem("pandaIQ_logo", e.target.result);
          };
          reader.readAsDataURL(file);
        }
      });

      // Check if there's a saved logo in localStorage
      const savedLogo = localStorage.getItem("pandaIQ_logo");
      if (savedLogo) {
        logoImg.src = savedLogo;
      }
    }
  }

  // Initialize all new functionalities
  initSlider();
  initPortfolioFilter();
  initLogoUpload();
});
