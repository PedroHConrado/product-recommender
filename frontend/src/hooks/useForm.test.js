import { renderHook, act } from '@testing-library/react';
import useForm from './useForm';

describe('useForm', () => {
  test('Inicializa com estado inicial fornecido', () => {
    const initialState = {
      selectedPreferences: ['pref1'],
      selectedFeatures: ['feature1'],
      selectedRecommendationType: 'SingleProduct',
    };

    const { result } = renderHook(() => useForm(initialState));

    expect(result.current.formData).toEqual(initialState);
  });

  test('handleChange atualiza campo específico', () => {
    const initialState = {
      selectedPreferences: [],
      selectedFeatures: [],
      selectedRecommendationType: '',
    };

    const { result } = renderHook(() => useForm(initialState));

    act(() => {
      result.current.handleChange('selectedPreferences', ['pref1', 'pref2']);
    });

    expect(result.current.formData.selectedPreferences).toEqual(['pref1', 'pref2']);
    expect(result.current.formData.selectedFeatures).toEqual([]);
    expect(result.current.formData.selectedRecommendationType).toBe('');
  });

  test('handleChange mantém outros campos inalterados', () => {
    const initialState = {
      selectedPreferences: ['pref1'],
      selectedFeatures: ['feature1'],
      selectedRecommendationType: 'SingleProduct',
    };

    const { result } = renderHook(() => useForm(initialState));

    act(() => {
      result.current.handleChange('selectedPreferences', ['pref2']);
    });

    expect(result.current.formData.selectedPreferences).toEqual(['pref2']);
    expect(result.current.formData.selectedFeatures).toEqual(['feature1']);
    expect(result.current.formData.selectedRecommendationType).toBe('SingleProduct');
  });

  test('handleChange funciona com diferentes tipos de dados', () => {
    const initialState = {
      textField: '',
      numberField: 0,
      booleanField: false,
      arrayField: [],
    };

    const { result } = renderHook(() => useForm(initialState));

    act(() => {
      result.current.handleChange('textField', 'novo texto');
    });

    act(() => {
      result.current.handleChange('numberField', 42);
    });

    act(() => {
      result.current.handleChange('booleanField', true);
    });

    act(() => {
      result.current.handleChange('arrayField', ['item1', 'item2']);
    });

    expect(result.current.formData.textField).toBe('novo texto');
    expect(result.current.formData.numberField).toBe(42);
    expect(result.current.formData.booleanField).toBe(true);
    expect(result.current.formData.arrayField).toEqual(['item1', 'item2']);
  });

  test('handleChange com campo inexistente adiciona novo campo', () => {
    const initialState = {
      existingField: 'valor',
    };

    const { result } = renderHook(() => useForm(initialState));

    act(() => {
      result.current.handleChange('newField', 'novo valor');
    });

    expect(result.current.formData.existingField).toBe('valor');
    expect(result.current.formData.newField).toBe('novo valor');
  });
});
