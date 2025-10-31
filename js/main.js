// ===================================
// Navigation Toggle for Mobile
// ===================================
const navToggle = document.getElementById("navToggle")
const navMenu = document.getElementById("navMenu")
const navLinks = document.querySelectorAll(".nav-link")

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active")

  // Animate hamburger icon
  const spans = navToggle.querySelectorAll("span")
  if (navMenu.classList.contains("active")) {
    spans[0].style.transform = "rotate(45deg) translateY(10px)"
    spans[1].style.opacity = "0"
    spans[2].style.transform = "rotate(-45deg) translateY(-10px)"
  } else {
    spans[0].style.transform = "none"
    spans[1].style.opacity = "1"
    spans[2].style.transform = "none"
  }
})

// Close mobile menu when clicking on a link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active")
    const spans = navToggle.querySelectorAll("span")
    spans[0].style.transform = "none"
    spans[1].style.opacity = "1"
    spans[2].style.transform = "none"
  })
})

// ===================================
// Navbar Scroll Effect
// ===================================
const navbar = document.getElementById("navbar")
let lastScroll = 0

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset

  // Add scrolled class for styling
  if (currentScroll > 50) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }

  lastScroll = currentScroll
})

// ===================================
// Smooth Scroll for Navigation Links
// ===================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))

    if (target) {
      const offsetTop = target.offsetTop - 70 // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
  })
})

// ===================================
// Back to Top Button
// ===================================
const backToTopBtn = document.getElementById("backToTop")

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    backToTopBtn.classList.add("visible")
  } else {
    backToTopBtn.classList.remove("visible")
  }
})

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
})

// ===================================
// Scroll Animations (Intersection Observer)
// ===================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe all cards and sections
const animatedElements = document.querySelectorAll(
  ".owner-card, .component-card, .stage-card, .future-card, .diagram-card, .content-box",
)

animatedElements.forEach((el) => {
  el.style.opacity = "0"
  el.style.transform = "translateY(30px)"
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  observer.observe(el)
})

// ===================================
// Copy Code Functionality
// ===================================
function copyCode() {
  const codeBlock = document.querySelector(".code-block code")
  const copyBtn = document.querySelector(".copy-btn")

  if (codeBlock) {
    const textArea = document.createElement("textarea")
    textArea.value = codeBlock.textContent
    document.body.appendChild(textArea)
    textArea.select()

    try {
      document.execCommand("copy")

      // Change button text temporarily
      const originalHTML = copyBtn.innerHTML
      copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!'
      copyBtn.style.backgroundColor = "#10b981"

      setTimeout(() => {
        copyBtn.innerHTML = originalHTML
        copyBtn.style.backgroundColor = ""
      }, 2000)
    } catch (err) {
      console.error("Failed to copy code:", err)
    }

    document.body.removeChild(textArea)
  }
}

// ===================================
// Active Navigation Link Highlighting
// ===================================
const sections = document.querySelectorAll("section[id]")

function highlightNavigation() {
  const scrollY = window.pageYOffset

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight
    const sectionTop = section.offsetTop - 100
    const sectionId = section.getAttribute("id")
    const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`)

    if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach((link) => link.classList.remove("active"))
      navLink.classList.add("active")
    }
  })
}

window.addEventListener("scroll", highlightNavigation)

// ===================================
// Parallax Effect for Hero Section
// ===================================
const hero = document.querySelector(".hero")

window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  if (hero) {
    hero.style.transform = `translateY(${scrolled * 0.5}px)`
  }
})

// ===================================
// Counter Animation for Stats (if needed)
// ===================================
function animateCounter(element, target, duration = 2000) {
  let start = 0
  const increment = target / (duration / 16)

  const timer = setInterval(() => {
    start += increment
    if (start >= target) {
      element.textContent = target
      clearInterval(timer)
    } else {
      element.textContent = Math.floor(start)
    }
  }, 16)
}

// ===================================
// Initialize on Page Load
// ===================================
document.addEventListener("DOMContentLoaded", () => {
  console.log("[v0] Clean Drive RPDA - Interactive features loaded")

  // Add smooth entrance animation to hero content
  const heroContent = document.querySelector(".hero-content")
  if (heroContent) {
    setTimeout(() => {
      heroContent.style.opacity = "1"
      heroContent.style.transform = "translateY(0)"
    }, 100)
  }
})

// ===================================
// Prevent Default Form Submission (for demo)
// ===================================
const forms = document.querySelectorAll("form")
forms.forEach((form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault()
    alert("Form submission is disabled in this demo. In production, this would send your message.")
  })
})
