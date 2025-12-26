import React, { useEffect, useRef } from 'react';

const HeroBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        // Configuration
        const blobCount = 5;
        const blobs = [];
        const colors = [
            { r: 76, g: 29, b: 149 },   // Deep Purple
            { r: 59, g: 130, b: 246 },  // Blue
            { r: 147, g: 51, b: 234 },  // Purple
            { r: 236, g: 72, b: 153 },  // Pink
            { r: 30, g: 58, b: 138 }    // Dark Blue
        ];

        class Blob {
            constructor(canvasWidth, canvasHeight) {
                this.radius = Math.random() * 200 + 300; // Large blobs
                this.x = Math.random() * canvasWidth;
                this.y = Math.random() * canvasHeight;
                this.vx = (Math.random() - 0.5) * 0.5; // Slow movement
                this.vy = (Math.random() - 0.5) * 0.5;
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.alpha = Math.random() * 0.3 + 0.1; // Low opacity
            }

            update(width, height) {
                this.x += this.vx;
                this.y += this.vy;

                // Bounce off walls (with buffer)
                if (this.x < -this.radius) this.vx = Math.abs(this.vx);
                if (this.x > width + this.radius) this.vx = -Math.abs(this.vx);
                if (this.y < -this.radius) this.vy = Math.abs(this.vy);
                if (this.y > height + this.radius) this.vy = -Math.abs(this.vy);
            }

            draw(ctx) {
                ctx.beginPath();
                // Create a radial gradient for soft edges
                const gradient = ctx.createRadialGradient(
                    this.x, this.y, 0,
                    this.x, this.y, this.radius
                );

                const { r, g, b } = this.color;
                gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${this.alpha})`);
                gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

                ctx.fillStyle = gradient;
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight; // Full screen or parent height
        };

        const init = () => {
            resize();
            for (let i = 0; i < blobCount; i++) {
                blobs.push(new Blob(canvas.width, canvas.height));
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Dark base background
            ctx.fillStyle = '#0a0a0a';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Global composite for blending effect
            ctx.globalCompositeOperation = 'screen';

            blobs.forEach(blob => {
                blob.update(canvas.width, canvas.height);
                blob.draw(ctx);
            });

            ctx.globalCompositeOperation = 'source-over'; // Reset

            animationFrameId = requestAnimationFrame(animate);
        };

        window.addEventListener('resize', resize);
        init();
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
            style={{ filter: 'blur(60px)' }} // Heavy blur for "nebula" effect
        />
    );
};

export default HeroBackground;
