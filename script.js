const scrollTrigger = document.querySelector("[data-scroll-to]");
const contactSection = document.getElementById("contact");
const yearTarget = document.getElementById("year");

if (scrollTrigger && contactSection) {
  scrollTrigger.addEventListener("click", (event) => {
    event.preventDefault();
    contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

if (yearTarget) {
  yearTarget.textContent = new Date().getFullYear();
}
