import type { Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";
import argon2 from "argon2";
import User from "../database/models/user";
import { mailerSend, sentFrom } from "../utils/mail";
import dotenv from "../utils/dotenv";
import { EmailParams, Recipient } from "mailersend";

export default {
	login: (req: Request, res: Response) => {},
	register: async (req: Request, res: Response) => {
		// Récupère les informations de l'utilisateur depuis la requête
		const { email, password, name } = req.body as {
			email: string;
			password: string;
			name: string;
		};

		// Vérifie si l'utilisateur existe déjà
		const user = await User.findOne({ where: { email } });
		if (user) {
			res.status(400).json({ message: "User already exists" });
			return;
		}

		// On hashe le mot de passe
		const hashedPassword = await argon2.hash(password);

		// Création d'un code de vérification aléatoire
		const randomVerificationCode = Math.floor(
			1000 + Math.random() * 9000,
		).toString();

		// Création de l'utilisateur dans la base de données
		const newUser = await User.create({
			name,
			email,
			password: hashedPassword,
			vericationCode: randomVerificationCode,
		});

		// Création du token JWT et du refresh token
		const token = jsonwebtoken.sign({ id: newUser.id }, dotenv.JWT.SECRET, {
			expiresIn: "10m",
		});

		const refreshToken = jsonwebtoken.sign(
			{ id: newUser.id },
			dotenv.JWT.REFRESH_SECRET,
			{
				expiresIn: "7d",
			},
		);

		// Envoi de l'email de vérification
		const recipients = [new Recipient(email, name)];

		const emailParams = new EmailParams()
			.setFrom(sentFrom)
			.setTo(recipients)
			.setSubject("Verify your email")
			.setHtml(
				`<h1>Verify your email</h1><p>Your verification code is <strong>${randomVerificationCode}</strong></p>`,
			);

		await mailerSend.email.send(emailParams).catch((err) => {
			console.error("Error sending email:", err);
			newUser.destroy();
			res.status(500).json({
				message: "Error sending verification email",
			});
			return;
		});

		// Retourne le token et le refresh token
		res.status(201).json({
			message: "User created successfully",
			user: {
				id: newUser.id,
				name: newUser.name,
				email: newUser.email,
			},
			token,
			refreshToken,
		});
	},
	confirmEmail: (req: Request, res: Response) => {},
};
