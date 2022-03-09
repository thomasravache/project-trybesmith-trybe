interface ProductRequest {
  name: string;
  amount: string;
}

interface Product extends ProductRequest {
  id: number;
  orderId?: number;
}

interface ProductAllProps extends Omit<Product, 'orderId'> {
  orderId: number;
}

export {
  ProductRequest,
  Product,
  ProductAllProps,
};
