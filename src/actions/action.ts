'use server';

import { createClient } from '../utils/supabase/server';
import { TestimonialCategory } from '../utils/types';

export async function addTestimonial({
  message,
  date,
  category,
}: {
  message: string;
  date: string;
  category: TestimonialCategory;
}) {
  const supabase = createClient();

  const { error } = await supabase.from('testimonials').insert({
    original_message: message,
    created_at: new Date(date).toISOString(),
    status: 'pending',
    category,
  });

  if (error) {
    throw error;
  }
}
