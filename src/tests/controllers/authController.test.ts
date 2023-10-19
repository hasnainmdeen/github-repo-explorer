import { githubAuth, githubCallback } from '../../controllers/authController';
import axios from 'axios';
import { Request, Response } from 'express';

jest.mock('axios');

describe('authController', () => {

    describe('githubCallback', () => {
  
      it('should authenticate a user successfully', async () => {
        (axios.post as jest.Mock).mockResolvedValueOnce({
          data: 'access_token=mock_token'
        });
  
        const req = {
          query: { code: 'mock_code' },
          session: {}
        } as unknown as Request;
  
        const res = {
          send: jest.fn(),
          status: jest.fn().mockReturnThis()
        } as unknown as Response;
  
        await githubCallback(req, res);
  
        expect(res.send).toHaveBeenCalledWith('Authentication successful!');
      });
  
      it('should handle error during token retrieval', async () => {
        (axios.post as jest.Mock).mockResolvedValueOnce({
          data: 'error=mock_error'
        });
  
        const req = {
          query: { code: 'mock_code' },
          session: {}
        } as unknown as Request;
  
        const res = {
          send: jest.fn(),
          status: jest.fn().mockReturnThis()
        } as unknown as Response;
  
        await githubCallback(req, res);
  
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith('Error getting access token');
      });
  
      it('should handle exception during request', async () => {
        (axios.post as jest.Mock).mockRejectedValueOnce(new Error('mock error'));
  
        const req = {
          query: { code: 'mock_code' },
          session: {}
        } as unknown as Request;
  
        const res = {
          send: jest.fn(),
          status: jest.fn().mockReturnThis()
        } as unknown as Response;
  
        await githubCallback(req, res);
  
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith('Error during authentication');
      });
    });
  });
  