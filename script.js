const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector("#navMenu");
const tabs = document.querySelectorAll(".tab");
const serviceCards = document.querySelectorAll(".service-card");
const reveals = document.querySelectorAll(".reveal");
const backTop = document.querySelector(".back-top");
const form = document.querySelector("#contactForm");
const formNote = document.querySelector("#formNote");

document.querySelector("#year").textContent = new Date().getFullYear();

navToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((item) => item.classList.remove("active"));
    tab.classList.add("active");

    const filter = tab.dataset.filter;
    serviceCards.forEach((card) => {
      const shouldShow = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("hidden", !shouldShow);
    });
  });
});

const testimonials = [
  {
    quote: "Twin Y helped me print, bind, and arrange my report quickly. The final work looked clean and professional.",
    name: "Amina K.",
    role: "College Student"
  },
  {
    quote: "They designed my business flyer and printed copies the same day. The colors were bright and the layout was easy to read.",
    name: "Joseph M.",
    role: "Small Business Owner"
  },
  {
    quote: "I buy office stationery here because the service is reliable and they always help with last-minute document work.",
    name: "Neema S.",
    role: "Office Administrator"
  }
];

let testimonialIndex = 0;
const quote = document.querySelector("#testimonialQuote");
const person = document.querySelector("#testimonialName");
const role = document.querySelector("#testimonialRole");

function showTestimonial(index) {
  const current = testimonials[index];
  quote.textContent = current.quote;
  person.textContent = current.name;
  role.textContent = current.role;
}

document.querySelector("#prevTestimonial").addEventListener("click", () => {
  testimonialIndex = (testimonialIndex - 1 + testimonials.length) % testimonials.length;
  showTestimonial(testimonialIndex);
});

document.querySelector("#nextTestimonial").addEventListener("click", () => {
  testimonialIndex = (testimonialIndex + 1) % testimonials.length;
  showTestimonial(testimonialIndex);
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

reveals.forEach((item) => observer.observe(item));

window.addEventListener("scroll", () => {
  backTop.classList.toggle("visible", window.scrollY > 600);
});

backTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(form);
  const name = String(data.get("name")).trim();
  const contact = String(data.get("contact")).trim();
  const need = String(data.get("need")).trim();
  const message = String(data.get("message")).trim();

  if (!name || !contact || !need) {
    formNote.textContent = "Please fill in your name, contact, and service needed.";
    return;
  }

  const whatsappText = encodeURIComponent(
    `Hello Twin Y, my name is ${name}. I need help with ${need}. Contact: ${contact}. Message: ${message || "No extra message."}`
  );

  formNote.innerHTML = `Message ready. <a href="https://wa.me/251941528216?text=${whatsappText}" target="_blank" rel="noopener">Open WhatsApp</a>`;
  form.reset();
});
