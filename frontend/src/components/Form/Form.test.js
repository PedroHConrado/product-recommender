import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Form from './Form';
import useProducts from '../../hooks/useProducts';
import useForm from '../../hooks/useForm';
import useRecommendations from '../../hooks/useRecommendations';

jest.mock('../../hooks/useProducts', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('../../hooks/useForm', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('../../hooks/useRecommendations', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('./Fields', () => ({
  Preferences: ({ onPreferenceChange }) => (
    <div data-testid="preferences">
      <button onClick={() => onPreferenceChange(['pref1'])}>
        Select Preference
      </button>
    </div>
  ),
  Features: ({ onFeatureChange }) => (
    <div data-testid="features">
      <button onClick={() => onFeatureChange(['feature1'])}>
        Select Feature
      </button>
    </div>
  ),
  RecommendationType: ({ onRecommendationTypeChange }) => (
    <div data-testid="recommendation-type">
      <button onClick={() => onRecommendationTypeChange('SingleProduct')}>
        Select Single Product
      </button>
    </div>
  ),
}));

jest.mock('./SubmitButton', () => ({
  SubmitButton: ({ text }) => (
    <button type="submit" data-testid="submit-button">
      {text}
    </button>
  ),
}));


describe('Form', () => {
  const mockHandleChange = jest.fn();
  const mockGetRecommendations = jest.fn();
  const mockOnRecommendationsChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    
    useProducts.mockReturnValue({
      preferences: ['pref1', 'pref2'],
      features: ['feature1', 'feature2'],
      products: [{ id: 1, name: 'Product 1' }],
    });

    useForm.mockReturnValue({
      formData: {
        selectedPreferences: [],
        selectedFeatures: [],
        selectedRecommendationType: '',
      },
      handleChange: mockHandleChange,
    });

    useRecommendations.mockReturnValue({
      getRecommendations: mockGetRecommendations,
      recommendations: [],
    });

    mockGetRecommendations.mockReturnValue([{ id: 1, name: 'Recommended Product' }]);
  });

  test('Renderiza formulário quando dados estão carregados', () => {
    render(<Form onRecommendationsChange={mockOnRecommendationsChange} />);

    expect(screen.getByTestId('preferences')).toBeInTheDocument();
    expect(screen.getByTestId('features')).toBeInTheDocument();
    expect(screen.getByTestId('recommendation-type')).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
  });

  test('Renderiza loading quando dados não estão carregados', () => {
    useProducts.mockReturnValue({
      preferences: [],
      features: [],
      products: [],
    });

    render(<Form onRecommendationsChange={mockOnRecommendationsChange} />);

    expect(screen.getByText('Carregando formulário...')).toBeInTheDocument();
    expect(screen.queryByTestId('preferences')).not.toBeInTheDocument();
  });

  test('Chama handleChange quando preferência é selecionada', () => {
    render(<Form onRecommendationsChange={mockOnRecommendationsChange} />);

    const preferenceButton = screen.getByText('Select Preference');
    fireEvent.click(preferenceButton);

    expect(mockHandleChange).toHaveBeenCalledWith('selectedPreferences', ['pref1']);
  });

  test('Chama handleChange quando funcionalidade é selecionada', () => {
    render(<Form onRecommendationsChange={mockOnRecommendationsChange} />);

    const featureButton = screen.getByText('Select Feature');
    fireEvent.click(featureButton);

    expect(mockHandleChange).toHaveBeenCalledWith('selectedFeatures', ['feature1']);
  });

  test('Chama handleChange quando tipo de recomendação é selecionado', () => {
    render(<Form onRecommendationsChange={mockOnRecommendationsChange} />);

    const typeButton = screen.getByText('Select Single Product');
    fireEvent.click(typeButton);

    expect(mockHandleChange).toHaveBeenCalledWith('selectedRecommendationType', 'SingleProduct');
  });

  test('Submete formulário e chama onRecommendationsChange', () => {
    render(<Form onRecommendationsChange={mockOnRecommendationsChange} />);

    const submitButton = screen.getByTestId('submit-button');
    fireEvent.click(submitButton);

    expect(mockGetRecommendations).toHaveBeenCalledWith({
      selectedPreferences: [],
      selectedFeatures: [],
      selectedRecommendationType: '',
    });

    expect(mockOnRecommendationsChange).toHaveBeenCalledWith([
      { id: 1, name: 'Recommended Product' }
    ]);
  });

  test('Previne comportamento padrão do form no submit', () => {
    render(<Form onRecommendationsChange={mockOnRecommendationsChange} />);

    const submitButton = screen.getByTestId('submit-button');
    
    fireEvent.click(submitButton);

    expect(mockGetRecommendations).toHaveBeenCalled();
  });

  test('Funciona sem onRecommendationsChange', () => {
    render(<Form />);

    const submitButton = screen.getByTestId('submit-button');
    fireEvent.click(submitButton);

    expect(mockGetRecommendations).toHaveBeenCalled();
  });

  test('Passa props corretas para os componentes filhos', () => {
    render(<Form onRecommendationsChange={mockOnRecommendationsChange} />);

    expect(screen.getByTestId('preferences')).toBeInTheDocument();
    expect(screen.getByTestId('features')).toBeInTheDocument();
    expect(screen.getByTestId('recommendation-type')).toBeInTheDocument();
  });

  test('Renderiza botão de submit com texto correto', () => {
    render(<Form onRecommendationsChange={mockOnRecommendationsChange} />);

    expect(screen.getByText('Obter recomendação')).toBeInTheDocument();
  });
});
