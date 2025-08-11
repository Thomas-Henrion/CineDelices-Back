import request from 'supertest';
import app from './app';
import { Media } from '../../database/association';
import { jest,describe,it,expect } from '@jest/globals';

jest.mock('../../database/association', () => ({
  Media: {
    findAll: jest.fn()
  }
}));

describe('GET /api/medias', () => {
  it('devrait retourner 200 et une liste de médias', async () => {
    const mockMedias = [{ id: 1, title: 'Media 1' }];
    (Media.findAll as jest.Mock).mockResolvedValue(mockMedias);

    const res = await request(app).get('/api/medias');

    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockMedias);
  });
});
