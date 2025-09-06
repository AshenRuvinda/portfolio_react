import React, { useState, useRef, useEffect } from 'react';
import './NameBadge.css';

const NameBadge = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [isSwaying, setIsSwaying] = useState(true);
  const [isFlipped, setIsFlipped] = useState(false);
  const [lastTap, setLastTap] = useState(0);
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const badgeRef = useRef(null);
  const dragStart = useRef({ x: 0, y: 0 });
  const lastPosition = useRef({ x: 0, y: 0 });
  const animationRef = useRef();

  // Enhanced physics simulation with more realistic movement
  useEffect(() => {
    if (!isDragging && isSwaying) {
      const animate = () => {
        const time = Date.now() * 0.001;
        // Multi-layered natural movement
        const primarySway = Math.sin(time * 0.8) * 1.2;
        const secondarySway = Math.sin(time * 1.3) * 0.6;
        const microMovement = Math.sin(time * 2.1) * 0.2;
        
        const totalRotation = primarySway + secondarySway + microMovement;
        setRotation(totalRotation);
        
        animationRef.current = requestAnimationFrame(animate);
      };
      animate();
      
      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }
  }, [isDragging, isSwaying]);

  // Mouse tracking for realistic light reflection
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Enhanced drag physics
  const handleDragStart = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setIsSwaying(false);
    
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    dragStart.current = {
      x: clientX - position.x,
      y: clientY - position.y
    };
    
    lastPosition.current = { ...position };
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    const newX = clientX - dragStart.current.x;
    const newY = clientY - dragStart.current.y;
    
    const velX = newX - lastPosition.current.x;
    const velY = newY - lastPosition.current.y;
    setVelocity({ x: velX, y: velY });
    
    // More dramatic rotation during drag
    const moveRotation = Math.atan2(velY, velX) * (180 / Math.PI) * 0.15 + velX * 0.3;
    setRotation(moveRotation);
    
    setPosition({ x: newX, y: newY });
    lastPosition.current = { x: newX, y: newY };
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    
    // Physics-based settling
    let settleRotation = rotation;
    const settleAnimation = () => {
      settleRotation *= 0.95; // Decay
      setRotation(settleRotation);
      
      if (Math.abs(settleRotation) > 0.1) {
        requestAnimationFrame(settleAnimation);
      } else {
        setTimeout(() => setIsSwaying(true), 200);
      }
    };
    
    settleAnimation();
  };

  const handleDoubleTap = (e) => {
    e.stopPropagation();
    const now = Date.now();
    if (now - lastTap < 300) {
      setIsFlipped(!isFlipped);
    }
    setLastTap(now);
  };

  // Global event listeners
  useEffect(() => {
    if (isDragging) {
      const handleMouseMove = (e) => handleDragMove(e);
      const handleMouseUp = () => handleDragEnd();
      const handleTouchMove = (e) => handleDragMove(e);
      const handleTouchEnd = () => handleDragEnd();

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isDragging, position]);

  return (
    <div className="badge-environment">
      <div 
        className={`badge-system ${isDragging ? 'dragging' : ''}`}
        style={{ 
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
        ref={badgeRef}
      >
        {/* Ultra-realistic rope/lanyard system */}
        <div className="lanyard-system">
          {/* Metal clip attachment point */}
          <div className="metal-clip-assembly">
            <div className="clip-body">
              <div className="clip-hinge"></div>
              <div className="clip-spring-mechanism">
                <div className="spring-coil"></div>
              </div>
              <div className="clip-teeth"></div>
            </div>
            <div className="safety-pin">
              <div className="pin-head"></div>
              <div className="pin-shaft"></div>
            </div>
          </div>
          
          {/* Realistic woven lanyard */}
          <div 
            className="realistic-lanyard"
            style={{
              transform: `rotate(${rotation * 0.7}deg)`,
              transformOrigin: 'top center'
            }}
          >
            <div className="lanyard-weave-pattern"></div>
            <div className="lanyard-fibers"></div>
            <div className="lanyard-edge-binding"></div>
          </div>
          
          {/* Badge clip connector */}
          <div className="badge-connector">
            <div className="connector-ring"></div>
            <div className="connector-swivel"></div>
          </div>
        </div>
        
        {/* Ultra-realistic badge holder */}
        <div 
          className={`professional-badge ${isFlipped ? 'flipped' : ''} ${isDragging ? 'dragging' : ''}`}
          style={{
            transform: `rotate(${rotation * 0.9}deg)`,
            transformOrigin: 'top center',
            '--mouse-x': `${mousePosition.x}px`,
            '--mouse-y': `${mousePosition.y}px`
          }}
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
          onClick={handleDoubleTap}
        >
          {/* Protective plastic sleeve with realistic refraction */}
          <div className="plastic-protector">
            <div className="plastic-reflection"></div>
            <div className="plastic-distortion"></div>
            <div className="fingerprint-smudges"></div>
          </div>
          
          {/* Front Side - Corporate ID */}
          <div className="badge-face front">
            {/* Holographic security strip */}
            <div className="holographic-strip">
              <div className="holo-pattern"></div>
            </div>
            
            {/* Corporate header with embossed logo */}
            <div className="corporate-header">
              <div className="company-emblem">
                <div className="emblem-shine"></div>
                <div className="emblem-text">ASHEN</div>
                <div className="emblem-subtitle">TECHNOLOGIES</div>
              </div>
              <div className="security-level">
                <div className="level-badge premium">
                  <span>SENIOR DEV</span>
                  <div className="level-indicator"></div>
                </div>
              </div>
            </div>
            
            {/* Professional photo section */}
            <div className="photo-credentials-section">
              <div className="professional-photo">
                <div className="photo-frame">
                  <img 
                    src="https://raw.githubusercontent.com/AshenRuvinda/ProjectImages/master/IMG_6799-removebg-preview.png"
                    alt="Professional headshot"
                    className="employee-photo"
                  />
                  <div className="photo-overlay"></div>
                  <div className="photo-corner-cut"></div>
                </div>
              </div>
              
              <div className="credentials-info">
                <h1 className="full-name">ASHEN RUVINDA</h1>
                <div className="title-hierarchy">
                  <p className="primary-title">Senior Software Engineer</p>
                  <p className="department">Full-Stack Development</p>
                  <p className="specialization">React • Node.js • Cloud Architecture</p>
                </div>
                
                <div className="employee-metadata">
                  <div className="id-section">
                    <span className="id-prefix">EMP</span>
                    <span className="id-number">2024-SE-001</span>
                  </div>
                  <div className="location-info">
                    <span className="location-icon">📍</span>
                    <span className="location-text">Colombo, Sri Lanka</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Access control indicators */}
            <div className="access-control-section">
              <div className="clearance-level high-clearance">
                <div className="clearance-indicator">
                  <div className="access-dot active"></div>
                  <span>FULL SYSTEM ACCESS</span>
                </div>
                <div className="biometric-icon">🔐</div>
              </div>
              
              <div className="skills-badges">
                <div className="skill-chip expert">React Expert</div>
                <div className="skill-chip expert">Node.js</div>
                <div className="skill-chip advanced">AWS Cloud</div>
              </div>
            </div>
            
            {/* Security footer with chip */}
            <div className="security-footer">
              <div className="validity-period">
                <span className="valid-label">VALID THROUGH</span>
                <span className="expiry-date">12/2024</span>
              </div>
              
              <div className="rfid-chip">
                <div className="chip-contacts">
                  <div className="contact-pad"></div>
                  <div className="contact-pad"></div>
                  <div className="contact-pad"></div>
                  <div className="contact-pad"></div>
                </div>
                <div className="chip-body"></div>
              </div>
              
              <div className="magnetic-strip"></div>
            </div>
          </div>

          {/* Back Side - Technical Profile */}
          <div className="badge-face back">
            <div className="tech-header">
              <h2>DEVELOPER PROFILE</h2>
              <div className="qr-authentication">
                <div className="qr-code-realistic">
                  <div className="qr-data-pattern"></div>
                  <div className="qr-finder-patterns">
                    <div className="finder-pattern"></div>
                    <div className="finder-pattern"></div>
                    <div className="finder-pattern"></div>
                  </div>
                </div>
                <p className="qr-label">SCAN FOR PORTFOLIO</p>
              </div>
            </div>
            
            <div className="technical-showcase">
              <div className="expertise-matrix">
                <h3>TECHNICAL EXPERTISE</h3>
                <div className="tech-proficiency-grid">
                  <div className="proficiency-item master">
                    <span className="tech-name">React/Redux</span>
                    <div className="proficiency-bar"><div className="fill-95"></div></div>
                  </div>
                  <div className="proficiency-item master">
                    <span className="tech-name">Node.js/Express</span>
                    <div className="proficiency-bar"><div className="fill-92"></div></div>
                  </div>
                  <div className="proficiency-item advanced">
                    <span className="tech-name">Python/Django</span>
                    <div className="proficiency-bar"><div className="fill-88"></div></div>
                  </div>
                  <div className="proficiency-item advanced">
                    <span className="tech-name">AWS/Docker</span>
                    <div className="proficiency-bar"><div className="fill-85"></div></div>
                  </div>
                  <div className="proficiency-item intermediate">
                    <span className="tech-name">MongoDB</span>
                    <div className="proficiency-bar"><div className="fill-78"></div></div>
                  </div>
                  <div className="proficiency-item intermediate">
                    <span className="tech-name">GraphQL</span>
                    <div className="proficiency-bar"><div className="fill-75"></div></div>
                  </div>
                </div>
              </div>
              
              <div className="achievement-metrics">
                <div className="metric-card">
                  <div className="metric-value">5+</div>
                  <div className="metric-label">Years Experience</div>
                  <div className="metric-icon">⏱️</div>
                </div>
                <div className="metric-card">
                  <div className="metric-value">47</div>
                  <div className="metric-label">Projects Completed</div>
                  <div className="metric-icon">🚀</div>
                </div>
                <div className="metric-card">
                  <div className="metric-value">98%</div>
                  <div className="metric-label">Success Rate</div>
                  <div className="metric-icon">⭐</div>
                </div>
              </div>
              
              <div className="contact-professional">
                <h4>PROFESSIONAL CONTACT</h4>
                <div className="contact-grid">
                  <div className="contact-method">
                    <div className="contact-icon">📧</div>
                    <span>ashen.ruvinda@dev.lk</span>
                  </div>
                  <div className="contact-method">
                    <div className="contact-icon">💼</div>
                    <span>linkedin.com/in/ashen-ruvinda</span>
                  </div>
                  <div className="contact-method">
                    <div className="contact-icon">🐙</div>
                    <span>github.com/AshenRuvinda</span>
                  </div>
                  <div className="contact-method">
                    <div className="contact-icon">📱</div>
                    <span>+94 76 151 1231</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="security-back-footer">
              <div className="security-warning">
                <span className="warning-icon">⚠️</span>
                <span>AUTHORIZED PERSONNEL ONLY</span>
              </div>
              <div className="serial-number">SN: ASR-2024-DEV-001</div>
            </div>
          </div>
        </div>
        
        {/* Enhanced interaction feedback */}
        <div className="interaction-guide">
          <div className="guide-text">
            {isDragging ? '🎯 Dragging Badge' : '💫 Double-tap to flip • Drag to swing'}
          </div>
          <div className="physics-indicator">
            {isSwaying ? '🌊 Natural Sway Active' : '⏸️ Physics Paused'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NameBadge;