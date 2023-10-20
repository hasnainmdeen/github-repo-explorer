
import { Request, Response } from 'express';
import { Favorite } from '../models/favorites';

export const createFavorite = async (req: Request, res: Response) => {
    try {
        const favorite = new Favorite(req.body);
        await favorite.save();
        res.status(201).send(favorite);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const getFavoriteById = async (req: Request, res: Response) => {
    try {
        const favorite = await Favorite.findById(req.params.id);
        if (!favorite) {
            return res.status(404).send();
        }
        res.status(200).send(favorite);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getAllFavorites = async (req: Request, res: Response) => {
    try {
        const favorites = await Favorite.find({});
        res.status(200).send(favorites);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const updateFavorite = async (req: Request, res: Response) => {
    try {
        const favorite = await Favorite.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!favorite) {
            return res.status(404).send();
        }
        res.status(200).send(favorite);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const deleteFavoriteById = async (req: Request, res: Response) => {
    try {
        const favorite = await Favorite.findByIdAndDelete(req.params.id);
        if (!favorite) {
            return res.status(404).send();
        }
        res.status(200).send(favorite);
    } catch (error) {
        res.status(500).send(error);
    }
};
