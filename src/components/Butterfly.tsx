
import React, { useEffect, useRef } from 'react';

// Interface for butterfly properties
interface ButterflyProps {
  count?: number;
}

export function Butterfly({ count = 4 }: ButterflyProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    // Create and animate multiple butterflies
    const butterflies: HTMLDivElement[] = [];
    const animations: number[] = [];
    
    // Create butterfly elements
    for (let i = 0; i < count; i++) {
      const butterfly = document.createElement('div');
      butterfly.className = 'butterfly';
      
      // Create wings and body structure
      butterfly.innerHTML = `
        <div class="butterfly-wings">
          <div class="wing left-wing"></div>
          <div class="wing right-wing"></div>
        </div>
        <div class="butterfly-body"></div>
      `;
      
      // Randomize initial position and size
      const size = 0.6 + Math.random() * 0.8; // Size multiplier between 0.6 and 1.4
      const delay = Math.random() * 10; // Random delay for start time
      
      butterfly.style.transform = `scale(${size})`;
      butterfly.style.opacity = '0';
      butterfly.style.position = 'absolute';
      butterfly.style.left = '-100px';
      butterfly.style.top = `${Math.random() * window.innerHeight * 0.6}px`;
      
      container.appendChild(butterfly);
      butterflies.push(butterfly);
      
      // Add some variety to colors
      const hue = 250 + Math.random() * 40; // Purple hues
      const saturation = 70 + Math.random() * 30;
      const lightness = 60 + Math.random() * 20;
      
      const wings = butterfly.querySelector('.butterfly-wings') as HTMLElement;
      if (wings) {
        const leftWing = wings.querySelector('.left-wing') as HTMLElement;
        const rightWing = wings.querySelector('.right-wing') as HTMLElement;
        
        if (leftWing && rightWing) {
          const gradient = `linear-gradient(135deg, hsl(${hue}, ${saturation}%, ${lightness}%) 0%, 
                           hsl(${hue}, ${saturation}%, ${lightness - 10}%) 50%, 
                           hsl(${hue}, ${saturation + 10}%, ${lightness - 20}%) 100%)`;
          
          leftWing.style.background = gradient;
          rightWing.style.background = gradient;
        }
      }
      
      // Start animation with delay
      setTimeout(() => {
        butterfly.style.opacity = '1';
        
        // Animate each butterfly
        let posX = -100;
        let posY = parseFloat(butterfly.style.top);
        let phase = Math.random() * Math.PI * 2; // Random starting phase
        
        // Unique flight parameters for each butterfly
        const horizontalSpeed = 0.8 + Math.random() * 1.2; // Speed variation
        const verticalAmplitude = 30 + Math.random() * 70; // How high/low it flies
        const waviness = 0.05 + Math.random() * 0.15; // How wavy the path is
        const verticalDrift = -0.2 + Math.random() * 0.4; // Slow upward/downward drift
        
        const animate = () => {
          // Update horizontal position
          posX += horizontalSpeed;
          
          // Create natural wavy motion using sine waves with phase variation
          const newY = posY + 
                     Math.sin(posX * waviness + phase) * verticalAmplitude + 
                     Math.sin(posX * waviness * 0.4) * verticalAmplitude * 0.3;
          
          // Apply a very slight vertical drift
          posY += verticalDrift;
          
          // Apply the position
          butterfly.style.transform = `translate(${posX}px, ${newY}px) scale(${size})`;
          
          // Reset when it goes off screen
          if (posX > window.innerWidth + 100) {
            posX = -100;
            posY = Math.random() * window.innerHeight * 0.6;
            phase = Math.random() * Math.PI * 2; // New random phase for next pass
            
            // Randomly vary the height for the next pass
            butterfly.style.top = `${posY}px`;
          }
          
          animations[i] = requestAnimationFrame(animate);
        };
        
        animations[i] = requestAnimationFrame(animate);
      }, delay * 1000);
    }
    
    // Cleanup function
    return () => {
      animations.forEach(id => cancelAnimationFrame(id));
      butterflies.forEach(butterfly => {
        if (butterfly.parentNode) {
          butterfly.parentNode.removeChild(butterfly);
        }
      });
    };
  }, [count]);
  
  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 z-10 pointer-events-none overflow-hidden"
    >
      <style>
        {`
          .butterfly-wings {
            position: relative;
            width: 60px;
            height: 40px;
          }
          
          .wing {
            position: absolute;
            width: 30px;
            height: 40px;
            background: linear-gradient(135deg, #a78bfa 0%, #9b87f5 50%, #7c3aed 100%);
            border-radius: 50% 50% 50% 50%;
            opacity: 0.8;
            animation: flutter 0.6s ease-in-out infinite alternate;
          }
          
          .left-wing {
            left: 0;
            transform-origin: right center;
            animation-delay: 0.1s;
          }
          
          .right-wing {
            right: 0;
            transform-origin: left center;
          }
          
          .butterfly-body {
            position: absolute;
            top: 15px;
            left: 27px;
            width: 6px;
            height: 30px;
            background: linear-gradient(to bottom, #4c1d95, #6d28d9);
            border-radius: 3px;
          }
          
          @keyframes flutter {
            0% {
              transform: rotateY(0deg);
            }
            100% {
              transform: rotateY(70deg);
            }
          }
        `}
      </style>
    </div>
  );
}
