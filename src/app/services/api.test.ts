import { api } from './api';

describe('api', () => {
  const mockFetch = jest.fn();
  const originalFetch = global.fetch;

  beforeAll(() => {
    global.fetch = mockFetch;
  });

  afterAll(() => {
    global.fetch = originalFetch;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('get', () => {
    const endpoint = '/products';
    const mockResponse = { id: 1, title: 'Product 1', price: 100 };

    it('should make GET request and return data on success', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue(mockResponse),
      });

      const result = await api.get(endpoint);

      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockFetch).toHaveBeenCalledWith('https://fakestoreapi.com/products');
      expect(result).toEqual(mockResponse);
    });

    it('should throw error when response is not ok', async () => {
      const statusCodes = [400, 401, 403, 404, 500];
      
      for (const status of statusCodes) {
        mockFetch.mockResolvedValueOnce({
          ok: false,
          status,
        });

        await expect(api.get(endpoint)).rejects.toThrow(`HTTP error! status: ${status}`);
      }
    });

    it('should handle network error', async () => {
      const networkError = new Error('Network failure');
      mockFetch.mockRejectedValueOnce(networkError);

      await expect(api.get(endpoint)).rejects.toThrow('Network failure');
    });

    it('should handle invalid JSON response', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockRejectedValue(new Error('Invalid JSON')),
      });

      await expect(api.get(endpoint)).rejects.toThrow('Invalid JSON');
    });

    it('should work with query parameters', async () => {
      const endpointWithParams = '/products?limit=5&sort=desc';
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue([]),
      });

      await api.get(endpointWithParams);

      expect(mockFetch).toHaveBeenCalledWith('https://fakestoreapi.com/products?limit=5&sort=desc');
    });
  });
});