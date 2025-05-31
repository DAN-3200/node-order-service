-- CreateEnum
CREATE TYPE "StatusOrder" AS ENUM ('pendente', 'confirmado', 'entregue', 'cancelado');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('credito', 'debito', 'pix', 'dinheiro');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('concluido', 'pendente');

-- CreateEnum
CREATE TYPE "Unit" AS ENUM ('KG', 'UN');

-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "status" "StatusOrder" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3),
    "canceledAt" TIMESTAMP(3),
    "refClient" TEXT NOT NULL,
    "addressId" TEXT NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "value_orders" (
    "id" TEXT NOT NULL,
    "baseValue" DOUBLE PRECISION NOT NULL,
    "deliveryFee" DOUBLE PRECISION NOT NULL,
    "totalAmount" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "value_orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item_orders" (
    "id" TEXT NOT NULL,
    "refId" TEXT NOT NULL,
    "currentPrice" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL,
    "orderId" TEXT NOT NULL,

    CONSTRAINT "item_orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_orders" (
    "id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "method" "PaymentMethod" NOT NULL,
    "paidAt" TIMESTAMP(3) NOT NULL,
    "status" "PaymentStatus" NOT NULL,

    CONSTRAINT "payment_orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clients" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "addresses" (
    "id" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "complement" TEXT,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "items" (
    "id" TEXT NOT NULL,
    "barCode" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imgUrl" TEXT,
    "cust" DOUBLE PRECISION NOT NULL,
    "markup" DOUBLE PRECISION NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unit" "Unit" NOT NULL,
    "labels" TEXT[],

    CONSTRAINT "items_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "value_orders" ADD CONSTRAINT "value_orders_id_fkey" FOREIGN KEY ("id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_orders" ADD CONSTRAINT "item_orders_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_orders" ADD CONSTRAINT "payment_orders_id_fkey" FOREIGN KEY ("id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
