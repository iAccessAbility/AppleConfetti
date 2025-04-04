document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    let particles = [];
    const numberOfConfettiPerBatch = 5;
    const creationIntervalTime = 100;
    const maxParticles = 200;
    body.style.background = '#000';
    const appleLogoImages = [
        'apple-red.png',
        'apple-orange.png',
        'apple-yellow.png',
        'apple-green.png',
        'apple-blue.png',
        'apple-turquoise.png',
        'apple-pink.png',
        'apple-purple.png',
        'apple-gray.png',
        'apple-white.png'
    ];

    function createConfettiBatch(count) {
        for (let i = 0; i < count; i++) {
            if (particles.length >= maxParticles) { // Optional: Limit total particles
                return;
            }
            const img = document.createElement('img');
            const horizontalStart = Math.random() * (window.innerWidth + 200) - 100;
            img.src = appleLogoImages[Math.floor(Math.random() * appleLogoImages.length)];
            img.classList.add('confetti-particle');
            img.style.width = `100px`;
            img.style.height = `100px`;
            img.style.left = `${horizontalStart}px`;
            img.style.top = `${-200 - Math.random() * 150}px`;
            img.style.transform = `rotate(${Math.random() * 360}deg)`;
            img.style.position = 'fixed';
            body.appendChild(img);
            particles.push({
                element: img,
                speed: Math.random() * 8 + 8,
                rotationSpeed: (Math.random() - 0.5) * 0.1,
                drift: (Math.random() - 0.9) * 2
            });
        }
    }

    function updateConfetti() {
        particles.forEach((particle, index) => {
            const currentTop = parseFloat(particle.element.style.top) || -200;
            particle.element.style.top = `${currentTop + particle.speed}px`;

            if (currentTop > window.innerHeight + 10) {
                particle.element.remove();
                particles.splice(index, 1);
            }
        });

        requestAnimationFrame(updateConfetti);
    }

    function startConfetti() {
        // Start the timer to create confetti batches
        setInterval(() => {
            createConfettiBatch(numberOfConfettiPerBatch);
        }, creationIntervalTime);

        // Start the animation loop for existing particles
        updateConfetti();
    }

    startConfetti();
});
