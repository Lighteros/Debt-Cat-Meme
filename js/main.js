const CONTRACT_ADDRESS = "";

const links = {
  x: "https://x.com/DEBTCAT_SOL",
  phantom: "https://phantom.app/",
  pumpswap: CONTRACT_ADDRESS
    ? `https://swap.pump.fun/?input=So11111111111111111111111111111111111111112&output=${CONTRACT_ADDRESS}`
    : "https://swap.pump.fun/",
  dexscreener: CONTRACT_ADDRESS
    ? `https://dexscreener.com/solana/${CONTRACT_ADDRESS}`
    : "https://dexscreener.com/solana/",
  embed: CONTRACT_ADDRESS
    ? `https://dexscreener.com/solana/${CONTRACT_ADDRESS}?embed=1&loadChartSettings=0&trades=0&tabs=0&info=0&chartLeftToolbar=0&chartTheme=light&theme=light&chartStyle=0&chartType=usd&interval=15`
    : "https://dexscreener.com/solana?embed=1&loadChartSettings=0&trades=0&tabs=0&info=0&chartLeftToolbar=0&chartTheme=light&theme=light&chartStyle=0&chartType=usd&interval=15"
};

function bindLinks() {
  const map = {
    "nav-buy": links.pumpswap,
    "hero-buy": links.pumpswap,
    "step-buy": links.pumpswap,
    "join-buy": links.pumpswap,
    "nav-dex": links.dexscreener,
    "hero-chart": links.dexscreener,
    "step-chart": links.dexscreener,
    "join-dex": links.dexscreener
  };

  Object.entries(map).forEach(([id, href]) => {
    const node = document.getElementById(id);
    if (node) node.href = href;
  });

  const embed = document.getElementById("dex-embed");
  if (embed) embed.src = links.embed;

  const ca = document.getElementById("ca-text");
  if (ca) ca.textContent = CONTRACT_ADDRESS || "TBA";
}

function setupCopy() {
  const btn = document.getElementById("copy-ca");
  if (!btn) return;
  btn.addEventListener("click", async () => {
    const value = CONTRACT_ADDRESS || "TBA";
    try {
      await navigator.clipboard.writeText(value);
      btn.textContent = "Copied";
    } catch {
      btn.textContent = "Failed";
    }
    setTimeout(() => {
      btn.textContent = "Copy";
    }, 1400);
  });
}

function setupNav() {
  const nav = document.querySelector(".nav");
  const toggle = document.querySelector(".nav-toggle");
  const drawer = document.querySelector(".mobile-drawer");

  window.addEventListener("scroll", () => {
    nav.classList.toggle("compact", window.scrollY > 24);
  }, { passive: true });

  toggle.addEventListener("click", () => {
    const open = !drawer.hasAttribute("hidden");
    if (open) drawer.setAttribute("hidden", "");
    else drawer.removeAttribute("hidden");
  });

  drawer.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => drawer.setAttribute("hidden", ""));
  });
}

function setupCursor() {
  const glow = document.querySelector(".cursor-glow");
  if (!glow || window.matchMedia("(pointer: coarse)").matches) return;
  window.addEventListener("pointermove", (event) => {
    glow.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
  }, { passive: true });
}

function setupTicker() {
  const node = document.getElementById("debt-ticker");
  if (!node) return;
  let value = 36000000000000;
  const tick = () => {
    value += Math.floor(Math.random() * 18000000 + 4000000);
    node.textContent = `$${value.toLocaleString("en-US")}`;
  };
  tick();
  setInterval(tick, 1600);
}

function setupDrift() {
  const canvas = document.getElementById("drift");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const dots = [];
  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  resize();
  window.addEventListener("resize", resize);

  for (let i = 0; i < 36; i += 1) {
    dots.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.8 + 0.4,
      s: Math.random() * 0.28 + 0.08
    });
  }

  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(18,18,18,0.22)";
    dots.forEach((dot) => {
      dot.y -= dot.s;
      if (dot.y < -8) {
        dot.y = canvas.height + 8;
        dot.x = Math.random() * canvas.width;
      }
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
      ctx.fill();
    });
    requestAnimationFrame(draw);
  };
  draw();
}

bindLinks();
setupCopy();
setupNav();
setupCursor();
setupTicker();
setupDrift();
