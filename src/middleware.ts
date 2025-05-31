import { Request, Response, NextFunction } from 'express';
import { IPayload, validateJWT } from './useToken.ts';

export const authJWT = async (
	req: Request & { user?: IPayload },
	res: Response,
	next: NextFunction
): Promise<void> => {
	let authReq = req.headers.authorization;
	if (!authReq) {
		res.status(401).send('Token missing');
		return;
	}

	let token = validateJWT(authReq?.replace('Bearer ', '')) as IPayload;
	if (token == null) {
		res.status(400).send('Not valid JWT');
		return;
	}
	
	req.user = token;
	next();
};
