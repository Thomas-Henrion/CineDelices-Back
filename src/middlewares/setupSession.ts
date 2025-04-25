import session from 'express-session';
import { User } from '../database/association';
import type { Request, Response, NextFunction } from 'express';



export const setupSession = session({
    //  paramétré notre session
    secret: process.env.SECRET_KEY as string,
    resave: false,
    saveUninitialized: false,
    // ! IL FAUDRA TOUJOURS METTRE SECURE à TRUE SAUF pendant le developpement
    cookie: { secure: false, httpOnly: true }
});

export const initUserLocals = async (req: Request, res: Response, next: NextFunction) => {
    // je recupere l'id du user dans la session
    const userId = req.session.userId;
    if(userId){
        const user = await User.findByPk(userId);
        // dans toutes mes vues j'ai les infos de l'user connecté
        res.locals.user = user;
        // dans tous mes controllers/middlewares j'ai les infos utiles de l'user comme son role / son nom
        req.session.user = user;
    }
    next();
};