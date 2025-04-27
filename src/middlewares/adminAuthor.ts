import type { Request, Response, NextFunction } from 'express';

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    // Vérifiez si l'utilisateur est connecté et a le rôle d'administrateur
    if (req.session.user && req.session.user.role === 'admin') {
        return next();
    }
    // Si l'utilisateur n'est pas administrateur, redirigez-le vers une page d'erreur ou la page de connexion
    res.status(403).json({ message: 'Forbidden' });
}

export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
    // Vérifiez si l'utilisateur est connecté
    if (req.session.user) {
        return next();
    }
    // Si l'utilisateur n'est pas connecté, redirigez-le vers une page d'erreur ou la page de connexion
    res.status(401).json({ message: 'Unauthorized' });
}