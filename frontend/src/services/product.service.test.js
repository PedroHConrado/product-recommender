import getProducts from './product.service';
import axios from 'axios';

jest.mock('axios', () => ({
  get: jest.fn()
}));


const mockAxios = axios;

describe('product.service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Retorna produtos quando API responde com sucesso', async () => {
    const mockProducts = [
      { id: 1, name: 'Produto 1' },
      { id: 2, name: 'Produto 2' }
    ];

    mockAxios.get.mockResolvedValue({
      data: mockProducts
    });

    const result = await getProducts();

    expect(mockAxios.get).toHaveBeenCalledWith('http://localhost:3001/products');
    expect(result).toEqual(mockProducts);
  });

  test('Lida com erro na requisição', async () => {
    const mockError = new Error('Network Error');
    mockAxios.get.mockRejectedValue(mockError);

    await expect(getProducts()).rejects.toThrow('Network Error');
  });
});
