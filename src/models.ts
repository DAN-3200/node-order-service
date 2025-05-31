type StatusOrder =
	| 'pendente'
	| 'em_analise'
	| 'confirmado'
	| 'cancelado'
	| 'entregue';
type PaymentMethod = 'dinheiro' | 'debito' | 'credito' | 'pix';
type DeliveryFee = 3 | 5 | 10;

// Como será no db
export interface OrderModel {
	id?: string;
	createdBy: string; // ID de usuário/admin
	items: ItemOrder[];
	value: ValueExplain;
	status: StatusOrder;
	createdAt: Date;
	updatedAt?: Date;
	canceledAt?: Date;
	payment: PaymentOrder;
	refClient: string; // foreign key 'Client'
	address: Address;
}

export interface OrderSend {
	createdBy?: string; // ID de usuário/admin
	items: ItemOrder[];
	value: ValueExplain;
	payment: PaymentOrder;
	client: ClientOrder;
	address: Address;
}

export interface PutOrder {
	id: string;
	item: ItemOrder[];
	status: StatusOrder;
	value: ValueExplain;
	updatedAt?: Date;
	address: Address;
}

interface ValueExplain {
	baseValue: number;
	deliveryFee: DeliveryFee;
	totalAmount: number;
}

interface ItemOrder {
	id?: string;
	refId: string; // foreign key 'Item'
	currentPrice: number;
	quantity: number;
}

interface PaymentOrder {
	id?: string;
	amount: number;
	method: PaymentMethod;
	paidAt: string;
	status: 'concluido' | 'pendente';
}

export interface ClientOrder {
	id: string;
	name: string;
	age?: number;
	phone: string;
	email: string;
}

interface Address {
	cep: string;
	street: string;
	number: string;
	complement?: string;
	city: string;
	state: string;
}

interface Item {
	id: string;
	barCode: string;
	name: string;
	description: string;
	imgUrl?: string;
	cost: number;
	markup: number;
	price: number;
	quantity: number;
	unit: 'KG' | 'UN';
	labels: string[];
}
