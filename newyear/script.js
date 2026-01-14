// ===== PAGE 1: HOME PAGE =====
if (document.body.classList.contains('page1')) {
    const nameInput = document.getElementById('nameInput');
    const continueBtn = document.getElementById('continueBtn');
    const errorMsg = document.getElementById('errorMsg');

    // Handle Enter key
    nameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') goNext();
    });

    // Button click handler
    continueBtn.addEventListener('click', goNext);

    // Real-time input validation
    nameInput.addEventListener('input', () => {
        if (nameInput.value.trim().length > 0) {
            errorMsg.textContent = '';
            nameInput.style.borderColor = 'rgba(255, 105, 180, 0.6)';
        }
    });

    function goNext() {
        const name = nameInput.value.trim();
        
        if (name === "") {
            errorMsg.textContent = '❌ Please enter a name!';
            nameInput.style.animation = 'none';
            setTimeout(() => {
                nameInput.style.animation = 'shake 0.5s ease';
            }, 10);
            return;
        }

        if (name.length > 50) {
            errorMsg.textContent = '❌ Name is too long!';
            return;
        }

        // Add button animation before redirect
        continueBtn.style.transform = 'scale(0.95)';
        continueBtn.style.opacity = '0.8';
        
        setTimeout(() => {
            window.location.href = `wishes.html?name=${encodeURIComponent(name)}`;
        }, 300);
    }

    // Focus animation on load
    window.addEventListener('load', () => {
        setTimeout(() => nameInput.focus(), 500);
    });
}

