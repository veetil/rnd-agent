import { useState, useEffect } from 'react';
import Logo from './Logo';
import Button from './Button';

interface NavigationItem {
  label: string;
  href: string;
}

interface HeaderProps {
  logoSrc: string;
  navigationItems: NavigationItem[];
  ctaText: string;
  ctaAction: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  logoSrc, 
  navigationItems, 
  ctaText, 
  ctaAction 
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  return (
    <header 
      data-testid="header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'scrolled bg-white shadow-md py-2' : 'py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Logo src={logoSrc} />
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navigationItems.map((item) => (
            <a 
              key={item.href} 
              href={item.href}
              className="text-gray-800 hover:text-blue-600 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>
        
        {/* CTA Button */}
        <Button onClick={ctaAction}>{ctaText}</Button>
        
        {/* Mobile Menu Toggle */}
        <button 
          data-testid="hamburger-icon"
          className="md:hidden flex flex-col space-y-1"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span className="block w-6 h-0.5 bg-gray-800"></span>
          <span className="block w-6 h-0.5 bg-gray-800"></span>
          <span className="block w-6 h-0.5 bg-gray-800"></span>
        </button>
      </div>
      
      {/* Mobile Menu */}
      <div 
        data-testid="mobile-menu"
        className={`md:hidden absolute top-full left-0 right-0 bg-white shadow-md transition-all duration-300 ${
          isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          <nav className="flex flex-col space-y-4">
            {navigationItems.map((item) => (
              <a 
                key={item.href} 
                href={item.href}
                className="text-gray-800 hover:text-blue-600 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;