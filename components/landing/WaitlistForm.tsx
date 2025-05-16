'use client'

import React, { useState } from 'react';
import Button from './Button';
import { addToWaitlist } from '@/src/utils/supabase';

interface WaitlistFormProps {
  onSubmit?: (email: string) => Promise<void>;
  className?: string;
}

const WaitlistForm: React.FC<WaitlistFormProps> = ({
  onSubmit,
  className = ''
}) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset states
    setError(null);
    setSubmitError(null);
    
    // Validate email
    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // If custom onSubmit is provided, use it
      if (onSubmit) {
        await onSubmit(email);
      } else {
        // Otherwise use the Supabase integration
        const result = await addToWaitlist(email);
        
        if (!result.success) {
          throw new Error(result.error);
        }
      }
      
      setIsSuccess(true);
      setEmail('');
    } catch (err: any) {
      setSubmitError(err.message || 'Something went wrong. Please try again later.');
      console.error('Waitlist submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`w-full max-w-md mx-auto ${className}`}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Join Our Waitlist
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Be the first to access the R&D Agent Store and transform your research into production-ready code.
        </p>
        
        {isSuccess ? (
          <div className="text-center p-4 bg-green-50 dark:bg-green-900 rounded-md">
            <p className="text-green-700 dark:text-green-300 font-medium">
              Thank you for joining our waitlist!
            </p>
            <p className="text-green-600 dark:text-green-400 text-sm mt-1">
              We'll notify you when we launch.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} data-testid="waitlist-form">
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="Your email address"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
              />
              {error && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
              )}
            </div>
            
            <Button
              variant="primary"
              size="large"
              className="w-full"
              type="submit"
              disabled={isSubmitting}
              onClick={() => {}} // Empty onClick to avoid TypeScript errors
            >
              {isSubmitting ? 'Submitting...' : 'Join Waitlist'}
            </Button>
            
            {submitError && (
              <p className="mt-3 text-sm text-red-600 dark:text-red-400 text-center">{submitError}</p>
            )}
          </form>
        )}
        
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center">
          We respect your privacy and will never share your information.
        </p>
      </div>
    </div>
  );
};

export default WaitlistForm;