document.addEventListener("DOMContentLoaded", () => {
    const cursorGlow = document.createElement("div");
    cursorGlow.className = "cursor-glow";
    document.body.appendChild(cursorGlow);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    document.addEventListener("mousemove", (event) => {
        mouseX = event.clientX;
        mouseY = event.clientY;

        cursorGlow.style.left = `${mouseX}px`;
        cursorGlow.style.top = `${mouseY}px`;
    });

    const floatingGlow = document.querySelector(".floating-glow");

    if (floatingGlow) {
        document.addEventListener("mousemove", (event) => {
            const x = (window.innerWidth / 2 - event.clientX) / 50;
            const y = (window.innerHeight / 2 - event.clientY) / 50;

            floatingGlow.style.transform =
                `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
        });
    }

    const header = document.querySelector(".site-header");

    const updateHeader = () => {
        if (!header) return;

        header.classList.toggle("scrolled", window.scrollY > 20);
    };

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    document.querySelectorAll("a").forEach((link) => {
        const isInternal =
            link.hostname === window.location.hostname;

        const isHashLink = link.hash !== "";
        const opensNewTab = link.target !== "";
        const isDownload = link.hasAttribute("download");

        if (
            isInternal &&
            !isHashLink &&
            !opensNewTab &&
            !isDownload
        ) {
            link.addEventListener("click", (event) => {
                event.preventDefault();

                const main = document.querySelector("main");

                if (!main) {
                    window.location.href = link.href;
                    return;
                }

                main.style.transition = "opacity 220ms ease";
                main.style.opacity = "0";

                setTimeout(() => {
                    window.location.href = link.href;
                }, 220);
            });
        }
    });

    const hidePreloader = () => {
        const preloader = document.getElementById("preloader");

        if (!preloader) return;

        preloader.style.opacity = "0";
        preloader.style.visibility = "hidden";

        setTimeout(() => {
            preloader.remove();
        }, 600);
    };

    if (document.readyState === "complete") {
        hidePreloader();
    } else {
        window.addEventListener("load", hidePreloader, {
            once: true
        });
    }

    const revealElements = document.querySelectorAll(
        ".fade-in, .fade-up"
    );

    if (revealElements.length) {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );

        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });
    }

    const rainButton = document.getElementById("rain-toggle");

    if (rainButton) {
        rainButton.addEventListener("click", () => {
            document.body.classList.toggle("rain-enabled");

            const enabled =
                document.body.classList.contains("rain-enabled");

            rainButton.setAttribute(
                "aria-pressed",
                String(enabled)
            );

            rainButton.textContent = enabled ? "☔" : "🌧";
        });
    }
});