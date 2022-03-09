interface Product {
  name: string;
  amount: string;
}

interface ProductAllProps extends Product {
  id: number;
  orderId?: number;
}

export {
  Product,
  ProductAllProps,
};
