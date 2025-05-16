'use client'

import React, { useEffect, useRef, useState } from 'react';

interface AnimatedVisualProps {
  type?: 'particles' | 'gradient' | 'dataFlow';
  color?: string;
  speed?: 'slow' | 'medium' | 'fast';
}

const AnimatedVisual: React.FC<AnimatedVisualProps> = ({
  type = 'particles',
  color = 'blue',
  speed = 'medium',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  
  // Animation logic
  useEffect(() => {
    if (!canvasRef.current || prefersReducedMotion) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    
    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);
    
    // Animation variables
    let animationFrameId: number;
    const particles: any[] = [];
    
    // Create particles
    const createParticles = () => {
      const particleCount = type === 'particles' ? 50 : 20;
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 5 + 1,
          speedX: (Math.random() - 0.5) * 2,
          speedY: (Math.random() - 0.5) * 2,
          color: getParticleColor(),
        });
      }
    };
    
    // Get particle color based on type and color prop
    const getParticleColor = () => {
      const opacity = Math.random() * 0.5 + 0.3;
      
      switch (color) {
        case 'blue':
          return `rgba(37, 99, 235, ${opacity})`;
        case 'teal':
          return `rgba(13, 148, 136, ${opacity})`;
        default:
          return `rgba(37, 99, 235, ${opacity})`;
      }
    };
    
    // Animation loop
    const animate = () => {
      if (!isPlaying) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw and update particles
      particles.forEach((particle, index) => {
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Boundary check
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX *= -1;
        }
        
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY *= -1;
        }
      });
      
      // Add occasional "optimization" burst
      if (Math.random() < 0.01) {
        const burstX = Math.random() * canvas.width;
        const burstY = Math.random() * canvas.height;
        
        for (let i = 0; i < 10; i++) {
          particles.push({
            x: burstX,
            y: burstY,
            size: Math.random() * 3 + 1,
            speedX: (Math.random() - 0.5) * 5,
            speedY: (Math.random() - 0.5) * 5,
            color: getParticleColor(),
            // Particles from burst will fade out
            life: 100,
          });
        }
      }
      
      // Remove faded particles
      for (let i = 0; i < particles.length; i++) {
        if (particles[i].life !== undefined) {
          particles[i].life--;
          if (particles[i].life <= 0) {
            particles.splice(i, 1);
            i--;
          }
        }
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    // Initialize and start animation
    createParticles();
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
      cancelAnimationFrame(animationFrameId);
    };
  }, [type, color, speed, isPlaying, prefersReducedMotion]);
  
  // Static fallback for reduced motion
  const renderStaticFallback = () => {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <svg 
          width="200" 
          height="200" 
          viewBox="0 0 200 200" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Abstract representation of data optimization"
        >
          <circle cx="100" cy="100" r="80" stroke="#2563EB" strokeWidth="2" />
          <circle cx="100" cy="100" r="60" stroke="#0D9488" strokeWidth="2" />
          <circle cx="100" cy="100" r="40" stroke="#2563EB" strokeWidth="2" />
          <path d="M100 20V180" stroke="#0D9488" strokeWidth="2" />
          <path d="M20 100H180" stroke="#2563EB" strokeWidth="2" />
        </svg>
      </div>
    );
  };
  
  return (
    <div 
      data-testid="animated-visual"
      data-type={type}
      data-playing={isPlaying.toString()}
      data-reduced-motion={prefersReducedMotion.toString()}
      className="w-full h-full relative"
    >
      {prefersReducedMotion ? (
        renderStaticFallback()
      ) : (
        <canvas 
          ref={canvasRef}
          className="w-full h-full"
          aria-label="Animated visualization of data optimization"
        />
      )}
    </div>
  );
};

export default AnimatedVisual;