(() => {
    const root = document.documentElement;
    const body = document.body;
    const themeButton = document.querySelector("[data-theme-toggle]");
    const menuButton = document.querySelector("[data-menu-toggle]");
    const mobilePanel = document.querySelector("[data-mobile-panel]");
    const mobileLinks = document.querySelectorAll("[data-mobile-panel] a");
    const filterButtons = document.querySelectorAll("[data-filter]");
    const projectCards = document.querySelectorAll("[data-category]");
    const yearTargets = document.querySelectorAll("[data-current-year]");

    const storedTheme = localStorage.getItem("portfolio-theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = storedTheme || (systemPrefersDark ? "dark" : "light");

    const setTheme = (theme) => {
        root.dataset.theme = theme;
        localStorage.setItem("portfolio-theme", theme);

        if (themeButton) {
            const isDark = theme === "dark";
            themeButton.setAttribute("aria-pressed", String(isDark));
            themeButton.setAttribute("aria-label", isDark ? "Use light theme" : "Use dark theme");
            themeButton.title = isDark ? "Use light theme" : "Use dark theme";
        }
    };

    setTheme(initialTheme);

    themeButton?.addEventListener("click", () => {
        setTheme(root.dataset.theme === "dark" ? "light" : "dark");
    });

    const closeMenu = () => {
        if (!menuButton || !mobilePanel) return;
        menuButton.setAttribute("aria-expanded", "false");
        mobilePanel.classList.remove("is-open");
        body.classList.remove("menu-open");
    };

    const openMenu = () => {
        if (!menuButton || !mobilePanel) return;
        menuButton.setAttribute("aria-expanded", "true");
        mobilePanel.classList.add("is-open");
        body.classList.add("menu-open");
    };

    menuButton?.addEventListener("click", () => {
        const isOpen = menuButton.getAttribute("aria-expanded") === "true";
        isOpen ? closeMenu() : openMenu();
    });

    mobileLinks.forEach((link) => link.addEventListener("click", closeMenu));

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") closeMenu();
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 780) closeMenu();
    });

    const currentFile = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll("[data-nav-link]").forEach((link) => {
        const href = link.getAttribute("href")?.split("/").pop();
        if (href === currentFile) {
            link.setAttribute("aria-current", "page");
        } else {
            link.removeAttribute("aria-current");
        }
    });

    yearTargets.forEach((target) => {
        target.textContent = String(new Date().getFullYear());
    });

    if (filterButtons.length && projectCards.length) {
        filterButtons.forEach((button) => {
            button.addEventListener("click", () => {
                const selectedFilter = button.dataset.filter || "all";

                filterButtons.forEach((candidate) => {
                    candidate.setAttribute("aria-pressed", String(candidate === button));
                });

                projectCards.forEach((card) => {
                    const categories = (card.dataset.category || "").split(" ");
                    const shouldShow = selectedFilter === "all" || categories.includes(selectedFilter);
                    card.hidden = !shouldShow;
                });
            });
        });
    }

    const revealTargets = document.querySelectorAll("[data-reveal]");
    if (revealTargets.length && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        root.classList.add("reveal-ready");
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: "0px 0px -40px" }
        );

        revealTargets.forEach((target) => observer.observe(target));
    } else {
        revealTargets.forEach((target) => target.classList.add("is-visible"));
    }
})();
