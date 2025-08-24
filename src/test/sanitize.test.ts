import { sanitizeText } from '../utils/sanitizeText';
import { jest, describe, it, expect } from '@jest/globals';

describe('sanitizeText', () => {
  it('supprime les balises HTML', () => {
    const input = '<script>alert("XSS")</script>Recette';
    const output = sanitizeText(input);
    expect(output).toBe('alert("XSS")Recette');
  });

  it('retourne la chaîne nettoyée et trimée', () => {
    const input = '   <b>Bonjour</b>   ';
    const output = sanitizeText(input);
    expect(output).toBe('Bonjour');
  });

  it('ignore les valeurs non-string', () => {
    expect(sanitizeText(42 as any)).toBe(42);
    expect(sanitizeText(null as any)).toBe(null);
  });
});
