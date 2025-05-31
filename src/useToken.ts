import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();
const secretKey = process.env.SECRET_KEY as string;

export interface IPayload {
	id: string;
	role: 'admin' | 'user';
}

export function generateJWT(
	payload: {},
	expiresIn: '1h' | '2h' | '3h'
): string {
	return jwt.sign(payload, secretKey, {
		algorithm: 'HS256',
		expiresIn: expiresIn,
	});
}

export function validateJWT(token: string) {
	try {
		return jwt.verify(token, secretKey as string);
	} catch {
		return null;
	}
}
