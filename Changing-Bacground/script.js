function updateBackground() {
  const now = new Date();
  const hour = now.getHours();

  // Hide all first
  document.getElementById("sunset").style.display = "none";
  document.getElementById("day").style.display = "none";
  document.getElementById("night").style.display = "none";

  // Logic for showing correct background
  if ((hour >= 5 && hour < 8) || (hour >= 17 && hour < 20)) { 
    document.getElementById("sunset").style.display = "block";
  } else if (hour >= 8 && hour < 17) {
    document.getElementById("day").style.display = "block";
  } else {
    document.getElementById("night").style.display = "block";
  }
}

// Run when page loads
updateBackground();

// Optional: check again every minute
setInterval(updateBackground, 60000);
