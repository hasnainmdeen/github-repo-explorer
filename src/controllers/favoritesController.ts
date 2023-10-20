
import { Request, Response } from 'express';
import { Favorite } from '../models/favorites';
import { STATUS_CODE } from '../utils/constants';

export const createFavorite = async (req: Request, res: Response) => {
    try {
        const favorite = new Favorite(req.body);
        await favorite.save();
        res.status(STATUS_CODE.CREATED).send(favorite);
    } catch (error) {
        res.status(STATUS_CODE.BAD_REQUEST).send(error);
    }
};

export const getFavoriteById = async (req: Request, res: Response) => {
    try {
        const favorite = await Favorite.findById(req.params.id);
        if (!favorite) {
            return res.status(STATUS_CODE.NOT_FOUND).send();
        }
        res.status(STATUS_CODE.OK).send(favorite);
    } catch (error) {
        res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).send(error);
    }
};

export const getAllFavorites = async (req: Request, res: Response) => {
    try {
        const favorites = await Favorite.find({});
        res.status(STATUS_CODE.OK).send(favorites);
    } catch (error) {
        res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).send(error);
    }
};

export const updateFavorite = async (req: Request, res: Response) => {
    try {
        const favorite = await Favorite.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!favorite) {
            return res.status(STATUS_CODE.NOT_FOUND).send();
        }
        res.status(STATUS_CODE.OK).send(favorite);
    } catch (error) {
        res.status(STATUS_CODE.BAD_REQUEST).send(error);
    }
};

export const deleteFavoriteById = async (req: Request, res: Response) => {
    try {
        const favorite = await Favorite.findByIdAndDelete(req.params.id);
        if (!favorite) {
            return res.status(STATUS_CODE.NOT_FOUND).send();
        }
        res.status(STATUS_CODE.OK).send(favorite);
    } catch (error) {
        res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).send(error);
    }
};
