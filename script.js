const bar = document.getElementById("gradientBar");

window.addEventListener("mousemove", (e) => {
  const x = e.clientX / window.innerWidth; // 0 → 1
  const percent = x * 100;

  // Fixed width for the orange band
  const bandWidth = 15; // percentage width of the orange band

  let start = percent - bandWidth / 2;
  let end = percent + bandWidth / 2;

  // Clamp values to stay within 0–100%
  if (start < 0) {
    end -= start;
    start = 0;
  }
  if (end > 100) {
    start -= (end - 100);
    end = 100;
  }

  bar.style.background = `linear-gradient(90deg,
    blue 0%,
    blue ${start}%,
    orange ${start}%,
    orange ${end}%,
    purple ${end}%,
    purple 100%)`;
});
