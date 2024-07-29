document.addEventListener("DOMContentLoaded", function () {
  'use strict';

  /* =======================
  // Menu
  ======================= */
  var body = document.querySelector("body"),
  menuOpenIcon = document.querySelector(".nav-icon-menu"),
  menuCloseIcon = document.querySelector(".nav-icon-close"),
  menuList = document.querySelector(".main-nav");

  menuOpenIcon.addEventListener("click", () => {
    menuOpen();
  });

  menuCloseIcon.addEventListener("click", () => {
    menuClose();
  });

  function menuOpen() {
    menuList.classList.add("is-open");
  }

  function menuClose() {
    menuList.classList.remove("is-open");
  }

  /* =======================
  // Animation Load Page
  ======================= */
  setTimeout(function(){
    body.classList.add("is-in");
  },150)

  /* ==================================
  // Stop Animations After All Have Run
  ================================== */
  setTimeout(function(){
    body.classList.add("stop-animations");
  },1500)

  /* ======================================
  // Stop Animations During Window Resizing
  ====================================== */
  let resizeTimer;
  window.addEventListener("resize", () => {
    document.body.classList.add("resize-animation-stopper");
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      document.body.classList.remove("resize-animation-stopper");
    }, 300);
  });


  /* =======================
  // Responsive Videos
  ======================= */
  reframe(".post-content iframe:not(.reframe-off), .page-content iframe:not(.reframe-off)");


  /* =======================
  // Zoom Image
  ======================= */
  const lightense = document.querySelector(".page img, .post img"),
  imageLink = document.querySelectorAll(".page a img, .post a img");

  if (imageLink) {
    for (var i = 0; i < imageLink.length; i++) imageLink[i].parentNode.classList.add("image-link");
    for (var i = 0; i < imageLink.length; i++) imageLink[i].classList.add("no-lightense");
  }

  if (lightense) {
    Lightense(".page img:not(.no-lightense), .post img:not(.no-lightense)", {
    padding: 60,
    offset: 30
    });
  }

  /* ============================
  // Testimonials Slider
  ============================ */
  if (document.querySelector(".my-slider")) {
    var slider = tns({
      container: ".my-slider",
      items: 3,
      slideBy: 1,
      gutter: 20,
      nav: false,
      mouseDrag: true,
      autoplay: false,
      controlsContainer: "#customize-controls",
      responsive: {
        1024: {
          items: 3,
        },
        768: {
          items: 2,
        },
        0: {
          items: 1,
        }
      }
    });
  }


  /* ============================
  // iTyped
  ============================ */
  if (document.querySelector(".c-subscribe")) {
    var options = {
      strings: itype_text,
      typeSpeed: 100,
      backSpeed: 50,
      startDelay: 200,
      backDelay: 1500,
      loop: true,
      showCursor: true,
      cursorChar: "|",
      onFinished: function(){}
    }

    ityped.init('#ityped', options);
  }


  /* ============================
  // Scroll to top
  ============================ */
  const btnScrollToTop = document.querySelector(".top");

  window.addEventListener("scroll", function () {
    window.scrollY > window.innerHeight ? btnScrollToTop.classList.add("is-active") : btnScrollToTop.classList.remove("is-active");
  });

  btnScrollToTop.addEventListener("click", function () {
    if (window.scrollY != 0) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      })
    }
  });

  // Toggle on start
  const darkModeEnabled = sessionStorage.getItem("darkMode") === "true"
  if (darkModeEnabled) {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }

  function setDarkMode() {
    const darkModeEnabled = sessionStorage.getItem("darkMode") === "true"
    if (!darkModeEnabled) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
    sessionStorage.setItem("darkMode", !darkModeEnabled);
  }

  const darkModeToggle = document.getElementById("dark-mode-toggle");
  // Toggle dark mode when the toggle is clicked
  darkModeToggle.addEventListener("click", setDarkMode);
  const defaultLanguage = 'en';
  function changeLanguage(dropdown) {
    var selectedLanguage = dropdown.options[dropdown.selectedIndex].value;
    var currentUrl = window.location.pathname;

    localStorage.setItem('selectedLanguage', selectedLanguage);

    var newUrl;
    if (selectedLanguage === defaultLanguage) {
        newUrl = currentUrl.replace(/\/[a-z]{2}(\/|$)/, '/');
    } else {
        newUrl = currentUrl.replace(/\/[a-z]{2}(\/|$)/, '/' + selectedLanguage + '$1');
    }

    if (!/\/[a-z]{2}\//.test(currentUrl) && selectedLanguage !== defaultLanguage) {
        newUrl = '/' + selectedLanguage + currentUrl;
    }

    window.location.href = newUrl;
  }

  function setDefaultLanguage(dropdown) {
      var savedLanguage = localStorage.getItem('selectedLanguage') || defaultLanguage;
      var currentUrl = window.location.pathname;

      // Set the dropdown to the saved language
      dropdown.value = savedLanguage;

      var newUrl;
      if (!currentUrl.includes('/' + savedLanguage + '/') && savedLanguage !== defaultLanguage) {
          newUrl = currentUrl.replace(/\/[a-z]{2}(\/|$)/, '/' + savedLanguage + '$1');

          if (!/\/[a-z]{2}\//.test(currentUrl)) {
              newUrl = '/' + savedLanguage + currentUrl;
          }

          window.location.href = newUrl;
      } else if (savedLanguage === defaultLanguage && /\/[a-z]{2}\//.test(currentUrl)) {
          newUrl = currentUrl.replace(/\/[a-z]{2}(\/|$)/, '/');
          window.location.href = newUrl;
      }
  }

  var dropdown = document.querySelectorAll(".dropdown");
  dropdown.forEach(element => {
    setDefaultLanguage(element);
    element.addEventListener('change', () => changeLanguage(element));
  });

  const header = document.querySelector('.c-header');
  const header_inner = document.querySelector('.c-header-inner');

  window.addEventListener('scroll', function() {
    if (window.scrollY > 70) {
      header.classList.add('scrolled');
      header_inner.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
      header_inner.classList.remove('scrolled');
    }
  });
    const darkModeToggleElement = document.querySelector('#dark-mode-toggle');
    const darkModeElementHeight = darkModeToggleElement.offsetHeight;
    darkModeToggleElement.style.setProperty('--text-height', `calc(${darkModeElementHeight}px)`);
});