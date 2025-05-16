'use client'

import React from 'react';
import Link from 'next/link';
import SocialIcon from './SocialIcon';

interface FooterLink {
  label: string;
  href: string;
}

interface SocialLink {
  platform: string;
  href: string;
}

interface FooterProps {
  companyName: string;
  copyrightYear: number;
  links: FooterLink[];
  socialLinks: SocialLink[];
  companyInfo: string;
  className?: string;
}

const Footer: React.FC<FooterProps> = ({
  companyName,
  copyrightYear,
  links,
  socialLinks,
  companyInfo,
  className = '',
}) => {
  return (
    <footer className={`bg-gray-900 text-white py-12 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold mb-4">{companyName}</h3>
            <p className="text-gray-400 mb-4">{companyInfo}</p>
            <p className="text-gray-400">
              © {copyrightYear} {companyName}. All rights reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {links.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={`social-${link.platform}`}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <SocialIcon
                    platform={link.platform}
                    className="w-6 h-6"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Default props for easier usage
Footer.defaultProps = {
  companyName: 'IdeaCode',
  copyrightYear: new Date().getFullYear(),
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

export default Footer;