    // --- Script del color picker ---
    const colorPicker = document.getElementById('colorPicker');
    colorPicker.addEventListener('input', function() {
      document.body.style.background = colorPicker.value;
    });
    function resetColor() {
      document.body.style.background = "";
      colorPicker.value = "#0f0c29";
    }

    const fullscreenImage = document.getElementById("fullscreenImage");
    const menu = document.getElementById("menu");
    const settingsPanel = document.getElementById("settingsPanel");
    const toggleSettingsBtn = document.getElementById("toggleSettings");
    function updateAjustesButton() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
      if (scrollTop < 2) {
        toggleSettingsBtn.classList.remove('compact');
      } else {
        toggleSettingsBtn.classList.add('compact');
      }
    }
    window.addEventListener('scroll', updateAjustesButton, {passive:true});
    document.addEventListener('scroll', updateAjustesButton, {passive:true});
    document.body.addEventListener('scroll', updateAjustesButton, {passive:true});
    document.addEventListener('DOMContentLoaded', updateAjustesButton);
    document.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      fullscreenImage.classList.toggle("hidden");

      const logo = document.getElementById("buscador-logo-img");

      // Si fullscreenImage acaba de esconderse (tiene la clase hidden)
      if (fullscreenImage.classList.contains("hidden")) {
        if (logo) {
          // Quita animaciones anteriores
          logo.classList.remove("animate__animated", "animate__rubberBand");
          void logo.offsetWidth; // reinicia animación
          // Aplica la nueva animación
          logo.classList.add("animate__animated", "animate__rubberBand");
        }
      }
    }
  });
    toggleSettingsBtn.addEventListener("click", () => {
      if (settingsPanel.classList.contains("show")) {
        settingsPanel.classList.remove("show");
        setTimeout(() => {
          menu.classList.remove("hidden");
          menu.classList.remove("fade-out");
          menu.classList.add("fade-in");
          setTimeout(() => {
            menu.classList.remove("fade-in");
          }, 500);
        }, 50);
      } else {
        menu.classList.remove("fade-out");
        menu.classList.add("fade-out");
        setTimeout(() => {
          menu.classList.add("hidden");
          menu.classList.remove("fade-out");
          settingsPanel.classList.add("show");
        }, 500);
      }
    });
    function applySettings() {
      const newTitle = document.getElementById("titleInput").value;
      const newImage = document.getElementById("imageInput").value;
      if (newTitle.trim()) document.title = newTitle;
      if (newImage.trim()) fullscreenImage.src = newImage;
      settingsPanel.classList.remove("show");
      setTimeout(() => {
        menu.classList.remove("hidden");
        menu.classList.remove("fade-out");
        menu.classList.add("fade-in");
        setTimeout(() => {
          menu.classList.remove("fade-in");
        }, 500);
      }, 50);
    }
    function setDefaultTitle() {
      document.getElementById("titleInput").value = "";
      document.title = "Classroom";
    }
    function setDefaultImage() {
      document.getElementById("imageInput").value = "";
      document.getElementById("fullscreenImage").src = "images/screen1.jpg";
    }
    function openAboutBlankIframe() {
      const nuevaPestana = window.open('about:blank', '_blank');
      if (nuevaPestana) {
        nuevaPestana.document.write(`
          <html>
            <head>
              <title>Classroom</title>
              <link rel="icon" href="https://ssl.gstatic.com/classroom/favicon.png" type="image/png">
              <style>
                body, html { margin:0; padding:0; height:100%; overflow:hidden; background:#111; }
                iframe { border:none; width:100vw; height:100vh; display:block; }
              </style>
            </head>
            <body>
              <iframe src="https://merx111.github.io/" allow="autoplay; fullscreen"></iframe>
            </body>
          </html>
        `);
        nuevaPestana.document.close();
      }
    }
    function abrirEnIframe(url) {
      const nuevaPestana = window.open('about:blank', '_blank');
      if (nuevaPestana) {
        nuevaPestana.document.write(`
          <html>
            <head>
              <title>Classroom</title>
              <link rel="icon" href="https://ssl.gstatic.com/classroom/favicon.png" type="image/png">
              <style>
                body, html { margin:0; padding:0; height:100%; overflow:hidden; background:#111; }
                iframe { border:none; width:100vw; height:100vh; display:block; }
              </style>
            </head>
            <body>
              <iframe src="${url}" allow="autoplay; fullscreen"></iframe>
            </body>
          </html>
        `);
        nuevaPestana.document.close();
      }
    }
    function scrollRow(row, dir) {
      const rowEl = document.getElementById(row + '-row');
      if (!rowEl) return;
      const button = rowEl.querySelector('.menu-button');
      if (!button) return;
      const gap = 40;
      let buttonWidth = button.offsetWidth || 220;
      let scrollAmount = buttonWidth + gap;
      rowEl.scrollBy({ left: scrollAmount * dir, behavior: 'smooth' });
      setTimeout(() => updateArrows(row), 340);
    }
    function updateArrows(row) {
      const rowEl = document.getElementById(row + '-row');
      const leftArrow = document.getElementById(row + '-arrow-left');
      const rightArrow = document.getElementById(row + '-arrow-right');
      if (!rowEl || !leftArrow || !rightArrow) return;
      const canScroll = rowEl.scrollWidth > rowEl.clientWidth + 2;
      const atStart = Math.abs(rowEl.scrollLeft) < 4;
      const atEnd = rowEl.scrollLeft + rowEl.clientWidth >= rowEl.scrollWidth - 4;
      if (canScroll) {
        leftArrow.classList.toggle('visible', !atStart);
        rightArrow.classList.toggle('visible', !atEnd);
      } else {
        leftArrow.classList.remove('visible');
        rightArrow.classList.remove('visible');
      }
    }
    function updateAllArrows() {
      updateArrows('reco');
      updateArrows('ent');
      updateArrows('juegos');
      updateArrows('emuladores');
      updateArrows('herramientas');
    }
    window.addEventListener('resize', updateAllArrows);
    document.addEventListener('DOMContentLoaded', function() {
      updateAllArrows();
      const eldardoBtn = document.getElementById('eldardo-btn');
      if (eldardoBtn) {
        eldardoBtn.addEventListener('click', function() {
          const letrasAzar = generarLetrasAzar(5);
          window.open('https://eldardo.net/' + letrasAzar, '_blank');
        });
      }
      const crazygamesBtn = document.getElementById('crazygames-btn');
      if (crazygamesBtn) {
        crazygamesBtn.addEventListener('click', function() {
          const letrasAzar = generarLetrasAzar(8);
          window.open('https://www.crazygames.com/' + letrasAzar, '_blank');
        });
      }
      // crazygames 2
      const crazygames2Btn = document.getElementById('crazygames2-btn');
      if (crazygames2Btn) {
        crazygamesBtn.addEventListener('click', function() {
          const letrasAzar = generarLetrasAzar(8);
          window.open('https://www.crazygames.com/' + letrasAzar, '_blank');
        });
      }
      // SCRIPT NUEVO PARA POKI
      const pokiBtn = document.getElementById('poki-btn');
      if (pokiBtn) {
        pokiBtn.addEventListener('click', function() {
          const letrasAzar = generarLetrasAzar(8);
          window.open('https://poki.com/' + letrasAzar, '_blank');
        });
      }
      // NUEVO PARA SERVER
      const buckshotBtn = document.getElementById('server1-btn');
      if (buckshotBtn) {
        buckshotBtn.addEventListener('click', function() {
          abrirEnIframe('https://clashrom.github.io/server/');
        });
      }
      // BOTON TERMINOS Y CONDICIONES
      const tyc = document.getElementById('tyc');
      if (tyc) {
        tyc.addEventListener('click', function() {
          const nuevaPestana = window.open('about:blank', '_blank');
          if (nuevaPestana) {
            nuevaPestana.document.write(`
              <html>
                <head>
                  <title>terminos y condiciones</title>
                  <link rel="icon" href="https://ssl.gstatic.com/classroom/favicon.png" type="image/png">
                  <style>
                    body, html { margin:0; padding:0; height:100%; overflow:hidden; background:#111; }
                    iframe { border:none; width:100vw; height:100vh; display:block; }
                  </style>
                </head>
                <body>
                  <iframe src="condiciones.html" allow="autoplay; fullscreen"></iframe>
                </body>
              </html>
            `);
            nuevaPestana.document.close();
          }
        });
      }
      ['ent-row', 'juegos-row', 'herramientas-row', 'emuladores-row', 'reco-row'].forEach(rowId => {
        const el = document.getElementById(rowId);
        if (el) el.addEventListener('scroll', updateAllArrows, {passive:true});
      });
    });
    function generarLetrasAzar(longitud) {
      const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
      let resultado = '';
      for (let i = 0; i < longitud; i++) {
        resultado += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
      }
      return resultado;
    }

    // --- BUSCADOR DE BOTONES DE MENÚ ---
    const buscador = document.getElementById('buscador-menu');
    const menuDiv = document.getElementById('menu');
    const resultadosBusqueda = document.getElementById('resultados-busqueda');
    const buscadorContenedor = document.getElementById('buscador-contenedor');
    const buscadorSentinela = document.getElementById('buscador-sentinela');

    function obtenerBotonesMenu() {
      const secciones = ['ent-row', 'juegos-row', 'herramientas-row', 'emuladores-row', 'reco-row'];
      let botones = [];
      secciones.forEach(id => {
        const fila = document.getElementById(id);
        if (fila) {
          botones = botones.concat(Array.from(fila.querySelectorAll('.menu-button')));
        }
      });
      return botones;
    }

    buscador.addEventListener('input', function() {
      const texto = buscador.value.trim().toLowerCase();
      if (texto === "") {
        resultadosBusqueda.style.display = "none";
        menuDiv.style.display = "";
        return;
      }
      const botones = obtenerBotonesMenu();
      const botonesFiltrados = botones.filter(btn => {
        const img = btn.querySelector('img');
        if (!img) return false;
        const nombre = img.alt || "";
        return nombre.toLowerCase().startsWith(texto) || nombre.toLowerCase().includes(texto) || (texto.length === 1 && nombre[0]?.toLowerCase() === texto);
      });
      resultadosBusqueda.innerHTML = "";
      if (botonesFiltrados.length === 0) {
        resultadosBusqueda.innerHTML = '<div style="color:#fff;font-size:1.1em;padding:32px;">No se encontró ningún botón.</div>';
      } else {
        botonesFiltrados.forEach(btn => {
          const clon = btn.cloneNode(true);
          clon.onclick = btn.onclick;
          if (btn.id) {
            const orig = document.getElementById(btn.id);
            if (orig) clon.addEventListener('click', orig.onclick);
          }
          resultadosBusqueda.appendChild(clon);
        });
      }
      resultadosBusqueda.style.display = "flex";
      menuDiv.style.display = "none";
    });

    buscador.addEventListener('blur', function() {
      if (buscador.value.trim() === "") {
        resultadosBusqueda.style.display = "none";
        menuDiv.style.display = "";
      }
    });

