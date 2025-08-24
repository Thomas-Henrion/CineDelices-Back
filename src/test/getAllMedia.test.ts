import mediaController from '../controllers/mediaController';
import { Media } from '../database/association';
import { Request, Response } from 'express';
import { jest, describe, it, expect } from '@jest/globals';

jest.mock('../database/association', () => ({
  Media: {
    findAll: jest.fn()
  }
}));

describe('getAllMedias', () => {
  const mockRes = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
  } as unknown as Response;

  it('devrait retourner tous les médias sans filtre', async () => {
    const mockReq = {
      query: {}
    } as Request;

    const mockMedias = [{ id: 1, title: 'Media 1' }, { id: 2, title: 'Media 2' }];
    (Media.findAll as jest.Mock).mockResolvedValue(mockMedias);

    await mediaController.getAllMedias(mockReq, mockRes);

    expect(Media.findAll).toHaveBeenCalledWith({
      where: {},
      limit: 25,
      offset: 0,
      include: [{ association: 'Recipes', required: false }]
    });

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockMedias);
  });

  it('devrait filtrer par titre et appliquer limit/offset', async () => {
    const mockReq = {
      query: {
        title: 'cake',
        limit: '10',
        offset: '5'
      }
    } as Request;

    const mockMedias = [{ id: 3, title: 'Chocolate Cake' }];
    (Media.findAll as jest.Mock).mockResolvedValue(mockMedias);

    await mediaController.getAllMedias(mockReq, mockRes);

    expect(Media.findAll).toHaveBeenCalledWith({
      where: {
        title: {
          [Symbol.for('like')]: '%cake%'
        }
      },
      limit: 10,
      offset: 5,
      include: [{ association: 'Recipes', required: false }]
    });

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockMedias);
  });
});