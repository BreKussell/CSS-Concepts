// ================================
//  Scroll-Driven Animation Script
// ================================

// root element to update CSS variables
const root = document.documentElement;

// sections
const lettersSection = document.querySelector(".letters");
const flipSection = document.querySelector(".flip");
const card8 = document.querySelector(".zoom-target");

// length of the pinned scroll scene
const totalScroll = 4000; // px of spacer height

// ================================
//  MAIN SCROLL HANDLER
// ================================
function onScroll() {

  //-----------------------------------------
  //  PANEL SECTION: SPLIT → OVAL → ZOOM
  //-----------------------------------------
  const progress = window.scrollY / totalScroll; // 0 → 1
  const p = Math.max(0, Math.min(1, progress));

  // ---- PHASE 1 — Split panels (0 → 0.66) ----
  const splitEnd = 0.66;
  const splitP = Math.min(p / splitEnd, 1);
  root.style.setProperty("--split", splitP);

  // ---- PHASE 2 — Oval opening (0.66 → 0.90) ----
  let ovalP = 0;
  if (p > splitEnd) {
    ovalP = Math.min((p - splitEnd) / (0.90 - splitEnd), 1);
  }
  root.style.setProperty("--oval", ovalP);

  // ---- PHASE 3 — Zoom (0.90 → 1.00) ----
  let zoomP = 0;
  if (p > 0.90) {
    zoomP = Math.min((p - 0.90) / (1 - 0.90), 1);
  }
  root.style.setProperty("--zoom", zoomP);


  //-----------------------------------------
  //  FLOATING LETTERS SECTION
  //-----------------------------------------
  if (lettersSection) {
    const rect = lettersSection.getBoundingClientRect();
    const lp = -rect.top / window.innerHeight;
    const lettersP = Math.max(0, Math.min(1, lp));
    root.style.setProperty("--letters", lettersP);

    document.querySelectorAll(".floating-words span").forEach(span => {
      span.style.setProperty("--randX", Math.random());
    });
  }


  //-----------------------------------------
  //  FLIP SECTION + CARD 8 ZOOM
  //-----------------------------------------
  if (flipSection) {
    const rect = flipSection.getBoundingClientRect();
    const viewH = window.innerHeight;

    const inView = rect.bottom > 0 && rect.top < viewH;

    if (!inView) {
      root.style.setProperty("--flip", 0);
      root.style.setProperty("--zoom2", 0);
      document.body.classList.remove("is-zooming-card");
    } else {
      const fp = -rect.top / viewH;
      const flipP = Math.max(0, Math.min(1, fp));
      root.style.setProperty("--flip", flipP);

      const zoomStart = 1;
      let z = 0;
      if (flipP > zoomStart) {
        z = Math.min((flipP - zoomStart) / (1 - zoomStart), 1);
      }
      root.style.setProperty("--zoom2", z);

      if (z > 0.01) {
        document.body.classList.add("is-zooming-card");
      } else {
        document.body.classList.remove("is-zooming-card");
      }
    }
  }
}


// Attach & run once
window.addEventListener("scroll", onScroll);
onScroll();
