const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => [...r.querySelectorAll(s)];

$("#year").textContent = new Date().getFullYear();

const menu = $(".menu");
const navLinks = $(".nav-links");
menu?.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  document.body.classList.toggle("menu-open");
});
$$(".nav-links a").forEach(a => a.addEventListener("click", () => {
  navLinks.classList.remove("open");
  document.body.classList.remove("menu-open");
}));

$$(".filter").forEach(btn => {
  btn.addEventListener("click", () => {
    $$(".filter").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.dataset.filter;
    $$(".tile").forEach(tile => {
      tile.classList.toggle("hidden", filter !== "all" && tile.dataset.category !== filter);
    });
  });
});

const lightbox = $(".lightbox");
const lbImg = $(".lightbox img");
const lbCaption = $(".lightbox-caption");
$$(".tile").forEach(tile => {
  tile.addEventListener("click", () => {
    lbImg.src = $("img", tile).src;
    lbImg.alt = $("img", tile).alt;
    lbCaption.textContent = $("figcaption", tile)?.textContent || "";
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
  });
});
const closeLightbox = () => {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  lbImg.src = "";
};
$(".close").addEventListener("click", closeLightbox);
lightbox.addEventListener("click", e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") closeLightbox(); });

const form = $("#enquiryForm");
form.addEventListener("submit", e => {
  e.preventDefault();
  const data = new FormData(form);
  const text = `Hello Sreekesh!%0A%0AName: ${encodeURIComponent(data.get("name"))}%0APhone: ${encodeURIComponent(data.get("phone"))}%0AEmail: ${encodeURIComponent(data.get("email") || "Not provided")}%0AShoot type: ${encodeURIComponent(data.get("type"))}%0A%0AEnquiry:%0A${encodeURIComponent(data.get("message"))}`;
  // Replace 919999999999 with your real WhatsApp number before publishing.
  window.open(`https://wa.me/919999999999?text=${text}`, "_blank");
});

const glow = $(".cursor-glow");
window.addEventListener("pointermove", e => {
  if (glow) {
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
  }
});
