
import React, { useEffect, useRef } from 'react';

export function Butterfly() {
  const butterflyRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const butterfly = butterflyRef.current;
    if (!butterfly) return;
    
    // Set initial position (starts from left side of screen)
    let posX = -100;
    let posY = Math.random() * 300 + 100; // Random height between 100px and 400px
    let flutterHeight = 0;
    
    // Animation properties
    const speed = 1.5;
    const flutterSpeed = 0.1;
    const flutterAmount = 50;
    
    const animate = () => {
      if (!butterfly) return;
      
      // Move butterfly across screen
      posX += speed;
      
      // Create fluttering motion (up and down motion)
      flutterHeight = Math.sin(posX * flutterSpeed) * flutterAmount;
      
      // Apply the position
      butterfly.style.transform = `translate(${posX}px, ${posY + flutterHeight}px)`;
      
      // Reset when it goes off screen to create a loop
      if (posX > window.innerWidth + 100) {
        posX = -100;
        posY = Math.random() * 300 + 100;
      }
      
      requestAnimationFrame(animate);
    };
    
    const animationId = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);
  
  return (
    <div 
      ref={butterflyRef} 
      className="absolute z-10 pointer-events-none"
      style={{ left: '0', top: '0' }}
    >
      <div className="relative">
        {/* Butterfly wings */}
        <div className="butterfly-wings">
          <div className="wing left-wing"></div>
          <div className="wing right-wing"></div>
        </div>
        
        {/* Butterfly body */}
        <div className="butterfly-body"></div>
      </div>
      
      <style jsx>{`
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
      `}</style>
    </div>
  );
}
