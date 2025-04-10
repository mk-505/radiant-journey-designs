
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
      
      // Create wings and body structure with more detailed anatomy
      butterfly.innerHTML = `
        <div class="butterfly-wings">
          <div class="wing left-wing">
            <div class="wing-pattern"></div>
          </div>
          <div class="wing right-wing">
            <div class="wing-pattern"></div>
          </div>
        </div>
        <div class="butterfly-body">
          <div class="antenna left-antenna"></div>
          <div class="antenna right-antenna"></div>
        </div>
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
          
          // Add patterns to wings for more detail
          const leftPattern = leftWing.querySelector('.wing-pattern') as HTMLElement;
          const rightPattern = rightWing.querySelector('.wing-pattern') as HTMLElement;
          
          if (leftPattern && rightPattern) {
            leftPattern.style.background = `radial-gradient(circle at 70% 30%, 
                                          rgba(255, 255, 255, 0.5) 0%, 
                                          rgba(255, 255, 255, 0.1) 20%, 
                                          transparent 60%)`;
            rightPattern.style.background = `radial-gradient(circle at 30% 30%, 
                                           rgba(255, 255, 255, 0.5) 0%, 
                                           rgba(255, 255, 255, 0.1) 20%, 
                                           transparent 60%)`;
          }
        }
      }
      
      // Start animation with delay
      setTimeout(() => {
        butterfly.style.opacity = '1';
        
        // Animate each butterfly
        let posX = -100;
        let posY = parseFloat(butterfly.style.top);
        let phase = Math.random() * Math.PI * 2; // Random starting phase
        let loopPhase = Math.random() * Math.PI * 2; // Separate phase for loops
        
        // Flight parameters
        const baseSpeed = 0.8 + Math.random() * 1.2; // Base horizontal speed
        const loopFrequency = 0.002 + Math.random() * 0.003; // How often loops occur
        const loopSize = 80 + Math.random() * 100; // Size of loops
        const waviness = 0.03 + Math.random() * 0.08; // How wavy the path is
        const verticalAmplitude = 30 + Math.random() * 50; // Vertical movement range
        const verticalDrift = -0.1 + Math.random() * 0.2; // Slow upward/downward drift
        
        // Unique flap speed for each butterfly
        const flapSpeed = 150 + Math.random() * 100; // Lower = faster flapping
        
        // Animation control variables
        let isLooping = false;
        let loopProgress = 0;
        let loopCenter = { x: 0, y: 0 };
        let lastTime = performance.now();
        
        const animate = (time: number) => {
          const deltaTime = time - lastTime;
          lastTime = time;
          
          // Decide whether to start a new loop
          if (!isLooping && Math.random() < 0.005) {
            isLooping = true;
            loopProgress = 0;
            loopCenter = { x: posX, y: posY };
          }
          
          // If in a loop, follow a circular path
          if (isLooping) {
            loopProgress += deltaTime * 0.003; // Loop speed
            
            if (loopProgress >= Math.PI * 2) {
              isLooping = false;
            } else {
              // Create a circular/elliptical loop path
              const loopX = loopCenter.x + Math.cos(loopProgress) * loopSize;
              const loopY = loopCenter.y + Math.sin(loopProgress) * (loopSize * 0.7);
              
              posX = loopX;
              posY = loopY;
            }
          } else {
            // Normal wavy flight path
            posX += baseSpeed * (deltaTime / 16); // Normalize speed
            
            // Create natural wavy motion using sine waves with phase variation
            posY = parseFloat(butterfly.style.top) + 
                  Math.sin(posX * waviness + phase) * verticalAmplitude + 
                  Math.sin(posX * waviness * 0.4) * verticalAmplitude * 0.3;
            
            // Apply a very slight vertical drift
            butterfly.style.top = (parseFloat(butterfly.style.top) + verticalDrift * (deltaTime / 16)) + 'px';
          }
          
          // Calculate rotation based on movement direction
          const dx = posX - parseFloat(butterfly.style.left || '0');
          const dy = posY - parseFloat(butterfly.style.top || '0');
          const angle = Math.atan2(dy, dx) * (180 / Math.PI);
          
          // Apply the position with slight rotation to follow direction
          butterfly.style.left = `${posX}px`;
          butterfly.style.top = `${posY}px`;
          butterfly.style.transform = `translate(-50%, -50%) scale(${size}) rotate(${angle + 90}deg)`;
          
          // Update wing flapping animation speed based on movement
          const speed = Math.sqrt(dx * dx + dy * dy);
          const wingElements = butterfly.querySelectorAll('.wing') as NodeListOf<HTMLElement>;
          wingElements.forEach(wing => {
            // Adjust flapping speed based on movement speed
            wing.style.animationDuration = `${flapSpeed / (speed + 1)}ms`;
          });
          
          // Reset when it goes off screen
          if (posX > window.innerWidth + 100) {
            posX = -100;
            posY = Math.random() * window.innerHeight * 0.7;
            phase = Math.random() * Math.PI * 2; // New random phase
            isLooping = false;
            
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
          .butterfly {
            transform-origin: center center;
          }
          
          .butterfly-wings {
            position: relative;
            width: 60px;
            height: 40px;
            transform-style: preserve-3d;
          }
          
          .wing {
            position: absolute;
            width: 30px;
            height: 40px;
            background: linear-gradient(135deg, #a78bfa 0%, #9b87f5 50%, #7c3aed 100%);
            border-radius: 80% 80% 60% 60%;
            opacity: 0.8;
          }
          
          .wing-pattern {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            border-radius: inherit;
          }
          
          .left-wing {
            left: 0;
            transform-origin: right center;
            animation: flutter-left 0.15s ease-in-out infinite alternate;
          }
          
          .right-wing {
            right: 0;
            transform-origin: left center;
            animation: flutter-right 0.15s ease-in-out infinite alternate;
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
          
          .antenna {
            position: absolute;
            width: 1px;
            height: 12px;
            background-color: #4c1d95;
            top: -10px;
          }
          
          .left-antenna {
            left: 1px;
            transform: rotate(-30deg);
          }
          
          .right-antenna {
            right: 1px;
            transform: rotate(30deg);
          }
          
          @keyframes flutter-left {
            0% {
              transform: rotateY(15deg) rotateX(5deg);
            }
            100% {
              transform: rotateY(80deg) rotateX(-5deg);
            }
          }
          
          @keyframes flutter-right {
            0% {
              transform: rotateY(-15deg) rotateX(5deg);
            }
            100% {
              transform: rotateY(-80deg) rotateX(-5deg);
            }
          }
        `}
      </style>
    </div>
  );
}
