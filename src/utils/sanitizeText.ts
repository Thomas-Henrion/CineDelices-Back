import Joi from 'joi';

/**
 * Fonction pour nettoyer le texte en supprimant les balises HTML et les espaces inutiles
 * @param {string} input - Le texte à nettoyer
 * @returns {string} - Le texte nettoyé
 */
export function sanitizeText(input: string): string {
  if (typeof input !== 'string') return input;
  return input.replace(/<[^>]*>?/gm, '').trim();
}


export const sanitizeTextSchema = Joi.string().custom((value, helpers) => sanitizeText(value)).trim();
