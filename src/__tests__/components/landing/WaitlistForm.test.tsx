import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import WaitlistForm from '@/components/landing/WaitlistForm';

describe('WaitlistForm Component', () => {
  it('renders the form with input and submit button', () => {
    const { getByPlaceholderText, getByRole } = render(<WaitlistForm />);
    
    expect(getByPlaceholderText(/your email/i)).toBeInTheDocument();
    expect(getByRole('button', { name: /join waitlist/i })).toBeInTheDocument();
  });
  
  it('shows validation error for invalid email', async () => {
    const user = userEvent.setup();
    const { getByPlaceholderText, getByRole, getByText } = render(<WaitlistForm />);
    
    const emailInput = getByPlaceholderText(/your email/i);
    const submitButton = getByRole('button', { name: /join waitlist/i });
    
    await user.type(emailInput, 'invalid-email');
    await user.click(submitButton);
    
    expect(getByText(/please enter a valid email/i)).toBeInTheDocument();
  });
  
  it('shows validation error for empty email', async () => {
    const user = userEvent.setup();
    const { getByRole, getByText } = render(<WaitlistForm />);
    
    const submitButton = getByRole('button', { name: /join waitlist/i });
    
    await user.click(submitButton);
    
    expect(getByText(/email is required/i)).toBeInTheDocument();
  });
  
  it('calls onSubmit with email when form is submitted with valid email', async () => {
    const user = userEvent.setup();
    const mockSubmit = jest.fn();
    const { getByPlaceholderText, getByRole } = render(<WaitlistForm onSubmit={mockSubmit} />);
    
    const emailInput = getByPlaceholderText(/your email/i);
    const submitButton = getByRole('button', { name: /join waitlist/i });
    
    await user.type(emailInput, 'test@example.com');
    await user.click(submitButton);
    
    expect(mockSubmit).toHaveBeenCalledWith('test@example.com');
  });
  
  it('shows success message after successful submission', async () => {
    const user = userEvent.setup();
    const mockSubmit = jest.fn().mockResolvedValue(undefined);
    const { getByPlaceholderText, getByRole, findByText } = render(<WaitlistForm onSubmit={mockSubmit} />);
    
    const emailInput = getByPlaceholderText(/your email/i);
    const submitButton = getByRole('button', { name: /join waitlist/i });
    
    await user.type(emailInput, 'test@example.com');
    await user.click(submitButton);
    
    expect(await findByText(/thank you for joining our waitlist/i)).toBeInTheDocument();
  });
  
  it('shows error message when submission fails', async () => {
    const user = userEvent.setup();
    const mockSubmit = jest.fn().mockRejectedValue(new Error('Submission failed'));
    const { getByPlaceholderText, getByRole, findByText } = render(<WaitlistForm onSubmit={mockSubmit} />);
    
    const emailInput = getByPlaceholderText(/your email/i);
    const submitButton = getByRole('button', { name: /join waitlist/i });
    
    await user.type(emailInput, 'test@example.com');
    await user.click(submitButton);
    
    expect(await findByText(/something went wrong/i)).toBeInTheDocument();
  });
  
  it('shows loading state during submission', async () => {
    const user = userEvent.setup();
    // Create a promise that we can resolve manually
    let resolveSubmit: (value: unknown) => void;
    const submitPromise = new Promise((resolve) => {
      resolveSubmit = resolve;
    });
    
    const mockSubmit = jest.fn().mockImplementation(() => submitPromise);
    const { getByPlaceholderText, getByRole } = render(<WaitlistForm onSubmit={mockSubmit} />);
    
    const emailInput = getByPlaceholderText(/your email/i);
    const submitButton = getByRole('button', { name: /join waitlist/i });
    
    await user.type(emailInput, 'test@example.com');
    await user.click(submitButton);
    
    // Button should be disabled and show loading state
    expect(submitButton).toBeDisabled();
    expect(submitButton).toHaveTextContent(/submitting/i);
    
    // Resolve the promise to complete the submission
    resolveSubmit!(undefined);
  });
});