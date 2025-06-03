// Fondo animado de puntos conectados por líneas al estar cerca.
// Integra este archivo en tu HTML antes de </body> y añade <canvas id="bg-particles"></canvas> como primer hijo de <body> o con position:fixed z-index:-1.

(function() {
  // Configuración
  const POINTS = 80;           // Número de puntos
  const SPEED = 0.6;           // Velocidad máxima (px/frame)
  const LINE_DIST = 150;       // Distancia máxima para conectar puntos (px)
  const LINE_OPACITY = 0.25;   // Opacidad máxima de las líneas
  const POINT_RADIUS = 2.2;    // Radio de cada punto
  const COLOR = "#00ffff";     // Color de líneas y puntos

  // Canvas y dimensiones
  let canvas, ctx, width, height, dpr;

  function resizeCanvas() {
    dpr = window.devicePixelRatio || 1;
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    ctx.setTransform(1,0,0,1,0,0);
    ctx.scale(dpr, dpr);
  }

  // Genera puntos con posición y velocidad aleatoria
  function randomPoint() {
    const angle = Math.random() * 2 * Math.PI;
    const speed = Math.random() * SPEED + 0.1;
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed
    };
  }

  let points = [];
  function resetPoints() {
    points = [];
    for (let i = 0; i < POINTS; i++) points.push(randomPoint());
  }

  // Dibuja el fondo animado
  function draw() {
    ctx.clearRect(0, 0, width, height);

    // Líneas entre puntos cercanos
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const dx = points[i].x - points[j].x;
        const dy = points[i].y - points[j].y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < LINE_DIST) {
          ctx.save();
          ctx.globalAlpha = LINE_OPACITY * (1 - dist / LINE_DIST);
          ctx.strokeStyle = COLOR;
          ctx.lineWidth = 1.1;
          ctx.beginPath();
          ctx.moveTo(points[i].x, points[i].y);
          ctx.lineTo(points[j].x, points[j].y);
          ctx.stroke();
          ctx.restore();
        }
      }
    }

    // Dibuja los puntos
    for (const p of points) {
      ctx.save();
      ctx.globalAlpha = 1;
      ctx.fillStyle = COLOR;
      ctx.beginPath();
      ctx.arc(p.x, p.y, POINT_RADIUS, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  // Movimiento de los puntos
  function update() {
    for (const p of points) {
      p.x += p.vx;
      p.y += p.vy;
      // Rebote en los bordes
      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;
      // Mantener dentro del canvas
      p.x = Math.max(0, Math.min(width, p.x));
      p.y = Math.max(0, Math.min(height, p.y));
    }
  }

  // Loop de animación
  function animate() {
    update();
    draw();
    requestAnimationFrame(animate);
  }

  // Inicialización automática
  function initParticlesBackground() {
    // Crear canvas si no existe
    canvas = document.getElementById("bg-particles");
    if (!canvas) {
      canvas = document.createElement("canvas");
      canvas.id = "bg-particles";
      document.body.insertBefore(canvas, document.body.firstChild);
    }
    ctx = canvas.getContext("2d");
    resizeCanvas();
    resetPoints();

    // Canvas estilos: fondo, posición fija, z-index -1 para no tapar contenido
    Object.assign(canvas.style, {
      position: "fixed",
      top: 0, left: 0, width: "100vw", height: "100vh",
      zIndex: "-1", pointerEvents: "none", background: "transparent"
    });

    window.addEventListener("resize", () => {
      resizeCanvas();
      resetPoints();
    });

    animate();
  }

  // Esperar que cargue el DOM
  if (document.readyState === "complete" || document.readyState === "interactive") {
    setTimeout(initParticlesBackground, 1);
  } else {
    document.addEventListener("DOMContentLoaded", initParticlesBackground);
  }
})();
