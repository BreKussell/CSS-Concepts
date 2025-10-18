const bar = document.getElementById("gradientBar");

window.addEventListener("mousemove", (e) => {
  const x = e.clientX / window.innerWidth; // 0 → 1
  const percent = x * 100;

  // Width of the orange/yellow band
  const bandWidth = 15;

  let start = percent - bandWidth / 2;
  let end = percent + bandWidth / 2;

  // Clamp to 0–100%
  if (start < 0) {
    end -= start;
    start = 0;
  }
  if (end > 100) {
    start -= (end - 100);
    end = 100;
  }

  // Use soft transitions: fade from blue → yellow → purple
  bar.style.background = `linear-gradient(90deg,
    blue 0%,
    blue ${start - 10}%,
    yellow ${start}%,
    orange ${end}%,
    purple ${end + 10}%,
    purple 100%)`;
});


window.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".card").forEach(card => {
      
      //Active Button 
      const buttons = card.querySelectorAll(".open, .closed");
      if (buttons.length) {
        const randomIndex = Math.floor(Math.random() * buttons.length);
        buttons.forEach((btn, i) => {
          btn.classList.toggle("active", i === randomIndex);
        });
      }

      //Percentage Bar 
      const fill = card.querySelector(".progress-fill");
      const text = card.querySelector(".progress-text");
      if (fill && text) {
        const percent = Math.floor(Math.random() * 101);
        
        fill.style.width = percent + "%";
        text.textContent = percent + "%";

        if (percent === 100) {
          fill.style.background = "green";
        } else if (percent < 50) {
          fill.style.background = "red";
        } else {
          fill.style.background = "blue";
        }
      }
    });
  });
