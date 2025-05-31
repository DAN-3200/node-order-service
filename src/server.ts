import Express from 'express';
import morgan from 'morgan';
import { OrderControllers } from './controller.ts';
import { OrdersService } from './useCase.ts';
import { DataBaseORM } from './repository.ts';
import { generateJWT, IPayload } from './useToken.ts';
import { authJWT } from './middleware.ts';

export default function runServer() {
	const server = Express();
	const port = 8080;

	server.use(Express.json(), morgan('dev'));
	routersManager(server);
	server.listen(port, () => {
		console.clear();
		console.log(`\nserver running [http://localhost:${port}/] \n`);
	});
}

function routersManager(s: Express.Application) {
	const handlers = new OrderControllers(new OrdersService(new DataBaseORM()));

	s.get('/getToken', async (_, res) => {
		let response = generateJWT({ id: '2', role: 'user' } as IPayload, '1h');
		res.send(response);
	});
	s.post('/setOrder', authJWT, handlers.setOrder);
	s.get('/getOrder/:id', handlers.getOrder);
	s.put('/putOrder', handlers.putOrder);
	s.delete('/deleteOrder/:id', handlers.deleteOrder);
}
