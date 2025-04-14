import argon2 from "argon2";
import type { Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";
import { EmailParams, Recipient } from "mailersend";
import User from "../database/models/user";
import dotenv from "../utils/dotenv";
import { mailerSend, sentFrom } from "../utils/mail";

export default {
	login: async (req: Request, res: Response) => {
		// Récupère les informations de l'utilisateur depuis la requête
		const { email, password } = req.body as {
			email: string;
			password: string;
		};

		// Récupère l'utilisateur depuis la base de données
		const user = await User.findOne({ where: { email } });

		// Vérifie si l'utilisateur existe
		if (!user) {
			res.status(401).json({ message: "Invalid credentials" });
			return;
		}

		// Vérifie si le mot de passe est correct
		const passwordValid = await argon2.verify(user.password, password);

		// Vérifie si le mot de passe est correct
		if (!passwordValid) {
			res.status(401).json({ message: "Invalid credentials" });
			return;
		}

		// Génère un token JWT et un refresh token
		const token = jsonwebtoken.sign({ id: user.id }, dotenv.JWT.SECRET, {
			expiresIn: "10m",
		});
		const refreshToken = jsonwebtoken.sign(
			{ id: user.id },
			dotenv.JWT.REFRESH_SECRET,
			{
				expiresIn: "7d",
			},
		);

		// Retourne le token et le refresh token
		res.status(200).json({
			token,
			refreshToken,
		});
	},
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
