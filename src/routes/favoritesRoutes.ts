import express from 'express';
import { createFavorite, getFavoriteById, getAllFavorites, updateFavorite, deleteFavoriteById } from '../controllers/favoritesController';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Favorite:
 *       type: object
 *       properties:
 *         githubId:
 *           type: string
 *           description: The unique GitHub ID of the repository.
 *         repositoryName:
 *           type: string
 *           description: The name of the repository.
 *         language:
 *           type: string
 *           description: The programming language the repository is written in.
 *         createdDate:
 *           type: string
 *           format: date-time
 *           description: The date the repository was created.
 *         description:
 *           type: string
 *           description: A brief description of the repository.
 */

/**
 * @swagger
 * /favorites:
 *   post:
 *     summary: Create a new favorite.
 *     tags:
 *       - Favorites
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Favorite'
 *     responses:
 *       201:
 *         description: Successfully created a favorite.
 *       400:
 *         description: Error occurred while creating a favorite.
 */
router.post('/favorites', createFavorite);

/**
 * @swagger
 * /favorites:
 *   get:
 *     summary: Retrieve all favorites.
 *     tags:
 *       - Favorites
 *     responses:
 *       200:
 *         description: A list of favorites.
 *       500:
 *         description: Error occurred while fetching favorites.
 */
router.get('/favorites', getAllFavorites);

/**
 * @swagger
 * /favorites/{id}:
 *   get:
 *     summary: Retrieve a favorite by ID.
 *     tags:
 *       - Favorites
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique ID of the favorite to retrieve.
 *     responses:
 *       200:
 *         description: Successfully retrieved favorite.
 *       404:
 *         description: Favorite not found.
 *       500:
 *         description: Error occurred while fetching the favorite.
 */
router.get('/favorites/:id', getFavoriteById);

/**
 * @swagger
 * /favorites/{id}:
 *   put:
 *     summary: Update a favorite by ID.
 *     tags:
 *       - Favorites
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique ID of the favorite to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Favorite'
 *     responses:
 *       200:
 *         description: Successfully updated favorite.
 *       400:
 *         description: Error occurred while updating favorite.
 *       404:
 *         description: Favorite not found.
 */
router.put('/favorites/:id', updateFavorite);

/**
 * @swagger
 * /favorites/{id}:
 *   delete:
 *     summary: Delete a favorite by ID.
 *     tags:
 *       - Favorites
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique ID of the favorite to delete.
 *     responses:
 *       200:
 *         description: Successfully deleted favorite.
 *       404:
 *         description: Favorite not found.
 *       500:
 *         description: Error occurred while deleting the favorite.
 */
router.delete('/favorites/:id', deleteFavoriteById);

export default router;
