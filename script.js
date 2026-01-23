const card = document.getElementById("card");
const noBtn = document.getElementById("no");
const yesBtn = document.getElementById("yes");
const msg = document.getElementById("msg");

let noScale = 1;
let yesScale = 1;

const noLines = [
  "No 🙄",
  "Are you sure? 😼",
  "Try again… 😏",
  "That button is shy 🥺",
  "Nope 😭",
  "Ok but… yes? 💘"
];
let noIndex = 0;

function placeNoNearButtons() {
  // Put "No" visually near the buttons row, but still absolute-positioned
  const r = card.getBoundingClientRect();
  // slightly right and near the bottom inside the card area
  noBtn.style.left = (r.left + r.width / 2 + 70) + "px";
  noBtn.style.top  = (r.top + r.height - 95) + "px";
}

function moveNoRandom() {
  const padding = 12;
  const bw = noBtn.offsetWidth;
  const bh = noBtn.offsetHeight;

  const x = Math.random() * (window.innerWidth  - bw - padding * 2) + padding;
  const y = Math.random() * (window.innerHeight - bh - padding * 2) + padding;

  noBtn.style.left = x + "px";
  noBtn.style.top  = y + "px";
}

function pressureEffect() {
  noScale  = Math.max(0.32, noScale - 0.10);
  yesScale = Math.min(1.75, yesScale + 0.08);

  noBtn.style.transform  = `scale(${noScale})`;
  yesBtn.style.transform = `scale(${yesScale})`;
}

function distanceToNo(cx, cy) {
  const r = noBtn.getBoundingClientRect();
  const x = r.left + r.width / 2;
  const y = r.top  + r.height / 2;
  const dx = cx - x;
  const dy = cy - y;
  return Math.sqrt(dx * dx + dy * dy);
}

// Mouse gets close => No shrinks, Yes grows
document.addEventListener("mousemove", (e) => {
  const dist = distanceToNo(e.clientX, e.clientY);
  if (dist < 130) pressureEffect();
});

// If she actually tries to hover/tap No => it panics
function panicNo() {
  pressureEffect();
  noIndex = (noIndex + 1) % noLines.length;
  noBtn.textContent = noLines[noIndex];
  moveNoRandom();
}

noBtn.addEventListener("mouseenter", panicNo);
noBtn.addEventListener("touchstart", (e) => {
  e.preventDefault();
  panicNo();
}, { passive: false });

yesBtn.addEventListener("click", () => {
  msg.textContent = "YAY!! 🥰🐱💘 Best answer ever.";
  noBtn.style.display = "none";
  yesBtn.textContent = "Submitted ✔️";

  // hearts
  for (let i = 0; i < 14; i++) {
    setTimeout(() => {
      const h = document.createElement("div");
      h.className = "heart";
      h.textContent = "💖";
      h.style.left = (window.innerWidth / 2 + (Math.random() * 140 - 70)) + "px";
      h.style.top  = (window.innerHeight / 2 + (Math.random() * 90  - 45)) + "px";
      document.body.appendChild(h);
      setTimeout(() => h.remove(), 1200);
    }, i * 40);
  }
});

window.addEventListener("resize", placeNoNearButtons);
placeNoNearButtons();
