import { useState } from 'react';
import {
  MicroInteraction,
  LoadingAnimation,
  useAnimation,
  useAccessibility,
  usePersona,
  useResponsive,
  PersonaContent,
  ProgressiveDisclosure,
  UserPersona
} from '../index';
import './ExampleComponent.css';

/**
 * Example component demonstrating the use of Phase 2 components
 * This component showcases how to use the various hooks and components
 * from the Phase 2 Enhanced User Experience implementation
 */
export function ExampleComponent() {
  const [isLoading, setIsLoading] = useState(false);
  
  // Access context values from the providers
  const { animationsEnabled, toggleAnimations, animationSpeed, setAnimationSpeed } = useAnimation();
  const { highContrast, toggleHighContrast, fontSizeMultiplier, setFontSizeMultiplier } = useAccessibility();
  const { persona, setPersona } = usePersona();
  const { breakpoint, isMobile } = useResponsive();
  
  // Example function to simulate loading
  const handleButtonClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };
  
  return (
    <div className="example-component">
      <h1>Phase 2 Components Example</h1>
      
      {/* Display current context values */}
      <div className="context-values">
        <h2>Current Context Values</h2>
        <ul>
          <li>Animations Enabled: {animationsEnabled ? 'Yes' : 'No'}</li>
          <li>Animation Speed: {animationSpeed}</li>
          <li>High Contrast: {highContrast ? 'Yes' : 'No'}</li>
          <li>Font Size Multiplier: {fontSizeMultiplier}</li>
          <li>Current Persona: {persona}</li>
          <li>Current Breakpoint: {breakpoint}</li>
          <li>Is Mobile: {isMobile ? 'Yes' : 'No'}</li>
        </ul>
      </div>
      
      {/* Animation examples */}
      <div className="animation-examples">
        <h2>Animation Examples</h2>
        
        <div className="controls">
          <MicroInteraction type="hover-scale">
            <button onClick={toggleAnimations}>
              {animationsEnabled ? 'Disable Animations' : 'Enable Animations'}
            </button>
          </MicroInteraction>
          
          <div className="speed-control">
            <label htmlFor="speed">Animation Speed:</label>
            <input 
              id="speed"
              type="range" 
              min="0.5" 
              max="2" 
              step="0.1" 
              value={animationSpeed}
              onChange={(e) => setAnimationSpeed(parseFloat(e.target.value))}
            />
          </div>
        </div>
        
        <div className="animation-demos">
          <div className="demo-item">
            <h3>MicroInteraction</h3>
            <MicroInteraction type="hover-scale">
              <button>Hover Me</button>
            </MicroInteraction>
          </div>
          
          <div className="demo-item">
            <h3>LoadingAnimation</h3>
            <MicroInteraction type="hover">
              <button onClick={handleButtonClick}>
                {isLoading ? 'Loading...' : 'Click to Load'}
              </button>
            </MicroInteraction>
            
            {isLoading && (
              <LoadingAnimation type="spinner" loadingText="Loading..." showText={true} />
            )}
          </div>
        </div>
      </div>
      
      {/* Accessibility examples */}
      <div className="accessibility-examples">
        <h2>Accessibility Examples</h2>
        
        <div className="controls">
          <MicroInteraction type="hover">
            <button onClick={toggleHighContrast}>
              {highContrast ? 'Disable High Contrast' : 'Enable High Contrast'}
            </button>
          </MicroInteraction>
          
          <div className="font-size-control">
            <label htmlFor="font-size">Font Size:</label>
            <input 
              id="font-size"
              type="range" 
              min="0.8" 
              max="1.5" 
              step="0.1" 
              value={fontSizeMultiplier}
              onChange={(e) => setFontSizeMultiplier(parseFloat(e.target.value))}
            />
          </div>
        </div>
      </div>
      
      {/* Persona examples */}
      <div className="persona-examples">
        <h2>Persona Examples</h2>
        
        <div className="controls">
          <div className="persona-selector">
            <label htmlFor="persona">Select Persona:</label>
            <select 
              id="persona"
              value={persona} 
              onChange={(e) => setPersona(e.target.value as UserPersona)}
            >
              <option value="general">General</option>
              <option value="business-stakeholder">Business Stakeholder</option>
              <option value="engineering-leader">Engineering Leader</option>
              <option value="technical-developer">Technical Developer</option>
              <option value="returning-user">Returning User</option>
            </select>
          </div>
        </div>
        
        <div className="persona-demos">
          <div className="demo-item">
            <h3>PersonaContent</h3>
            <PersonaContent
              businessStakeholder={
                <div className="persona-content business">
                  <h4>Business Stakeholder Content</h4>
                  <p>This content is tailored for business stakeholders, focusing on ROI and business value.</p>
                </div>
              }
              engineeringLeader={
                <div className="persona-content engineering">
                  <h4>Engineering Leader Content</h4>
                  <p>This content is tailored for engineering leaders, focusing on scalability and team productivity.</p>
                </div>
              }
              technicalDeveloper={
                <div className="persona-content developer">
                  <h4>Technical Developer Content</h4>
                  <p>This content is tailored for technical developers, focusing on APIs and implementation details.</p>
                </div>
              }
              general={
                <div className="persona-content general">
                  <h4>General Content</h4>
                  <p>This is the default content shown to all users.</p>
                </div>
              }
            />
          </div>
          
          <div className="demo-item">
            <h3>ProgressiveDisclosure</h3>
            <ProgressiveDisclosure targetPersona="technical-developer">
              <div className="technical-details">
                <h4>Technical Implementation Details</h4>
                <p>This content is primarily shown to technical developers.</p>
                <pre>
                  <code>
                    {`const example = () => {
  return <Component prop="value" />;
};`}
                  </code>
                </pre>
              </div>
            </ProgressiveDisclosure>
          </div>
        </div>
      </div>
      
      {/* Responsive examples */}
      <div className="responsive-examples">
        <h2>Responsive Examples</h2>
        
        <div className="responsive-demos">
          <div className="demo-item">
            <h3>Current Breakpoint: {breakpoint}</h3>
            <p>Resize the window to see this value change.</p>
          </div>
          
          <div className="demo-item">
            <h3>Device Type</h3>
            <p>{isMobile ? 'Mobile Device' : 'Desktop Device'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}