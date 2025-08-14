import Joi from 'joi';

/**
 * Function to clean text by removing HTML tags and unnecessary spaces
 * @param {string} input - The text to clean
 * @returns {string} - The cleaned text
 */
export function sanitizeText(input: string): string {
  if (typeof input !== 'string') return input;
  return input.replace(/<[^>]*>?/gm, '').trim();
}


export const sanitizeTextSchema = Joi.string().custom((value, helpers) => sanitizeText(value)).trim();
