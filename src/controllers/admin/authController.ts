import emailValidator from "email-validator";
import PasswordValidator from "password-validator";
import argon2 from "argon2";
import { User as AppUser } from "../../database/association";
import type { Request, Response, NextFunction } from "express";

// Déclaration du type pour les erreurs
type FormErrors = { [key: string]: string };

type PasswordValidationError = {
    message: string;
    validation: string;
    arguments: string[] | number[] | undefined;
  };

export const displaySignUpForm = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.render("auth/signup");
    } catch (error) {
        next(error);
    }
};

export const handleSignUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, email, password, confirmation } = req.body;

        const schema = new PasswordValidator();
        schema
            .is().min(8, "Votre mot de passe doit avoir minimum 8 caractères")
            .has().uppercase(1, "Votre mot de passe doit avoir minimum 1 majuscule")
            .has().symbols(1, "Votre mot de passe doit avoir minimum 1 caractère spécial")
            .has().digits(1, "Votre mot de passe doit avoir minimum 1 chiffre");

        const errors: FormErrors = {};

        
        if (!username) {
            errors.username = "Le champs nom doit être remplis";
        }
        if (!email) {
            errors.email = "L'email doit être remplis";
        } else if (!emailValidator.validate(email)) {
            errors.email = "Mettez un email valide";
        }

        if (!password) {
            errors.password = "Le mot de passe doit être renseigné";
        } else {
            const passwordErrors = schema.validate(password, { details: true }) as PasswordValidationError[];
            if (passwordErrors.length > 0) {
                const errorMessages = passwordErrors.map((error) => error.message).join("<br>");
                errors.password = errorMessages;
            }
        }

        if (password !== confirmation) {
            errors.confirmation = "Les deux mots de passes doivent être identiques";
        }

        if (!errors.email) {
            const existingUser = await AppUser.findOne({ where: { email } });
            if (existingUser) {
                errors.email = "Email existant";
            }
        }

        if (Object.keys(errors).length > 0) {
            return res.status(422).render("auth/signup", { errors, data: req.body });
        }

        const hashedPassword = await argon2.hash(password);
        const user = await AppUser.create({ username, email, password: hashedPassword });

        req.session.userId = user.id;
        res.redirect("/admin");
    } catch (error) {
        next(error);
    }
};

export const displayLoginForm = (req: Request, res: Response, next: NextFunction) => {
    res.render("auth/login");
};

export const handleLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const user = await AppUser.findOne({ where: { email } });

        if (!user || !await argon2.verify(user.password, password)) {
            return res.status(401).render("auth/login", { error: "Couple email/mot de passe incorrect" });
        }

        req.session.userId = user.id;
        res.redirect("/admin/recipes");
    } catch (error) {
        next(error);
    }
};

export const logout = (req: Request, res: Response, next: NextFunction) => {
    try {
        req.session.destroy(() => {
            res.clearCookie("connect.sid");
            res.redirect("/admin");
        });
    } catch (error) {
        next(error);
    }
};