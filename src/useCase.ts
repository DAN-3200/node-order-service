import { OrderModel, OrderSend, PutOrder } from './models.ts';
import { OrderRepository } from './types.ts';
import { v4 as uuid } from 'uuid';

export class OrdersService {
	private repoDB: OrderRepository;
	constructor(repo: OrderRepository) {
		this.repoDB = repo;
	}

	createOrder(order: OrderSend) {
		// *Salvar ou averiguar o 'Client' está no banco e usar o rash de retorno pra definir o 'newOrder'
		let clientId = this.repoDB.getClientId(order.client); // try catch
		let timeNow = new Date();
		let sID: string = uuid(); // Remover o acomplamento na refatoração

		let newOrder: OrderModel = {
			id: sID,
			createdBy: order.createdBy || 'anonimo',
			items: order.items,
			value: order.value,
			status: 'pendente',
			createdAt: timeNow,
			payment: order.payment,
			refClient: clientId,
			address: order.address,
		};
		// *validar os campos

		this.repoDB.save(newOrder);
		return 'Order Created';
	}

	getOrder(orderId: string): OrderModel[] {
		// *validar o Id

		return this.repoDB.getByOrderId(orderId);
	}

	updateOrder(order: PutOrder) {
		let timeNow = new Date();
		const newOrder: PutOrder = { ...order, updatedAt: timeNow };
		// *validar os campos

		this.repoDB.update(newOrder);
		return 'Order updated';
	}

	deleteOrder(orderId: string) {
		// *validar o Id

		this.repoDB.deleteByOrderId(orderId);
		return 'Order Deleted';
	}
}
