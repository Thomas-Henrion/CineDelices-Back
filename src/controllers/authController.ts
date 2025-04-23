import argon2 from "argon2";
import type { Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";
import { EmailParams, Recipient } from "mailersend";
import User from "../database/models/user";
import dotenv from "../utils/dotenv";
import { mailerSend, sentFrom } from "../utils/mail";

export default {
	login: async (req: Request, res: Response) => {
		// Retrieve user information from the request
		const { email, password } = req.body as {
			email: string;
			password: string;
		};

		// Retrieve the user from the database
		const user = await User.findOne({
			where: { email },
			attributes: {
				include: ["password", "verificationCode"],
			},
		});

		// Check if the user exists
		if (!user) {
			res.status(401).json({ message: "Invalid credentials" });
			return;
		}

		// Check if the password is correct
		const passwordValid = await argon2.verify(user.password, password);

		// Check if the password is correct
		if (!passwordValid) {
			res.status(401).json({ message: "Invalid credentials" });
			return;
		}

		// Generate a JWT token and a refresh token
		const token = jsonwebtoken.sign(
			{
				id: user.id,
				email: user.email,
				username: user.username,
				isConfirmed: user.verificationCode == null,
			},
			dotenv.JWT.SECRET,
			{
				expiresIn: "10m",
			},
		);
		const refreshToken = jsonwebtoken.sign(
			{ id: user.id },
			dotenv.JWT.REFRESH_SECRET,
			{
				expiresIn: "7d",
			},
		);

		// Return the token and the refresh token
		res.status(200).json({
			token,
			refreshToken,
		});
	},
	register: async (req: Request, res: Response) => {
		// Retrieve user information from the request
		const { email, password, username } = req.body as {
			email: string;
			password: string;
			username: string;
		};

		// Check if the user already exists
		const user = await User.findOne({ where: { email } });
		if (user) {
			res.status(400).json({ message: "User already exists" });
			return;
		}

		// Hash the password
		const hashedPassword = await argon2.hash(password);

		// Create a random verification code between 1000 and 9999
		const randomVerificationCode = Math.floor(
			Math.random() * (9999 - 1000 + 1) + 1000,
		);

		// Create the user in the database
		const newUser = await User.create({
			username,
			email,
			password: hashedPassword,
			verificationCode: randomVerificationCode,
		});

		// Create the JWT token and the refresh token
		const token = jsonwebtoken.sign(
			{
				id: newUser.id,
				email: newUser.email,
				username: newUser.username,
				isConfirmed: newUser.verificationCode == null,
			},
			dotenv.JWT.SECRET,
			{
				expiresIn: "10m",
			},
		);

		const refreshToken = jsonwebtoken.sign(
			{ id: newUser.id },
			dotenv.JWT.REFRESH_SECRET,
			{
				expiresIn: "7d",
			},
		);

		// Send the verification email
		const recipients = [new Recipient(email, username)];

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

		// Return the token and the refresh token
		res.status(201).json({
			message: "User created successfully",
			user: {
				id: newUser.id,
				name: newUser.username,
				email: newUser.email,
			},
			token,
			refreshToken,
		});
	},
	confirmEmail: async (req: Request, res: Response) => {
		// Retrieve user information from the request
		const { email, code } = req.body as {
			email: string;
			code: number;
		};

		// Check if the user already exists
		const user = await User.findOne({
			where: { email },
			attributes: {
				include: ["verificationCode"],
			},
		});
		if (!user) {
			res.status(400).json({ message: "Credentials not found" });
			return;
		}

		// Check if the verification code is correct
		if (user.verificationCode !== code) {
			res.status(400).json({ message: "Invalid verification code" });
			return;
		}

		user.verificationCode = null;
		await user.save();

		// Send the confirmation email
		const recipients = [new Recipient(user.email, user.username)];

		const emailParams = new EmailParams()
			.setFrom(sentFrom)
			.setTo(recipients)
			.setSubject("Email verified")
			.setHtml(
				"<h1>Email verified</h1><p>Your email has been verified.</p>",
			);

		await mailerSend.email.send(emailParams).catch((err) => {
			console.error("Error sending email:", err);
			res.status(500).json({
				message: "Error sending confirmation email",
			});
			return;
		});

		res.status(200).json({ message: "Email verified successfully" });
	},
	refreshToken: async (req: Request, res: Response) => {
		// Retrieve the refresh token from the request
		const { refreshToken } = req.body as { refreshToken: string };

		// Check if the refresh token is present
		if (!refreshToken) {
			res.status(401).json({ message: "Unauthorized" });
			return;
		}

		// Check if the refresh token is valid
		jsonwebtoken.verify(
			refreshToken,
			dotenv.JWT.REFRESH_SECRET,
			async (err, decoded) => {
				if (err) {
					res.status(401).json({ message: "Unauthorized" });
					return;
				}

				const userId = (decoded as { id: number }).id;

				const user = await User.findByPk(userId);
				if (!user) {
					res.status(401).json({ message: "Unauthorized" });
					return;
				}

				const token = jsonwebtoken.sign(
					{
						id: user.id,
						email: user.email,
						username: user.username,
						isConfirmed: user.verificationCode == null,
					},
					dotenv.JWT.SECRET,
					{
						expiresIn: "10m",
					},
				);

				res.status(200).json({
					token,
				});
			},
		);
	},
};
