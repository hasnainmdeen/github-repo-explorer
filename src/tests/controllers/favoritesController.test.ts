import { Favorite } from '../../models/favorites';
import { createFavorite, getFavoriteById, getAllFavorites, updateFavoriteById, deleteFavoriteById } from '../../controllers/favoritesController';
import { Request, Response } from 'express';

let mockRequest: Partial<Request>;
let mockResponse: Partial<Response>;

beforeEach(() => {
    mockRequest = {};
    mockResponse = {
        send: jest.fn(),
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    };
});

afterEach(() => {
    jest.clearAllMocks();
});


describe('createFavorite', () => {
    it('should create a favorite and return 201', async () => {
        const mockSave = jest.fn();
        (Favorite.prototype.save as jest.Mock) = mockSave;
        mockRequest.body = {
            githubId: 'testGithubId',
            repositoryName: 'testRepoName',
        };

        await createFavorite(mockRequest as Request, mockResponse as Response);

        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(mockResponse.send).toHaveBeenCalled();
    });

    it('should throw an error if saving fails', async () => {
        const mockSave = jest.fn().mockRejectedValueOnce(new Error('Test error'));
        (Favorite.prototype.save as jest.Mock) = mockSave;
        
        await createFavorite(mockRequest as Request, mockResponse as Response);

        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.send).toHaveBeenCalled();
    });
});

describe('getFavoriteById', () => {
    it('should return a favorite if found', async () => {
        const mockFavorite = { _id: 'testId', githubId: 'testGithubId', repositoryName: 'testRepoName' };
        const mockFindById = jest.fn().mockResolvedValueOnce(mockFavorite);
        (Favorite.findById as jest.Mock) = mockFindById;
        mockRequest.params = { id: 'testId' };

        await getFavoriteById(mockRequest as Request, mockResponse as Response);

        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.send).toHaveBeenCalledWith(mockFavorite);
    });

    it('should return 404 if favorite not found', async () => {
        const mockFindById = jest.fn().mockResolvedValueOnce(null);
        (Favorite.findById as jest.Mock) = mockFindById;
        mockRequest.params = { id: 'testId' };

        await getFavoriteById(mockRequest as Request, mockResponse as Response);

        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.send).toHaveBeenCalled();
    });
});


describe('getAllFavorites', () => {
    it('should retrieve all favorites and return 200', async () => {
        const mockFavorites = [
            { _id: 'id1', githubId: 'githubId1', repositoryName: 'repoName1' },
            { _id: 'id2', githubId: 'githubId2', repositoryName: 'repoName2' }
        ];
        const mockFind = jest.fn().mockResolvedValueOnce(mockFavorites);
        (Favorite.find as jest.Mock) = mockFind;

        await getAllFavorites(mockRequest as Request, mockResponse as Response);

        expect(mockFind).toHaveBeenCalledWith({});
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.send).toHaveBeenCalledWith(mockFavorites);
    });

    it('should return 500 if there is an error', async () => {
        const mockError = new Error('Test error');
        const mockFind = jest.fn().mockRejectedValueOnce(mockError);
        (Favorite.find as jest.Mock) = mockFind;

        await getAllFavorites(mockRequest as Request, mockResponse as Response);

        expect(mockFind).toHaveBeenCalledWith({});
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.send).toHaveBeenCalledWith(mockError);
    });
});


describe('updateFavoriteById', () => {
    it('should update a favorite and return 200 with the updated favorite', async () => {
        const mockFavorite = { _id: 'testId', githubId: 'testGithubId', repositoryName: 'updatedRepoName' };
        const mockFindByIdAndUpdate = jest.fn().mockResolvedValueOnce(mockFavorite);
        (Favorite.findByIdAndUpdate as jest.Mock) = mockFindByIdAndUpdate;
        mockRequest.params = { id: 'testId' };
        mockRequest.body = { repositoryName: 'updatedRepoName' };

        await updateFavoriteById(mockRequest as Request, mockResponse as Response);

        expect(mockFindByIdAndUpdate).toHaveBeenCalledWith('testId', { repositoryName: 'updatedRepoName' }, { new: true, runValidators: true });
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.send).toHaveBeenCalledWith(mockFavorite);
    });

    it('should return 404 if the favorite to be updated does not exist', async () => {
        const mockFindByIdAndUpdate = jest.fn().mockResolvedValueOnce(null);
        (Favorite.findByIdAndUpdate as jest.Mock) = mockFindByIdAndUpdate;
        mockRequest.params = { id: 'testId' };

        await updateFavoriteById(mockRequest as Request, mockResponse as Response);

        expect(mockFindByIdAndUpdate).toHaveBeenCalled();
        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.send).toHaveBeenCalled();
    });

    it('should return 400 if an error occurs during the update', async () => {
        const mockError = new Error('Test error');
        const mockFindByIdAndUpdate = jest.fn().mockRejectedValueOnce(mockError);
        (Favorite.findByIdAndUpdate as jest.Mock) = mockFindByIdAndUpdate;
        mockRequest.params = { id: 'testId' };
        mockRequest.body = { repositoryName: 'updatedRepoName' };

        await updateFavoriteById(mockRequest as Request, mockResponse as Response);

        expect(mockFindByIdAndUpdate).toHaveBeenCalledWith('testId', { repositoryName: 'updatedRepoName' }, { new: true, runValidators: true });
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.send).toHaveBeenCalledWith(mockError);
    });
});

describe('deleteFavoriteById', () => {
    it('should delete a favorite and return 200 with the deleted favorite', async () => {
        const mockFavorite = { _id: 'testId', githubId: 'testGithubId', repositoryName: 'testRepoName' };
        const mockFindByIdAndDelete = jest.fn().mockResolvedValueOnce(mockFavorite);
        (Favorite.findByIdAndDelete as jest.Mock) = mockFindByIdAndDelete;
        mockRequest.params = { id: 'testId' };

        await deleteFavoriteById(mockRequest as Request, mockResponse as Response);

        expect(mockFindByIdAndDelete).toHaveBeenCalledWith('testId');
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.send).toHaveBeenCalledWith(mockFavorite);
    });

    it('should return 404 if favorite is not found', async () => {
        const mockFindByIdAndDelete = jest.fn().mockResolvedValueOnce(null);
        (Favorite.findByIdAndDelete as jest.Mock) = mockFindByIdAndDelete;
        mockRequest.params = { id: 'testId' };

        await deleteFavoriteById(mockRequest as Request, mockResponse as Response);

        expect(mockFindByIdAndDelete).toHaveBeenCalledWith('testId');
        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.send).toHaveBeenCalled();
    });

    it('should return 500 if there is an error', async () => {
        const mockError = new Error('Deletion error');
        const mockFindByIdAndDelete = jest.fn().mockRejectedValueOnce(mockError);
        (Favorite.findByIdAndDelete as jest.Mock) = mockFindByIdAndDelete;
        mockRequest.params = { id: 'testId' };

        await deleteFavoriteById(mockRequest as Request, mockResponse as Response);

        expect(mockFindByIdAndDelete).toHaveBeenCalledWith('testId');
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.send).toHaveBeenCalledWith(mockError);
    });
});