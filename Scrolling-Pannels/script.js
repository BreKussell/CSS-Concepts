// ================================
//  Scroll-Driven Animation Script
// ================================

// root element to update CSS variables
const root = document.documentElement;

// sections we animate
const panelSection = document.querySelector(".panel-section");
const lettersSection = document.querySelector(".letters");
const flipSection = document.querySelector(".flip");

// Helper: returns scroll progress (0 → 1) for any section
function getProgress(section) {
  const rect = section.getBoundingClientRect();
  const progressRaw = -rect.top / rect.height;
  return Math.max(0, Math.min(1, progressRaw));
}

function onScroll() {
  // PANEL SPLIT + OVAL + ZOOM
  if (panelSection) {
    const p = getProgress(panelSection);
    root.style.setProperty("--scroll", p);
  }

  // FLOATING LETTERS SECTION
  if (lettersSection) {
    const p = getProgress(lettersSection);
    root.style.setProperty("--letters", p);
  }

  // 3D FLIP SECTION
  if (flipSection) {
    const p = getProgress(flipSection);
    root.style.setProperty("--flip", p);
  }
}

window.addEventListener("scroll", onScroll);
onScroll(); // run once on load
