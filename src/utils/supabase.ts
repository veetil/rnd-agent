import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials are missing. Please check your environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to add an email to the waitlist
export async function addToWaitlist(email: string): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from('waitlist_rnd_agent')
      .insert([{ email, created_at: new Date().toISOString() }]);

    if (error) throw error;
    
    return { success: true };
  } catch (error: any) {
    console.error('Error adding to waitlist:', error);
    
    // Check if it's a duplicate email error
    if (error.code === '23505') {
      return { success: false, error: 'This email is already on our waitlist.' };
    }
    
    return { success: false, error: 'Failed to join waitlist. Please try again later.' };
  }
}