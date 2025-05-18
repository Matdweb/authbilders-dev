
import React, { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions to match the window
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Create grid nodes
    const nodes: Node[] = [];
    const nodeCount = Math.floor(window.innerWidth * window.innerHeight / 15000);
    
    class Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 1.5 + 1;
        
        // Use AuthBuilders purple shades
        const opacity = Math.random() * 0.5 + 0.1;
        this.color = Math.random() > 0.8 
          ? `rgba(99, 102, 241, ${opacity})` 
          : `rgba(80, 70, 229, ${opacity})`;
      }
      
      update() {
        // Bounce off edges
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        
        this.x += this.vx;
        this.y += this.vy;
      }
      
      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }
    
    // Initialize nodes
    for (let i = 0; i < nodeCount; i++) {
      nodes.push(new Node());
    }
    
    // Connection line drawing function
    const drawConnections = () => {
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Draw line if nodes are close enough
          const maxDistance = 150;
          if (distance < maxDistance) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            
            // Make lines fade with distance
            const opacity = 1 - distance / maxDistance;
            ctx.strokeStyle = `rgba(99, 102, 241, ${opacity * 0.2})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    };
    
    // Occasionally add a "pulse" effect
    let lastPulseTime = Date.now();
    const pulseInterval = 5000; // ms
    let activePulses: { x: number; y: number; radius: number; opacity: number; }[] = [];
    
    const addPulse = () => {
      // Choose a random node as pulse center
      const randomNode = nodes[Math.floor(Math.random() * nodes.length)];
      activePulses.push({
        x: randomNode.x,
        y: randomNode.y,
        radius: 5,
        opacity: 0.5
      });
    };
    
    const updateAndDrawPulses = () => {
      // Check if it's time for a new pulse
      const currentTime = Date.now();
      if (currentTime - lastPulseTime > pulseInterval) {
        addPulse();
        lastPulseTime = currentTime;
      }
      
      // Update and draw active pulses
      for (let i = activePulses.length - 1; i >= 0; i--) {
        const pulse = activePulses[i];
        pulse.radius += 2;
        pulse.opacity -= 0.01;
        
        if (pulse.opacity <= 0) {
          activePulses.splice(i, 1);
          continue;
        }
        
        ctx.beginPath();
        ctx.arc(pulse.x, pulse.y, pulse.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(99, 102, 241, ${pulse.opacity})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    };

    // Add a small padlock icon that occasionally appears
    const padlockImage = new Image();
    padlockImage.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%235046E5' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3' y='11' width='18' height='11' rx='2' ry='2'%3E%3C/rect%3E%3Cpath d='M7 11V7a5 5 0 0 1 10 0v4'%3E%3C/path%3E%3C/svg%3E";
    
    let padlocks: { x: number; y: number; opacity: number; }[] = [];
    
    const maybeAddPadlock = () => {
      if (Math.random() < 0.01 && padlocks.length < 5) {
        padlocks.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          opacity: 0
        });
      }
    };
    
    const updateAndDrawPadlocks = () => {
      for (let i = padlocks.length - 1; i >= 0; i--) {
        const padlock = padlocks[i];
        
        // Fade in and out
        if (padlock.opacity < 0.7) {
          padlock.opacity += 0.01;
        } else {
          padlock.opacity -= 0.01;
        }
        
        if (padlock.opacity <= 0) {
          padlocks.splice(i, 1);
          continue;
        }
        
        ctx.globalAlpha = padlock.opacity;
        ctx.drawImage(padlockImage, padlock.x, padlock.y, 24, 24);
        ctx.globalAlpha = 1;
      }
    };
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw grid connections first (background)
      drawConnections();
      
      // Update and draw nodes
      nodes.forEach(node => {
        node.update();
        node.draw();
      });
      
      // Update and draw pulses
      updateAndDrawPulses();
      
      // Maybe add new padlock and draw existing ones
      maybeAddPadlock();
      updateAndDrawPadlocks();
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="absolute top-0 left-0 w-full h-full -z-10"
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default AnimatedBackground;
