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
    const smallScreenWidthThreshold = 345;
    const audioElement = new Audio("audio.mp3");
    let isPlaying = false;
    audioElement.autoplay = true;
    audioElement.loop = false;
    audioElement.mute = false;
    body.appendChild(audioElement);

    function handleFirstInteraction() {
        audioElement.muted = false;
        audioElement.play().catch(error => {
            console.error("Audio play failed after interaction:", error);
        });
        document.removeEventListener('click', handleFirstInteraction);
        document.removeEventListener('touchstart', handleFirstInteraction);
    }

    // Add event listeners for the first user interaction
    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('touchstart', handleFirstInteraction);

    const mainTitle = document.createElement('h1');
    mainTitle.textContent = "Awe Dropping";
    mainTitle.id = 'mainTitle';
    mainTitle.style.position = 'fixed';
    mainTitle.style.display = 'block';
    mainTitle.style.top = '30%';
    mainTitle.style.left = '50%';
    mainTitle.style.width = '100%';
    mainTitle.style.textAlign = 'center';
    mainTitle.style.transform = 'translate(-50%, -50%)';
    mainTitle.style.fontFamily = 'Arial';
    mainTitle.style.color = 'white';
    mainTitle.style.fontSize = '3em';
    body.appendChild(mainTitle);
    
    const secondaryText = document.createElement('p');
    secondaryText.textContent = "September 9 10 AM PT";
    secondaryText.id = 'mainTitle';
    secondaryText.style.position = 'fixed';
    secondaryText.style.display = 'block';
    secondaryText.style.top = '36%';
    secondaryText.style.left = '50%';
    secondaryText.style.width = '100%';
    secondaryText.style.textAlign = 'center';
    secondaryText.style.transform = 'translate(-50%, -50%)';
    secondaryText.style.fontFamily = 'Arial';
    secondaryText.style.color = 'white';
    secondaryText.style.fontSize = '1.5em';
    body.appendChild(secondaryText);
    
    const footerText = document.createElement('footer');
    footerText.textContent = "♫ Start Up - A. J. Cook ♫";
    footerText.style.position = 'fixed';
    footerText.style.top = '97%';
    footerText.style.textAlign = 'center';
    footerText.style.right = '10px';
    footerText.style.fontFamily = 'Arial';
    footerText.style.color = '#ddd';
    body.appendChild(footerText);
    
    footerText.addEventListener('touchstart', () => {
        if (isPlaying) {
            audioElement.pause();
            footerText.textContent = 'Play Music';
        } else {
            audioElement.play().catch(error => {
                console.error("Failed to Play Music:", error);
                footerText.textContent = 'Play Failed';
            });
            footerText.textContent = 'Pause Music';
        }
        isPlaying = !isPlaying;
    });
    
    if (screenWidth < smallScreenWidthThreshold) {
        numberOfConfettiPerBatch = 2;
        maxParticles = 50;
        mainTitle.style.left = '50%';
        mainTitle.style.fontSize = '1.5em';
        secondaryText.style.top = '37%';
        secondaryText.style.fontSize = '0.9em';
        footerText.style.top = '75%';
    }

    function createConfettiBatch(count) {
        const titleElement = document.getElementById('mainTitle');
        const titleZIndex = titleElement ? parseInt(titleElement.style.zIndex) || 0 : 0;
        
        for (let i = 0; i < count; i++) {
            if (particles.length >= maxParticles) {
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

            if (currentTop > window.innerHeight + 5) {
                particle.element.remove();
                particles.splice(index, 1);
            }
        });

        requestAnimationFrame(updateConfetti);
    }

    function startConfetti() {
        setInterval(() => {
            createConfettiBatch(numberOfConfettiPerBatch);
        }, creationIntervalTime);
        updateConfetti();
    }
    startConfetti();
    const titleElement = document.getElementById('mainTitle');
    if (titleElement) {
         titleElement.style.zIndex = '-1';
    }
});
