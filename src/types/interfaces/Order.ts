interface OrderRequest {
  products: number[];
}

interface Order extends OrderRequest {
  id?: number;
  userId: number;
}

interface OrderFullProps extends Omit<Order, 'id'> {
  id: number;
}

export {
  OrderRequest,
  Order,
  OrderFullProps,
};
