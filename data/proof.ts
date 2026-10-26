// Proof data. The home page proof section renders only when this file has
// verified entries. Entries require verified content and permission to
// publish. Never invent bios, quotes, counts, or ratings.
export type Instructor = {
  name: string;
  role: string;
  background: string;
  photo?: { src: string; alt: string; width: number; height: number };
};

export type Testimonial = {
  quote: string;
  attribution: string;
};

export const instructors: Instructor[] = [];

export const testimonials: Testimonial[] = [];
