import { renderHook, waitFor } from '@testing-library/react';
import useProducts from './useProducts';
import getProducts from '../services/product.service';

jest.mock('../services/product.service', () => ({
  __esModule: true,
  default: jest.fn(),
}));


describe('useProducts', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Inicializa com estados vazios', () => {
    getProducts.mockResolvedValue([]);
    
    const { result } = renderHook(() => useProducts());

    expect(result.current.preferences).toEqual([]);
    expect(result.current.features).toEqual([]);
    expect(result.current.products).toEqual([]);
  });

  test('Carrega produtos e extrai preferências e funcionalidades', async () => {
    const mockProducts = [
      {
        id: 1,
        name: 'Produto 1',
        preferences: ['Pref1', 'Pref2', 'Pref3'],
        features: ['Feature1', 'Feature2', 'Feature3']
      },
      {
        id: 2,
        name: 'Produto 2',
        preferences: ['Pref4', 'Pref5', 'Pref6'],
        features: ['Feature4', 'Feature5', 'Feature6']
      }
    ];

    getProducts.mockResolvedValue(mockProducts);

    const { result } = renderHook(() => useProducts());

    await waitFor(() => {
      expect(result.current.products).toEqual(mockProducts);
    });

    expect(result.current.preferences).toHaveLength(4);
    expect(result.current.features).toHaveLength(4);
  });

  test('Extrai exatamente 2 preferências por produto (randomizadas)', async () => {
    const mockProducts = [
      {
        id: 1,
        name: 'Produto 1',
        preferences: ['Pref1', 'Pref2', 'Pref3', 'Pref4', 'Pref5'],
        features: ['Feature1', 'Feature2', 'Feature3', 'Feature4', 'Feature5']
      }
    ];

    getProducts.mockResolvedValue(mockProducts);

    const { result } = renderHook(() => useProducts());

    await waitFor(() => {
      expect(result.current.products).toEqual(mockProducts);
    });

    expect(result.current.preferences).toHaveLength(2);
    expect(result.current.features).toHaveLength(2);
    
    result.current.preferences.forEach(pref => {
      expect(mockProducts[0].preferences).toContain(pref);
    });
    
    result.current.features.forEach(feature => {
      expect(mockProducts[0].features).toContain(feature);
    });
  });

  test('Lida com erro na busca de produtos', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    getProducts.mockRejectedValue(new Error('API Error'));

    const { result } = renderHook(() => useProducts());

    await waitFor(() => {
      expect(result.current.products).toEqual([]);
      expect(result.current.preferences).toEqual([]);
      expect(result.current.features).toEqual([]);
    });

    consoleErrorSpy.mockRestore();
  });

  test('Lida com produtos sem preferências ou funcionalidades', async () => {
    const mockProducts = [
      {
        id: 1,
        name: 'Produto 1',
        preferences: [],
        features: []
      },
      {
        id: 2,
        name: 'Produto 2',
      }
    ];

    getProducts.mockResolvedValue(mockProducts);

    const { result } = renderHook(() => useProducts());

    await waitFor(() => {
      expect(result.current.products).toEqual(mockProducts);
      expect(result.current.preferences).toEqual([]);
      expect(result.current.features).toEqual([]);
    });
  });

  test('Chama getProducts apenas uma vez', async () => {
    getProducts.mockResolvedValue([]);

    renderHook(() => useProducts());

    await waitFor(() => {
      expect(getProducts).toHaveBeenCalledTimes(1);
    });
  });
});
