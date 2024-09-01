'use server';

import { createClient } from '../utils/supabase/server';

export async function addTestimonial(message: string) {
  const supabase = createClient();

  const { error } = await supabase.from('testimonials').insert({
    original_message: message,
    status: 'pending',
  });

  if (error) {
    throw error;
  }
}
