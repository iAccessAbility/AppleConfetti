document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('confettiCanvas');
    const ctx = canvas.getContext('2d');
    
    canvas.style.backgroundColor = 'black';
    
    let particles = [];
    const numberOfConfetti = 400;
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
    const images = [];

    function preloadImages() {
        appleLogoImages.forEach(src => {
            const img = new Image();
            img.src = src;
            images.push(img);
        });
    }

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function createConfetti() {
        for (let i = 0; i < numberOfConfetti; i++) {
            const randomImageIndex = Math.floor(Math.random() * images.length);
            const image = images[randomImageIndex];
            const size = Math.random() * 30 + 80; // Vary the size

            particles.push({
                x: Math.random() * canvas.width,
                y: -size,
                image: image,
                size: size,
                speed: Math.random() * 3 + 2,
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.1,
                drift: (Math.random() - 0.5) * 5
            });
        }
    }

    function drawConfetti() {
        ctx.fillStyle = 'black'; // Set the fill color to black
        ctx.fillRect(0, 0, canvas.width, canvas.height); // Draw a black rectangle covering the canvas
        
        particles.forEach(particle => {
            ctx.save();
            ctx.translate(particle.x, particle.y);
            ctx.rotate(particle.rotation);
            ctx.drawImage(particle.image, -particle.size / 2, -particle.size / 2, particle.size, particle.size);
            ctx.restore();

            particle.y += particle.speed;
            particle.x += particle.drift;
            particle.rotation += particle.rotationSpeed;

            if (particle.y > canvas.height + particle.size) {
                particle.y = -particle.size;
                particle.x = Math.random() * canvas.width;
                particle.rotation = Math.random() * Math.PI * 2;
            }
        });
        requestAnimationFrame(drawConfetti);
    }

    window.addEventListener('resize', resizeCanvas);

    resizeCanvas();
    preloadImages(); // Load images before starting
    createConfetti(); // Create initial confetti
    drawConfetti(); // Start animation immediately
});