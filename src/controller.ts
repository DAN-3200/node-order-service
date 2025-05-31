import { OrdersService } from './useCase.ts';
import { Request, Response } from 'express';
import { OrderSend, PutOrder } from './models.ts';

export class OrderControllers {
	private useCase: OrdersService;
	constructor(useCase: OrdersService) {
		this.useCase = useCase;
	}

	// arrow function usam o contexto do escopo onde foram definidas
	setOrder = async (req: Request, res: Response) => {
		let bodyReq = req.body as OrderSend;
		let response = this.useCase.createOrder(bodyReq);
		res.status(201).send(response);
	};
	getOrder = async (req: Request, res: Response) => {
		let ParamReq = req.params.id as string;
		let response = this.useCase.getOrder(ParamReq);
		res.status(200).json(response);
	};
	putOrder = async (req: Request, res: Response) => {
		let bodyReq = req.body as PutOrder;
		let response = this.useCase.updateOrder(bodyReq);
		res.status(200).send(response);
	};
	deleteOrder = async (req: Request, res: Response) => {
		let ParamReq = req.params.id as string;
		let response = this.useCase.deleteOrder(ParamReq);
		res.status(204).send(response);
	};
}
