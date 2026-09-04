document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const btnMobile = document.getElementById("btn-mobile");
  const nav = document.getElementById("nav");

  // ==========================================
  // ANO AUTOMÁTICO NO RODAPÉ
  // ==========================================

  const currentYear = document.getElementById("current-year");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }


  // ==========================================
  // EFEITO DO CABEÇALHO AO ROLAR
  // ==========================================

  const updateHeader = () => {
    if (header) {
      header.classList.toggle(
        "scrolled",
        window.scrollY > 20
      );
    }
  };

  updateHeader();

  window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
  );


  // ==========================================
  // MENU MOBILE
  // ==========================================

  if (btnMobile && nav) {

    const closeMenu = () => {
      nav.classList.remove("active");

      btnMobile.setAttribute(
        "aria-expanded",
        "false"
      );
    };


    const toggleMenu = () => {

      const isOpen =
        nav.classList.toggle("active");

      btnMobile.setAttribute(
        "aria-expanded",
        String(isOpen)
      );
    };


    // Abrir / fechar menu
    btnMobile.addEventListener(
      "click",
      toggleMenu
    );


    // Fechar menu ao clicar em um link
    nav.querySelectorAll("a").forEach((link) => {

      link.addEventListener(
        "click",
        closeMenu
      );

    });


    // Fechar menu pressionando ESC
    document.addEventListener(
      "keydown",
      (event) => {

        if (event.key === "Escape") {
          closeMenu();
        }

      }
    );


    // Fechar menu clicando fora dele
    document.addEventListener(
      "click",
      (event) => {

        if (
          nav.classList.contains("active") &&
          !nav.contains(event.target) &&
          !btnMobile.contains(event.target)
        ) {

          closeMenu();

        }

      }
    );


    // Fechar menu quando voltar para desktop
    window.addEventListener(
      "resize",
      () => {

        if (window.innerWidth > 900) {
          closeMenu();
        }

      }
    );

  }


  // ==========================================
  // ANIMAÇÃO DAS SEÇÕES
  // ==========================================

  const revealElements =
    document.querySelectorAll(".reveal");


  if ("IntersectionObserver" in window) {

    const revealObserver =
      new IntersectionObserver(
        (entries, observer) => {

          entries.forEach((entry) => {

            if (entry.isIntersecting) {

              entry.target.classList.add(
                "visible"
              );

              observer.unobserve(
                entry.target
              );

            }

          });

        },
        {
          threshold: 0.12
        }
      );


    revealElements.forEach(
      (element) => {

        revealObserver.observe(element);

      }
    );

  } else {

    // Compatibilidade com navegadores antigos
    revealElements.forEach(
      (element) => {

        element.classList.add(
          "visible"
        );

      }
    );

  }


  // ==========================================
  // DESTACAR SEÇÃO ATUAL NO MENU
  // ==========================================

  const sections =
    document.querySelectorAll(
      "main section[id]"
    );


  const navLinks =
    document.querySelectorAll(
      '.main-nav a[href^="#"]'
    );


  if (
    "IntersectionObserver" in window &&
    sections.length &&
    navLinks.length
  ) {

    const sectionObserver =
      new IntersectionObserver(
        (entries) => {

          entries.forEach((entry) => {

            if (!entry.isIntersecting) {
              return;
            }


            navLinks.forEach((link) => {

              link.classList.toggle(
                "active",
                link.getAttribute("href") ===
                  `#${entry.target.id}`
              );

            });

          });

        },
        {
          rootMargin:
            "-35% 0px -55% 0px",

          threshold: 0
        }
      );


    sections.forEach(
      (section) => {

        sectionObserver.observe(
          section
        );

      }
    );

  }

});