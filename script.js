document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       COMPTEUR D'AMOUR
    ========================= */
    const startDate = new Date("2026-05-10");

    function updateLoveCounter() {
        const now = new Date();
        const difference = now - startDate;
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const counter = document.getElementById("loveCounter");
        if (counter) {
            counter.innerHTML = "❤️ Ensemble depuis <b>" + days + "</b> jours ❤️";
        }
    }
    updateLoveCounter();
    setInterval(updateLoveCounter, 1000);


    /* =========================
       TEXTE LETTRE PAR LETTRE (TITRE LOADER)
    ========================= */
    const titleText = "❤️ Joyeux Anniversaire Wendy ❤️";
    const typingTitle = document.getElementById("typingTitle");

    if (typingTitle) {
        let index = 0;
        function typeWriter() {
            if (index < titleText.length) {
                typingTitle.innerHTML += titleText.charAt(index);
                index++;
                setTimeout(typeWriter, 100);
            }
        }
        typeWriter();
    }


    /* =========================
       COEURS FLOTTANTS
    ========================= */
    function createHeart() {
        const heart = document.createElement("div");
        heart.classList.add("heart");
        heart.innerHTML = "❤️";
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.fontSize = (Math.random() * 20 + 15) + "px";
        document.body.appendChild(heart);
        setTimeout(() => { heart.remove(); }, 6000);
    }
    setInterval(createHeart, 500);


    /* =========================
       APPARITION AU SCROLL
    ========================= */
    const sections = document.querySelectorAll(".message-secondaire, .gallery, .heart-gallery, .surprise-section, footer");
    function revealSections() {
        sections.forEach(section => {
            const top = section.getBoundingClientRect().top;
            if (top < window.innerHeight - 100) {
                section.classList.add("show");
            }
        });
    }
    window.addEventListener("scroll", revealSections);
    revealSections();


    /* =========================
       GALERIE PLEIN ECRAN
    ========================= */
    const images = document.querySelectorAll(".gallery-grid img");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightboxImg");
    const closeBtn = document.getElementById("closeLightbox");

    if (images.length && lightbox && lightboxImg) {
        images.forEach(img => {
            img.addEventListener("click", () => {
                lightbox.style.display = "flex";
                lightboxImg.src = img.src;
            });
        });
    }
    if (closeBtn) {
        closeBtn.addEventListener("click", () => { lightbox.style.display = "none"; });
    }


    /* ===================================================
       GESTION MUSIQUE (BOUTON + SOURIS + SWIPE/TOUCH)
    =================================================== */
    const musicBtn = document.getElementById("playMusic");
    const music = document.getElementById("music");

    function forcePlayAudio() {
        if (music && music.paused) {
            music.play().then(() => {
                if (musicBtn) musicBtn.innerHTML = "⏸️ Mettre en pause";
                removeMusicListeners();
            }).catch(error => {
                console.log("Le navigateur bloque encore l'auto-play. Attente d'un clic.");
            });
        }
    }

    function removeMusicListeners() {
        window.removeEventListener("scroll", forcePlayAudio);
        window.removeEventListener("touchstart", forcePlayAudio);
        window.removeEventListener("touchmove", forcePlayAudio);
        document.removeEventListener("click", forcePlayAudio);
    }

    if (musicBtn && music) {
        musicBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            if (music.paused) {
                music.play();
                musicBtn.innerHTML = "⏸️ Mettre en pause";
                removeMusicListeners();
            } else {
                music.pause();
                musicBtn.innerHTML = "🎵 Jouer notre chanson ❤️";
            }
        });

        window.addEventListener("scroll", forcePlayAudio);
        window.addEventListener("touchstart", forcePlayAudio);
        window.addEventListener("touchmove", forcePlayAudio);
        document.addEventListener("click", forcePlayAudio);
    }

});

/* ===================================================
   LOADER & FEU D'ARTIFICE (Après chargement total)
=================================================== */
window.addEventListener("load", () => {
    
    // 1. Disparition du loader après 3 secondes
    setTimeout(() => {
        const loader = document.getElementById("loader");
        if (loader) {
            loader.style.display = "none";
        }
    }, 3000);

    // 2. Lancement immédiat et forcé du feu d'artifice
    setTimeout(() => {
        const canvas = document.getElementById("fireworks");
        
        // Sécurité supplémentaire : s'assurer que la bibliothèque est bien chargée
        if (canvas && typeof Fireworks !== "undefined") {
            const fireworks = new Fireworks.default(canvas, {
                rocketsPoint: 50,
                hue: { min: 0, max: 360 },
                delay: { min: 10, max: 20 },
                speed: 4,
                acceleration: 1.05,
                friction: 0.98,
                gravity: 1.3,
                particles: 180, // Plus d'explosions pour assurer la visibilité
                trace: 3,
                explosion: 8
            });
            
            fireworks.start();

            // On le laisse tourner 30 secondes pour Wendy
            setTimeout(() => { fireworks.stop(); }, 30000);
        } else {
            console.error("La bibliothèque Fireworks n'est pas accessible. Vérifie ta connexion internet.");
        }
    }, 3200);
    
});