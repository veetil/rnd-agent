import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from '@/components/landing/Footer';

describe('Footer Component', () => {
  const defaultProps = {
    companyName: 'IdeaCode',
    copyrightYear: 2025,
    links: [
      { label: 'About', href: '/about' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Contact', href: '/contact' }
    ],
    socialLinks: [
      { platform: 'twitter', href: 'https://twitter.com/ideacode' },
      { platform: 'github', href: 'https://github.com/ideacode' },
      { platform: 'linkedin', href: 'https://linkedin.com/company/ideacode' }
    ],
    companyInfo: 'Transforming research into production-ready code'
  };

  it('renders the company name and copyright information', () => {
    const { getByText } = render(<Footer {...defaultProps} />);
    
    expect(getByText(`© ${defaultProps.copyrightYear} ${defaultProps.companyName}. All rights reserved.`)).toBeInTheDocument();
  });

  it('renders all navigation links', () => {
    const { getByText } = render(<Footer {...defaultProps} />);
    
    defaultProps.links.forEach(link => {
      const linkElement = getByText(link.label);
      expect(linkElement).toBeInTheDocument();
      expect(linkElement.closest('a')).toHaveAttribute('href', link.href);
    });
  });

  it('renders all social media links', () => {
    const { getByTestId } = render(<Footer {...defaultProps} />);
    
    defaultProps.socialLinks.forEach(link => {
      const socialLink = getByTestId(`social-${link.platform}`);
      expect(socialLink).toBeInTheDocument();
      expect(socialLink).toHaveAttribute('href', link.href);
    });
  });

  it('renders company information', () => {
    const { getByText } = render(<Footer {...defaultProps} />);
    
    expect(getByText(defaultProps.companyInfo)).toBeInTheDocument();
  });

  it('applies custom className when provided', () => {
    const customClass = 'custom-footer-class';
    const { container } = render(<Footer {...defaultProps} className={customClass} />);
    
    expect(container.firstChild).toHaveClass(customClass);
  });
});