document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const header = document.querySelector(".header");
  const navLinks = document.querySelectorAll(".nav-link");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      navToggle.classList.toggle("active");
    });

    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        if (navMenu.classList.contains("active")) {
          navMenu.classList.remove("active");
          navToggle.classList.remove("active");
        }
      });
    });
  }

  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 80) {
        header.style.backgroundColor = "rgba(3, 10, 16, 0.9)";
        header.style.backdropFilter = "blur(15px) brightness(70%)";
        header.style.borderBottom = "1px solid rgba(0, 230, 184, 0.4)";
      } else {
        header.style.backgroundColor = "rgba(3, 10, 16, 0.98)";
        header.style.backdropFilter = "blur(25px) brightness(80%)";
        header.style.borderBottom = "1px solid rgba(0, 230, 184, 0.25)";
      }
    });
  }

  navLinks.forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      const href = this.getAttribute("href");

      if (href && href.startsWith("#")) {
        e.preventDefault();

        const targetId = href;
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          const headerHeight = header ? header.offsetHeight : 0;
          const offsetPosition = targetElement.offsetTop - headerHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }
    });
  });

  const sections = document.querySelectorAll("section");

  const setActiveNavLink = () => {
    let currentSectionId = "";
    const scrollYOffset = window.scrollY + (header ? header.offsetHeight : 0) + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (scrollYOffset >= sectionTop && scrollYOffset < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSectionId}`) {
        link.classList.add("active");
      }
    });
  };

  window.addEventListener("scroll", setActiveNavLink);
  setActiveNavLink();

  const newsContainer = document.getElementById("news-container");

  fetch('https://newsapi.org/v2/top-headlines?category=technology&language=en&pageSize=5&apiKey=YOUR_API_KEY')
    .then(res => res.json())
    .then(data => {
      newsContainer.innerHTML = "";

      if (data.articles && data.articles.length > 0) {
        data.articles.forEach(article => {
          const articleHTML = `
            <article class="news-article">
              <h3 class="news-title">
                <a href="${article.url}" target="_blank" rel="noopener noreferrer">
                  ${article.title}
                </a>
              </h3>
              <p class="news-summary">${article.description || "No description available."}</p>
              <div class="news-meta">
                <span class="news-source">${article.source.name}</span> •
                <span class="news-date">${new Date(article.publishedAt).toLocaleDateString()}</span>
              </div>
            </article>
          `;
          newsContainer.insertAdjacentHTML("beforeend", articleHTML);
        });
      } else {
        newsContainer.innerHTML = "<p>No tech news available right now.</p>";
      }
    })
    .catch(err => {
      console.error("News fetch failed:", err);
      newsContainer.innerHTML = "<p>Error loading tech news. Try again later.</p>";
    });
});
