import { productService } from './products';
import { api } from './api';
import type { Product } from './types';

jest.mock('./api');

const mockProducts: Product[] = [
  {
    id: 1,
    title: 'Produto 1',
    price: 99.99,
    description: 'Descrição do produto 1',
    category: 'eletrônicos',
    image: 'https://via.placeholder.com/150/1',
    rating: {
      rate: 4.5,
      count: 10,
    },
  },
  {
    id: 2,
    title: 'Produto 2',
    price: 149.99,
    description: 'Descrição do produto 2',
    category: 'roupas',
    image: 'https://via.placeholder.com/150/2',
    rating: {
      rate: 4.2,
      count: 25,
    },
  },
];

const mockSingleProduct: Product = {
  id: 1,
  title: 'Produto 1',
  price: 99.99,
  description: 'Descrição do produto 1',
  category: 'eletrônicos',
  image: 'https://via.placeholder.com/150/1',
  rating: {
    rate: 4.5,
    count: 10,
  },
};

describe('productService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getProducts', () => {
    it('should return products list successfully', async () => {
      (api.get as jest.Mock).mockResolvedValue(mockProducts);

      const result = await productService.getProducts();

      expect(api.get).toHaveBeenCalledTimes(1);
      expect(api.get).toHaveBeenCalledWith('/products');
      expect(result).toEqual(mockProducts);
      expect(result).toHaveLength(2);
    });

    it('should return empty array when no products exist', async () => {
      (api.get as jest.Mock).mockResolvedValue([]);

      const result = await productService.getProducts();

      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });

    it('should throw error when API fails', async () => {
      const errorMessage = 'Failed to fetch products';
      (api.get as jest.Mock).mockRejectedValue(new Error(errorMessage));

      await expect(productService.getProducts()).rejects.toThrow(errorMessage);
      expect(api.get).toHaveBeenCalledWith('/products');
    });
  });

  describe('getProductById', () => {
    const productId = '1';

    it('should return specific product successfully', async () => {
      (api.get as jest.Mock).mockResolvedValue(mockSingleProduct);

      const result = await productService.getProductById(productId);

      expect(api.get).toHaveBeenCalledTimes(1);
      expect(api.get).toHaveBeenCalledWith(`/products/${productId}`);
      expect(result).toEqual(mockSingleProduct);
      expect(result.id).toBe(1);
      expect(result.title).toBe('Produto 1');
    });

    it('should throw error when product does not exist', async () => {
      const nonExistentId = '999';
      const errorMessage = 'HTTP error! status: 404';
      (api.get as jest.Mock).mockRejectedValue(new Error(errorMessage));

      await expect(productService.getProductById(nonExistentId)).rejects.toThrow(errorMessage);
      expect(api.get).toHaveBeenCalledWith(`/products/${nonExistentId}`);
    });
  });
});
