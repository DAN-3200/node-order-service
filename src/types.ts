import { ClientOrder, OrderModel, PutOrder } from './models.ts';

export interface OrderRepository {
	save(order: OrderModel): void;
	update(order: PutOrder): void;
	deleteByOrderId(orderId: string): void;
	getByOrderId(orderId: string): OrderModel[];
	getClientId(client: ClientOrder): string;
}
