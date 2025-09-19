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
      document.getElementById("fullscreenImage").src = "images/Screenshot 2025-06-16 13.03.28.png";
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
      // SCRIPT NUEVO PARA POKI
      const pokiBtn = document.getElementById('poki-btn');
      if (pokiBtn) {
        pokiBtn.addEventListener('click', function() {
          const letrasAzar = generarLetrasAzar(8);
          window.open('https://poki.com/' + letrasAzar, '_blank');
        });
      }
      // NUEVO PARA SERVER
      const buckshotBtn = document.getElementById('server-btn');
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
      ['ent-row', 'juegos-row', 'herramientas-row', 'emuladores-row'].forEach(rowId => {
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
      const secciones = ['ent-row', 'juegos-row', 'herramientas-row', 'emuladores-row'];
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
          buscadorContenedor.classList.add('compact');
        } else {
          buscadorContenedor.classList.remove('compact');
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
