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

    const rainCanvas = document.createElement("canvas");
    rainCanvas.id = "rain-canvas";
    document.body.appendChild(rainCanvas);
    
    const ctx = rainCanvas.getContext("2d");
    let rainAnimId;
    let drops = [];

    const initRain = () => {
        rainCanvas.width = window.innerWidth;
        rainCanvas.height = window.innerHeight;
        drops = [];
        for (let i = 0; i < 150; i++) {
            drops.push({
                x: Math.random() * rainCanvas.width,
                y: Math.random() * rainCanvas.height,
                l: Math.random() * 20 + 10,
                v: Math.random() * 5 + 5
            });
        }
    };

    window.addEventListener("resize", initRain);
    initRain();

const drawRain = () => {
        ctx.clearRect(0, 0, rainCanvas.width, rainCanvas.height);
        ctx.strokeStyle = "rgba(159, 122, 234, 0.35)";
        ctx.lineWidth = 1.5;
        ctx.lineCap = "round";
        ctx.beginPath();
        
        for (let i = 0; i < drops.length; i++) {
            const p = drops[i];
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.x, p.y + p.l);
            p.y += p.v;
            
            if (p.y > rainCanvas.height) {
                p.y = -20;
                p.x = Math.random() * rainCanvas.width;
            }
        }
        ctx.stroke();
        rainAnimId = requestAnimationFrame(drawRain);
    };

    document.body.classList.add("rain-enabled");
    drawRain();

    const rainButton = document.getElementById("rain-toggle");

    if (rainButton) {
        rainButton.setAttribute("aria-pressed", "true");
        rainButton.textContent = "☔";

        rainButton.addEventListener("click", () => {
            document.body.classList.toggle("rain-enabled");
            const enabled = document.body.classList.contains("rain-enabled");
            
            rainButton.setAttribute("aria-pressed", String(enabled));
            rainButton.textContent = enabled ? "☔" : "🌧";

            if (enabled) {
                drawRain();
            } else {
                cancelAnimationFrame(rainAnimId);
                ctx.clearRect(0, 0, rainCanvas.width, rainCanvas.height);
            }
        });
    }

    const audioPlayer = document.getElementById("audio-player");
    
