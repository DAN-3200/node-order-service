import { ClientOrder, OrderModel, PutOrder } from './models.ts';
import { OrderRepository } from './types.ts';
import { PrismaClient } from '@prisma/client';

// 'Prisma ORM' implementation
export class DataBaseORM implements OrderRepository {
	// database soldada
	private connDB = new PrismaClient();

	async save(order: OrderModel): Promise<void> {
		try {
			await this.connDB.order.create({
				data: {
					id: order.id,
					refClient: order.refClient,
					status: order.status,
					createdAt: order.createdAt,
					updatedAt: order.updatedAt,
					createdBy: order.createdBy,
					address: {
						create: {
							cep: order.address.cep,
							city: order.address.city,
							number: order.address.number,
							state: order.address.state,
							street: order.address.street,
						},
					},
					items: { create: order.items },
				},
			});
		} catch (e) {
			throw new Error('Falha ao salvar pedido');
		}
	}
	update(order: PutOrder): void {}
	getClientId(client: ClientOrder): string {
		return '';
	}
	getByOrderId(orderId: string): OrderModel[] {
		return [];
	}
	deleteByOrderId(orderId: string): void {}
}

// *toda interação com db deve ser tratada
