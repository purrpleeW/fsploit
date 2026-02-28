document.addEventListener("DOMContentLoaded", () => { // basically all of this is shared between pages so i don't have to paste it in every page


    const glow = document.createElement("div"); // cursor glow
    glow.classList.add("cursor-glow");
    document.body.appendChild(glow);

    document.addEventListener("mousemove", e => {
        glow.style.left = e.clientX + "px";
        glow.style.top = e.clientY + "px";
    });


    document.querySelectorAll("a").forEach(link => {
        if (
            link.hostname === window.location.hostname &&
            !link.hash &&
            !link.target
        ) {
            link.addEventListener("click", function(e) {
                e.preventDefault();

                const main = document.querySelector("main");
                if (main) {
                    main.style.transition = "opacity 0.3s ease";
                    main.style.opacity = "0";
                }

                setTimeout(() => {
                    window.location.href = this.href;
                }, 300);
            });
        }
    });


    const header = document.querySelector("header"); 
    if (header) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 10) {
                header.style.background = "rgba(0,0,0,0.6)";
                header.style.backdropFilter = "blur(15px)";
            } else {
                header.style.background = "rgba(255,255,255,0.05)";
                header.style.backdropFilter = "blur(10px)";
            }
        });
    }


    window.addEventListener("load", () => { // preloader for visibility stuff
        const preloader = document.getElementById("preloader");
        if (preloader) {
            preloader.style.opacity = "0";
            preloader.style.visibility = "hidden";
        }
    });



    const faders = document.querySelectorAll(".fade-in"); // fade-in scroll animation
    if (faders.length > 0) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            });
        }, { threshold: 0.2 });

        faders.forEach(fader => observer.observe(fader));
    }



    const typingElement = document.querySelector(".typing"); // homepage typing animation
    if (typingElement) {
        const words = [" silly :3", " games", " content creator"];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeEffect() {
            const currentWord = words[wordIndex];
            typingElement.textContent = currentWord.substring(
                0,
                isDeleting ? charIndex-- : charIndex++
            );

            if (!isDeleting && charIndex === currentWord.length + 1) {
                setTimeout(() => isDeleting = true, 1000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
            }

            setTimeout(typeEffect, isDeleting ? 50 : 100);
        }

        typeEffect();
    }

    document.addEventListener("mousemove", (e) => {
        const glow = document.querySelector(".floating-glow");
        if (!glow) return;

        let x = (window.innerWidth / 2 - e.clientX) / 50;
        let y = (window.innerHeight / 2 - e.clientY) / 50;

        glow.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
    });

    const elements = document.querySelectorAll(".fade-up");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    });

    elements.forEach(el => observer.observe(el));
    

});