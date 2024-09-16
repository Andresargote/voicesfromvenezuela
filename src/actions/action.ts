'use server';

import { createClient } from '../utils/supabase/server';

export async function addTestimonial({
  message,
  date,
}: {
  message: string;
  date: string;
}) {
  const supabase = createClient();

  const { error } = await supabase.from('testimonials').insert({
    original_message: message,
    created_at: new Date(date).toISOString(),
    status: 'pending',
  });

  if (error) {
    throw error;
  }
}