if (audioPlayer) {
        const playPauseBtn = document.getElementById("play-pause");
        const prevBtn = document.getElementById("prev-track");
        const nextBtn = document.getElementById("next-track");
        const progressBar = document.getElementById("progress-bar");
        const currentTimeEl = document.getElementById("current-time");
        const totalTimeEl = document.getElementById("total-time");
        const trackTitle = document.getElementById("track-title");
        const trackArtist = document.getElementById("track-artist");
        const coverArt = document.getElementById("cover-art");
        
        const volumeSlider = document.getElementById("volume-slider");
        const muteBtn = document.getElementById("mute-btn");
        const playlistUI = document.getElementById("playlist-ui");

        const playlist = [ // there's definitely a better way to do this
            {
                title: "Daisy Chain",
                artist: "The Neighbourhood",
                audioSrc: "../assets/audio/daisy_chain_track_1.mp3",
                coverSrc: "../images/ultrasound_plus.jpg"
            },
            {
                title: "Californiacation",
                artist: "Red Hot Chilli Peppers",
                audioSrc: "../assets/audio/californiacation_track_2.mp3",
                coverSrc: "../images/californiacation.jpg"
            },
            {
                title: "Let Down",
                artist: "Radiohead",
                audioSrc: "../assets/audio/let_down_track_3.mp3",
                coverSrc: "../images/ok_computer.png"
            },
            {
                title: "Kill Bill",
                artist: "SZA",
                audioSrc: "../assets/audio/kill_bill_track_4.mp3",
                coverSrc: "../images/kill_bill.jpg"
            },
            {
                title: "Wiped Out!",
                artist: "The Neighbourhood",
                audioSrc: "../assets/audio/wiped_out_track_5.mp3",
                coverSrc: "../images/wiped_out.png"
            },
            {
                title: "some track",
                artist: "some artist",
                audioSrc: "../assets/audio/some_file.mp3",
                coverSrc: "../images/default.jpg" // this is for testing the error notification
            }
        ];

        let currentTrackIndex = 0;
        let previousVolume = 100;
        const volumeScale = 0.4;

        const loadTrack = (index) => {
            const track = playlist[index];
            trackTitle.textContent = track.title;
            trackArtist.textContent = track.artist;
            coverArt.src = track.coverSrc;
            audioPlayer.src = track.audioSrc;
        };

        const playTrack = () => {
            audioPlayer.play();
            playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
        };

        const pauseTrack = () => {
            audioPlayer.pause();
            playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
        };

        const formatTime = (time) => {
            if (isNaN(time)) return "0:00";
            const mins = Math.floor(time / 60);
            const secs = Math.floor(time % 60);
            return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
        };

        const updateActivePlaylistTrack = () => {
            if (!playlistUI) return;
            const items = playlistUI.querySelectorAll(".playlist-item");
            
            items.forEach((item, index) => {
                const isActive = index === currentTrackIndex;
                item.classList.toggle("active", isActive);
                
                const icon = item.querySelector(".playlist-hover-icon i");
                if (icon) {
                    if (isActive) {
                        icon.className = "fa-solid fa-volume-high";
                    } else {
                        icon.className = "fa-solid fa-play";
                    }
                }
            });
        };

        const updateVolumeIcon = (sliderVal) => {
            if (sliderVal === 0) {
                muteBtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
            } else if (sliderVal < 0.5) {
                muteBtn.innerHTML = '<i class="fa-solid fa-volume-low"></i>';
            } else {
                muteBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
            }
        };

        const renderPlaylist = () => {
            if (!playlistUI) return;
            playlistUI.innerHTML = "";

            playlist.forEach((track, index) => {
                const isActive = index === currentTrackIndex;
                const li = document.createElement("li");
                li.className = `playlist-item ${isActive ? "active" : ""}`;
                
                const iconClass = isActive ? "fa-solid fa-volume-high" : "fa-solid fa-play";

                li.innerHTML = `
                    <img src="${track.coverSrc}" alt="${track.title} Cover">
                    <div class="playlist-item-info">
                        <h4>${track.title}</h4>
                        <p>${track.artist}</p>
                    </div>
                    <div class="playlist-hover-icon">
                        <i class="${iconClass}"></i>
                    </div>
                `;
                
                li.addEventListener("click", () => {
                    currentTrackIndex = index;
                    loadTrack(currentTrackIndex);
                    playTrack();
                    updateActivePlaylistTrack();
                });
                
                playlistUI.appendChild(li);
            });
        };

        loadTrack(currentTrackIndex);
        renderPlaylist();
        audioPlayer.volume = (volumeSlider.value / 100) * volumeScale;

        playPauseBtn.addEventListener("click", () => {
            if (audioPlayer.paused) {
                playTrack();
            } else {
                pauseTrack();
            }
        });

        nextBtn.addEventListener("click", () => {
            currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
            loadTrack(currentTrackIndex);
            playTrack();
            updateActivePlaylistTrack();
        });

        prevBtn.addEventListener("click", () => {
            currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
            loadTrack(currentTrackIndex);
            playTrack();
            updateActivePlaylistTrack();
        });

        audioPlayer.addEventListener("ended", () => {
            currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
            loadTrack(currentTrackIndex);
            playTrack();
            updateActivePlaylistTrack();
        });

        audioPlayer.addEventListener("timeupdate", () => {
            if (audioPlayer.duration) {
                const progressPercent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
                progressBar.value = progressPercent;
                currentTimeEl.textContent = formatTime(audioPlayer.currentTime);
            }
        });

        audioPlayer.addEventListener("loadedmetadata", () => {
            totalTimeEl.textContent = formatTime(audioPlayer.duration);
        });

        progressBar.addEventListener("input", (e) => {
            const seekTime = (e.target.value / 100) * audioPlayer.duration;
            audioPlayer.currentTime = seekTime;
        });

        volumeSlider.addEventListener("input", (e) => {
            const sliderVal = e.target.value / 100;
            audioPlayer.volume = sliderVal * volumeScale;
            updateVolumeIcon(sliderVal); 
        });

        muteBtn.addEventListener("click", () => {
            if (audioPlayer.volume > 0) {
                previousVolume = volumeSlider.value;
                audioPlayer.volume = 0;
                volumeSlider.value = 0;
            } else {
                const restoredVal = previousVolume / 100;
                audioPlayer.volume = restoredVal * volumeScale;
                volumeSlider.value = previousVolume;
            }
            updateVolumeIcon(volumeSlider.value / 100);
        });

        const errorToast = document.createElement("div");
        errorToast.id = "audio-error-toast";
        document.body.appendChild(errorToast);
        
        let toastTimeout;

        const showError = (message) => {
            errorToast.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> &nbsp; ${message}`;
            errorToast.classList.add("show");
            
            clearTimeout(toastTimeout);
            
            toastTimeout = setTimeout(() => {
                errorToast.classList.remove("show");
            }, 3500);
        };

        audioPlayer.addEventListener("error", () => {
            showError("Failed to fetch track audio file! (missing?)");
            playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
            progressBar.value = 0;
            currentTimeEl.textContent = "0:00";
        });
    }
});