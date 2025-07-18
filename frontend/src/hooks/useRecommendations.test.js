import { renderHook } from '@testing-library/react';
import useRecommendations from './useRecommendations';

jest.mock('../services/recommendation.service', () => ({
  getRecommendations: jest.fn(),
}));

import recommendationService from '../services/recommendation.service';

describe('useRecommendations', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Inicializa com recommendations vazio', () => {
    const products = [];
    const { result } = renderHook(() => useRecommendations(products));

    expect(result.current.recommendations).toEqual([]);
  });

  test('getRecommendations chama o serviço com parâmetros corretos', () => {
    const products = [
      { id: 1, name: 'Produto 1' },
      { id: 2, name: 'Produto 2' },
    ];
    
    const formData = {
      selectedPreferences: ['pref1'],
      selectedFeatures: ['feature1'],
      selectedRecommendationType: 'SingleProduct',
    };

    const mockRecommendations = [{ id: 1, name: 'Produto 1' }];
    recommendationService.getRecommendations.mockReturnValue(mockRecommendations);

    const { result } = renderHook(() => useRecommendations(products));

    const recommendations = result.current.getRecommendations(formData);

    expect(recommendationService.getRecommendations).toHaveBeenCalledWith(formData, products);
    expect(recommendations).toEqual(mockRecommendations);
  });

  test('getRecommendations retorna resultado do serviço', () => {
    const products = [
      { id: 1, name: 'Produto 1' },
      { id: 2, name: 'Produto 2' },
    ];
    
    const formData = {
      selectedPreferences: ['pref1'],
      selectedFeatures: ['feature1'],
      selectedRecommendationType: 'MultipleProducts',
    };

    const mockRecommendations = [
      { id: 1, name: 'Produto 1' },
      { id: 2, name: 'Produto 2' },
    ];
    recommendationService.getRecommendations.mockReturnValue(mockRecommendations);

    const { result } = renderHook(() => useRecommendations(products));

    const recommendations = result.current.getRecommendations(formData);

    expect(recommendations).toEqual(mockRecommendations);
  });

  test('retorna setRecommendations function', () => {
    const products = [];
    const { result } = renderHook(() => useRecommendations(products));

    expect(typeof result.current.setRecommendations).toBe('function');
  });
});