// --- PEGAR BUSCADOR ARRIBA SI SE ESCONDE POR SCROLL ---
function updateBuscadorCompactBySettings() {
  if (settingsPanel.classList.contains('show')) {
    buscadorContenedor.classList.remove('compact');
  }
}

const observer = new window.IntersectionObserver(
  entries => {
    const e = entries[0];
    if (settingsPanel.classList.contains('show')) {
      buscadorContenedor.classList.remove('compact');
      return;
    }

    if (!e.isIntersecting) {
      // Se pega arriba → aplica animación
      if (!buscadorContenedor.classList.contains('compact')) {
        buscadorContenedor.classList.add('compact');
        buscadorContenedor.classList.remove('animate__animated', 'animate__slideInDown');
        void buscadorContenedor.offsetWidth; // reinicia animación
        buscadorContenedor.classList.add('animate__animated', 'animate__slideInDown');
        buscadorContenedor.style.setProperty('--animate-duration', '0.6s');
      }
    } else {
      // Vuelve a posición normal
      buscadorContenedor.classList.remove('compact');
      buscadorContenedor.classList.remove('animate__animated', 'animate__slideInUp');
    }
  },
  { threshold: 0 }
);

observer.observe(buscadorSentinela);

document.getElementById('toggleSettings').addEventListener('click', () => {
  setTimeout(updateBuscadorCompactBySettings, 100);
});

  // --- REDIRECCIÓN CON BOTÓN Y TECLA º ---