// ===== PAGE 2: WISHES PAGE =====
if (document.body.classList.contains('page2')) {
    const params = new URLSearchParams(window.location.search);
    const name = params.get("name") || "My Love";

    // Check if name is "Farzana" and show special greeting card
    if (name.toLowerCase() === "farzana") {
        setTimeout(() => {
            const greetingCard = document.getElementById('greetingCard');
            if (greetingCard) {
                greetingCard.classList.remove('hidden');
                // Trigger confetti or special effects
                triggerSpecialEffects();
            }
        }, 1500);
    }

    // 💕 PERSONALIZED WISHES FOR DIFFERENT NAMES
    const wishCollections = {
        "farzana": {
            title: `Happy New Year, Farzana 🎆`,
            text: `Dear Farzana, You're my heart's greatest treasure. This new year is dedicated to loving you more deeply than ever before 💕✨`,
            style: 'style-romantic'
        },
        "sara": {
            title: `Happy New Year, Sara 🎆`,
            text: `Sara, your smile brightens my darkest days. Thank you for being my strength, my joy, and my forever. Here's to a beautiful year together 💖🌹`,
            style: 'style-elegant'
        },
        "fatima": {
            title: `Happy New Year, Fatima 🎆`,
            text: `Fatima, you are my greatest blessing. Every moment with you is a gift I cherish deeply. Let's make 2026 our best year yet 💕✨`,
            style: 'style-romantic'
        },
        "aisha": {
            title: `Happy New Year, Aisha 🎆`,
            text: `Sweet Aisha, you make my heart complete. Thank you for your endless love, support, and for being my perfect match. I adore you 💗🌙`,
            style: 'style-poetic'
        },
        "noor": {
            title: `Happy New Year, Noor 🎆`,
            text: `Noor, you are the light of my life. With you, every day feels like a celebration. Happy New Year to my everything 💫💕`,
            style: 'style-romantic'
        },
        "leila": {
            title: `Happy New Year, Leila 🎆`,
            text: `Leila, my heart knew you before my mind understood. You're my soulmate and my forever love. Here's to us and our beautiful journey 🌹💖`,
            style: 'style-elegant'
        },
        "yasmin": {
            title: `Happy New Year, Yasmin 🎆`,
            text: `Yasmin, you are extraordinary in every way. Thank you for loving me, believing in me, and making me the luckiest person alive 💕✨`,
            style: 'style-romantic'
        },
        "hana": {
            title: `Happy New Year, Hana 🎆`,
            text: `Dear Hana, with you I found my home, my peace, and my forever. This year, let's love deeper and dream bigger together 💗🌹`,
            style: 'style-poetic'
        },
        "zara": {
            title: `Happy New Year, Zara 🎆`,
            text: `Zara, you're my favorite adventure and my safe haven. Thank you for being my person, my love, my everything 💕💫`,
            style: 'style-romantic'
        },
        "amira": {
            title: `Happy New Year, Amira 🎆`,
            text: `Amira, you make ordinary moments feel magical. I'm grateful for your love, your laughter, and for choosing me. Here's to forever 🌙💖`,
            style: 'style-elegant'
        },
        "default": {
            title: `Happy New Year, ${name} 🎆`,
            text: `You're the most amazing person in my life. This year, I want to celebrate you and create beautiful memories together. Thank you for being my everything 💕✨`,
            style: 'style-romantic'
        }
    };

    // Get wishes for the entered name (case-insensitive), or use default
    const wish = wishCollections[name.toLowerCase()] || wishCollections["default"];

    // Display wish on page load
    displayWish();
    startFireworks();

    // Button handler
    document.getElementById('homeBtn').addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    function displayWish() {
        const titleEl = document.getElementById('title');
        const wishEl = document.getElementById('wishText');

        // Fade out animation
        titleEl.style.animation = 'none';
        wishEl.style.animation = 'none';
        titleEl.style.opacity = '0';
        wishEl.style.opacity = '0';

        setTimeout(() => {
            titleEl.innerText = wish.title;
            wishEl.innerText = wish.text;
            
            // Remove all style classes
            wishEl.classList.remove('style-romantic', 'style-bold', 'style-elegant', 'style-modern', 'style-handwritten', 'style-poetic', 'style-casual', 'style-mono');
            
            // Add style class
            wishEl.classList.add(wish.style);
            
            // Fade in animation
            titleEl.style.animation = 'titleSlideIn 0.8s ease-out';
            wishEl.style.animation = 'wishFadeIn 1.2s ease-out';
            titleEl.style.opacity = '1';
            wishEl.style.opacity = '1';
        }, 300);
    }

    // 🎆 ENHANCED FIREWORKS
    function startFireworks() {
        const canvas = document.getElementById('fireworks');
        const ctx = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let particles = [];
        let explosionCount = 0;
        const maxExplosions = 50;

        function explode(x, y, intensity = 60) {
            explosionCount++;
            for (let i = 0; i < intensity; i++) {
                const angle = (Math.PI * 2 * i) / intensity;
                const velocity = Math.random() * 5 + 3;
                particles.push({
                    x,
                    y,
                    r: Math.random() * 3 + 1.5,
                    dx: Math.cos(angle) * velocity,
                    dy: Math.sin(angle) * velocity,
                    life: 100,
                    maxLife: 100,
                    color: `hsl(${Math.random() * 60 + 280},100%,60%)`,
                    gravity: 0.1,
                    trail: []
                });
            }
        }

        function animate() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            particles.forEach((p, i) => {
                // Draw particle
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.globalAlpha = p.life / p.maxLife;
                ctx.fill();

                // Update position
                p.dx *= 0.98;
                p.dy *= 0.98;
                p.dy += p.gravity;
                p.x += p.dx;
                p.y += p.dy;
                p.life--;

                if (p.life <= 0) particles.splice(i, 1);
            });

            ctx.globalAlpha = 1;
            requestAnimationFrame(animate);
        }

        // Fireworks burst interval
        const explosionInterval = setInterval(() => {
            if (explosionCount >= maxExplosions) {
                clearInterval(explosionInterval);
                return;
            }
            const x = Math.random() * canvas.width;
            const y = Math.random() * (canvas.height / 2) + canvas.height / 4;
            explode(x, y, Math.random() * 40 + 50);
        }, 800);

        // Click to create fireworks
        document.addEventListener('click', (e) => {
            if (explosionCount < maxExplosions) {
                explode(e.clientX, e.clientY, 80);
            }
        });

        animate();
    }

    // Window resize handler
    window.addEventListener('resize', () => {
        const canvas = document.getElementById('fireworks');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Special effects for Farzana
function triggerSpecialEffects() {
    // Create colorful confetti
    for (let i = 0; i < 50; i++) {
        createConfetti();
    }
    
    // Add extra hearts
    const loveBackground = document.querySelector('.love-background');
    if (loveBackground) {
        for (let i = 0; i < 5; i++) {
            const extraHeart = document.createElement('div');
            extraHeart.className = 'heart floating-heart';
            extraHeart.style.left = Math.random() * 100 + '%';
            extraHeart.style.animationDelay = Math.random() * 6 + 's';
            extraHeart.style.fontSize = '5rem';
            loveBackground.appendChild(extraHeart);
        }
    }
}

function createConfetti() {
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.width = '10px';
    confetti.style.height = '10px';
    confetti.style.backgroundColor = ['#ff5fa2', '#ff1493', '#8a2be2', '#ff69b4', '#ff20b2'][Math.floor(Math.random() * 5)];
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.top = '-10px';
    confetti.style.borderRadius = '50%';
    confetti.style.pointerEvents = 'none';
    confetti.style.zIndex = '100';
    confetti.style.animation = `confetti-fall ${3 + Math.random() * 2}s linear forwards`;
    
    document.body.appendChild(confetti);
    
    setTimeout(() => confetti.remove(), 5000);
}

// Add confetti animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes confetti-fall {
        to {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
