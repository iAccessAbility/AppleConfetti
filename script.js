document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    let particles = [];
    let numberOfConfettiPerBatch = 5;
    let creationIntervalTime = 100;
    let maxParticles = 200;
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

    const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    const smallScreenWidthThreshold = 400;

    const mainTitle = document.createElement('h1');
    mainTitle.textContent = "WWDC25";
    mainTitle.id = 'mainTitle';
    mainTitle.style.position = 'fixed';
    mainTitle.style.display = 'block';
    mainTitle.style.top = '30%';
    mainTitle.style.left = '50%';
    mainTitle.style.textAlign = 'center';
    mainTitle.style.transform = 'translate(-50%, -50%)';
    mainTitle.style.fontFamily = 'Arial';
    mainTitle.style.color = 'white';
    mainTitle.style.fontSize = '3em';
    body.appendChild(mainTitle);
    
    const secondaryText = document.createElement('p');
    secondaryText.textContent = "Jun. 9 - 13";
    secondaryText.id = 'mainTitle';
    secondaryText.style.position = 'fixed';
    secondaryText.style.display = 'block';
    secondaryText.style.top = '35%';
    secondaryText.style.left = '50%';
    secondaryText.style.textAlign = 'center';
    secondaryText.style.transform = 'translate(-50%, -50%)';
    secondaryText.style.fontFamily = 'Arial';
    secondaryText.style.color = 'white';
    secondaryText.style.fontSize = '2em';
    body.appendChild(secondaryText);

    if (screenWidth < smallScreenWidthThreshold) {
        numberOfConfettiPerBatch = 2;
        maxParticles = 50;
        mainTitle.style.fontSize = '2em';
        secondaryText.style.top = '34%';
        secondaryText.style.fontSize = '1em';
    }

    function createConfettiBatch(count) {
        const titleElement = document.getElementById('mainTitle');
        const titleZIndex = titleElement ? parseInt(titleElement.style.zIndex) || 0 : 0; // Get text z-index or default to 0
        
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
            
            const randomNumber = Math.random();
            if (randomNumber < 0.5) {
                img.style.zIndex = titleZIndex - 1;
            } else if (randomNumber < 0.7) {
                img.style.zIndex = titleZIndex;
            } else {
                img.style.zIndex = titleZIndex + 1;
            }
            
            particles.push({
                element: img,
                speed: Math.random() * 5 + 5,
                rotationSpeed: (Math.random() - 0.9) * 5,
                drift: (Math.random() - 0.9) * 2
            });
        }
    }

    function updateConfetti() {
        particles.forEach((particle, index) => {
            const currentTop = parseFloat(particle.element.style.top) || -200;
            particle.element.style.top = `${currentTop + particle.speed}px`;
            particle.currentRotation = (particle.currentRotation || 0) + particle.rotationSpeed;
            particle.element.style.transform = `rotate(${particle.currentRotation}deg)`;

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
    // Control the z-index to place the h1 behind or in front
    const titleElement = document.getElementById('mainTitle');
    if (titleElement) {
        // To put the h1 behind the logos:
        // titleElement.style.zIndex = '-1';

        // To put the h1 in front of the logos (default):
        titleElement.style.zIndex = '-1'; // Or any positive number
    }
});