const classroomBtn = document.getElementById('classroomRedirectBtn');
if (classroomBtn) {
  classroomBtn.addEventListener('click', function() {
    window.location.href = 'https://classroom.google.com/';
  });
}
document.addEventListener('keydown', function(e) {
  if (e.key === 'º') {
    window.location.href = 'https://classroom.google.com/';
  }
});
// --- FLECHA EXPANDIR SECCIONES ---
document.addEventListener('DOMContentLoaded', function() {
  [
    {row: 'ent-row', btn: 'ent-expand-arrow', wrap: 'ent'},
    {row: 'juegos-row', btn: 'juegos-expand-arrow', wrap: 'juegos'},
    {row: 'emuladores-row', btn: 'emuladores-expand-arrow', wrap: 'emuladores'},
    {row: 'herramientas-row', btn: 'herramientas-expand-arrow', wrap: 'herramientas'}
  ].forEach(({row, btn, wrap}) => {
    const arrowBtn = document.getElementById(btn);
    const rowDiv = document.getElementById(row);
    // wrapper es menu-buttons-row-wrapper
    const wrapper = rowDiv ? rowDiv.parentElement : null;
    if (arrowBtn && rowDiv && wrapper) {
      arrowBtn.addEventListener('click', function() {
        rowDiv.classList.toggle('vertical');
        arrowBtn.classList.toggle('rotated');
        wrapper.classList.toggle('expanded');
        setTimeout(() => {
          updateArrows(wrap);
        }, 310);
      });
    }
  });
});
// --- ANIMACIÓN SUAVE DE BOTONES AL APARECER ---
document.addEventListener("DOMContentLoaded", () => {
  const botonesMenu = document.querySelectorAll("#menu .menu-button");

  const observerBotones = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const btn = entry.target;
      if (entry.isIntersecting) {
        // Muestra el botón y aplica animación solo la primera vez
        if (!btn.classList.contains("visible")) {
          btn.classList.add("visible", "animate__animated", "animate__fadeIn");
          btn.style.setProperty('--animate-duration', '0.7s');
        }
      }
    });
  }, {
    threshold: 0.2
  });

  botonesMenu.forEach(btn => observerBotones.observe(btn));
});
// --- CAMBIO DE fullscreenImage CON imageInput Y BOTONES .images-rows ---
document.addEventListener('DOMContentLoaded', () => {
  const fullscreenImage = document.getElementById('fullscreenImage');
  const imageInput = document.getElementById('imageInput');

  // Si el usuario elige una imagen desde el input
  if (imageInput) {
    imageInput.addEventListener('change', function (event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          fullscreenImage.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Si el usuario hace clic en un botón de clase .images-rows
  const imageButtons = document.querySelectorAll('.images-rows');
  imageButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const img = btn.querySelector('img');
      if (img && fullscreenImage) {
        fullscreenImage.src = img.src; // cambia la imagen fullscreen
      }
    });
  });
});
