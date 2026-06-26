/* --- Config & Data Hub --- */
const CONFIG = {
  whatsappNumber: "1234567890", 
  
  carouselImages: [
    { src: "images/image4.png", caption: "Loading parcels securely onto our modern bus fleet." },
    { src: "images/image2.png", caption: "Safe, systematic handling at every bus stand." },
    { src: "images/image3.png", caption: "Fast intercity transit arriving on schedule." }
  ],

  features: [
    { title: "Fast Dispatch", text: "Parcels are loaded onto the very next available bus." },
    { title: "Trusted Handling", text: "Secure loading and unloading by experienced ground staff." },
    { title: "Local Expertise", text: "We know the bus schedules, routes, and stands perfectly." },
    { title: "Affordable Pricing", text: "Cost-effective rates based on actual parcel weight." }
  ],
  
  services: [
    { title: "Same-Day Intercity", text: "Send a parcel in the morning, delivered by evening." },
    { title: "Business Bulk", text: "Daily transport solutions for local merchants and retailers." },
    { title: "Fragile Care", text: "Special handling for electronics and delicate items." }
  ],
  
  steps: [
    { step: "1", title: "Share Details", text: "Provide parcel size, weight, and destination." },
    { step: "2", title: "Bus Assigned", text: "We confirm the exact bus number, driver contact, and timing." },
    { step: "3", title: "Dispatched", text: "Drop it at the stand or request pickup. We handle the rest." }
  ],

  faqs: [
    { q: "What items can be sent?", a: "We accept most dry goods, clothing, electronics, and documents. No hazardous materials." },
    { q: "How fast is delivery?", a: "Most deliveries are completed on the same day, typically within 4-8 hours depending on the route." },
    { q: "How do I track my parcel?", a: "We provide the bus driver's direct contact and exact arrival time for pickup at the destination." },
    { q: "Do you offer doorstep pickup?", a: "Yes, for an additional fee we can arrange local pickup to the bus stand." }
  ]
};

/* --- DOM Initialization --- */
document.addEventListener("DOMContentLoaded", () => {
  renderData();
  initCarousel();
  setupInteractions();
  setupObserver();
});

/* --- Render Data Modules --- */
function renderData() {
  const featuresGrid = document.getElementById("features-grid");
  CONFIG.features.forEach(f => {
    featuresGrid.innerHTML += `<div class="card"><h3>${f.title}</h3><p>${f.text}</p></div>`;
  });

  const servicesGrid = document.getElementById("services-grid");
  CONFIG.services.forEach(s => {
    servicesGrid.innerHTML += `<div class="card"><h3>${s.title}</h3><p>${s.text}</p></div>`;
  });

  const stepsContainer = document.getElementById("steps-container");
  CONFIG.steps.forEach(s => {
    stepsContainer.innerHTML += `
      <div class="step-card">
        <div class="step-number">${s.step}</div>
        <h3>${s.title}</h3>
        <p>${s.text}</p>
      </div>`;
  });

  const faqAccordion = document.getElementById("faq-accordion");
  CONFIG.faqs.forEach(faq => {
    faqAccordion.innerHTML += `
      <div class="faq-item">
        <button class="faq-question">${faq.q} <span>+</span></button>
        <div class="faq-answer"><p>${faq.a}</p></div>
      </div>`;
  });
}

/* --- Carousel Logic --- */
function initCarousel() {
  const wrapper = document.getElementById("carousel-wrapper");
  if(!wrapper) return;

  // Build HTML structure
  let slidesHTML = `<div class="carousel-track" id="carousel-track">`;
  let dotsHTML = `<div class="carousel-dots">`;
  
  CONFIG.carouselImages.forEach((img, index) => {
    slidesHTML += `
      <div class="carousel-slide">
        <img src="${img.src}" alt="${img.caption}" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'800\\' height=\\'500\\'><rect width=\\'100%\\' height=\\'100%\\' fill=\\'%23cbd5e1\\'/><text x=\\'50%\\' y=\\'50%\\' fill=\\'%2364748b\\' font-family=\\'Arial\\' font-size=\\'24\\' text-anchor=\\'middle\\' dy=\\'.3em\\'>Placeholder: ${img.caption}</text></svg>'">
        <div class="carousel-caption">${img.caption}</div>
      </div>`;
    dotsHTML += `<div class="dot ${index === 0 ? 'active' : ''}" data-index="${index}"></div>`;
  });
  
  slidesHTML += `</div>`;
  dotsHTML += `</div>`;
  
  wrapper.innerHTML = `
    ${slidesHTML}
    <button class="carousel-btn prev" id="carousel-prev">❮</button>
    <button class="carousel-btn next" id="carousel-next">❯</button>
    ${dotsHTML}
  `;

  // Carousel Mechanics
  const track = document.getElementById("carousel-track");
  const dots = document.querySelectorAll(".dot");
  let currentIndex = 0;
  const totalSlides = CONFIG.carouselImages.length;
  let autoplayInterval;

  const updateCarousel = () => {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach(d => d.classList.remove("active"));
    dots[currentIndex].classList.add("active");
  };

  const nextSlide = () => {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateCarousel();
  };

  const prevSlide = () => {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateCarousel();
  };

  const startAutoplay = () => autoplayInterval = setInterval(nextSlide, 4000);
  const resetAutoplay = () => { clearInterval(autoplayInterval); startAutoplay(); };

  document.getElementById("carousel-next").addEventListener("click", () => { nextSlide(); resetAutoplay(); });
  document.getElementById("carousel-prev").addEventListener("click", () => { prevSlide(); resetAutoplay(); });
  
  dots.forEach(dot => {
    dot.addEventListener("click", (e) => {
      currentIndex = parseInt(e.target.getAttribute("data-index"));
      updateCarousel();
      resetAutoplay();
    });
  });

  startAutoplay();
}

/* --- Logic & Interactions --- */
function setupInteractions() {
  // Mobile Menu Logic
  const menuToggle = document.getElementById("mobile-menu-toggle");
  const navLinks = document.getElementById("nav-links");

  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    menuToggle.textContent = navLinks.classList.contains("active") ? "✕" : "☰";
  });

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      menuToggle.textContent = "☰";
    });
  });

  // FAQ Logic
  document.getElementById("faq-accordion").addEventListener("click", (e) => {
    const btn = e.target.closest('.faq-question');
    if (!btn) return;
    const item = btn.parentElement;
    item.classList.toggle("active");
    btn.querySelector("span").textContent = item.classList.contains("active") ? "-" : "+";
  });

  // Scroll to Top Logic
  const backToTop = document.getElementById("back-to-top");
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) backToTop.classList.add("visible");
    else backToTop.classList.remove("visible");
    
    if (window.scrollY > 50) navbar.style.boxShadow = "var(--shadow-md)";
    else navbar.style.boxShadow = "var(--shadow-sm)";
  });

  // Booking Form Submission
  document.getElementById("booking-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const from = document.getElementById("from").value;
    const to = document.getElementById("to").value;
    const details = document.getElementById("parcel-details").value;
    const time = document.getElementById("time").value;

    const message = `*New Parcel Booking Request*%0A%0A*Name:* ${name}%0A*Phone:* ${phone}%0A*Route:* ${from} to ${to}%0A*Details:* ${details}%0A*Preferred Time:* ${time}%0A%0APlease confirm availability.`;
    
    window.open(`https://wa.me/${CONFIG.whatsappNumber}?text=${message}`, "_blank");
  });
}

/* --- Scroll Reveal Animation --- */
function setupObserver() {
  const reveals = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  reveals.forEach(reveal => observer.observe(reveal));
}