import React, { useEffect, useRef } from 'react';

const HeroBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        // Configuration
        const colorPalettes = [
            // Green/Teal Aurora
            { r: 0, g: 255, b: 128 },
            { r: 0, g: 200, b: 255 },
            { r: 50, g: 255, b: 50 },
            // Occasional Purple
            { r: 147, g: 51, b: 234 }
        ];

        let time = 0;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const drawAurora = (yOffset, color, speed, amplitude, frequency) => {
            ctx.beginPath();
            const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
            // Fade in/out for clarity
            gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`);
            gradient.addColorStop(0.5, `rgba(${color.r}, ${color.g}, ${color.b}, 0.2)`);
            gradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`);

            ctx.fillStyle = gradient;

            // Draw a wave across the screen
            ctx.moveTo(0, canvas.height);
            for (let x = 0; x <= canvas.width; x += 20) {
                // Combine multiple sine waves for organic "curtain" feel
                const y = yOffset +
                    Math.sin(x * frequency + time * speed) * amplitude +
                    Math.cos(x * frequency * 0.5 + time * speed * 0.8) * (amplitude * 0.5);
                ctx.lineTo(x, y);
            }
            ctx.lineTo(canvas.width, canvas.height);
            ctx.lineTo(0, canvas.height);
            ctx.closePath();
            ctx.fill();
        };

        const animate = () => {
            time += 0.01;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Dark night sky background
            ctx.fillStyle = '#050505';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw Stars
            // (Optional: keeps the space vibe intact)
            // ... (Skipping stars for cleaner aurora focus if desired, or keep simple)

            // Global composite for blending light
            ctx.globalCompositeOperation = 'screen';

            // Draw Aurora Layers
            drawAurora(canvas.height * 0.4, colorPalettes[0], 0.5, 60, 0.002);
            drawAurora(canvas.height * 0.5, colorPalettes[1], 0.7, 80, 0.003);
            drawAurora(canvas.height * 0.3, colorPalettes[3], 0.4, 100, 0.001);

            ctx.globalCompositeOperation = 'source-over';

            animationFrameId = requestAnimationFrame(animate);
        };

        window.addEventListener('resize', resize);
        resize();
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ filter: 'blur(30px)' }} // Increased blur for softer aurora
        />
    );
};

export default HeroBackground;
