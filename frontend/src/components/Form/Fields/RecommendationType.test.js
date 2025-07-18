import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RecommendationType from './RecommendationType';

describe('RecommendationType', () => {
  test('Renderiza título corretamente', () => {
    render(<RecommendationType onRecommendationTypeChange={jest.fn()} />);

    expect(screen.getByText('Tipo de Recomendação')).toBeInTheDocument();
  });

  test('Renderiza opções de radio button', () => {
    render(<RecommendationType onRecommendationTypeChange={jest.fn()} />);

    expect(screen.getByText('Produto Único')).toBeInTheDocument();
    expect(screen.getByText('Múltiplos Produtos')).toBeInTheDocument();
  });

  test('Chama onRecommendationTypeChange quando "Produto Único" é selecionado', () => {
    const mockOnRecommendationTypeChange = jest.fn();
    
    render(<RecommendationType onRecommendationTypeChange={mockOnRecommendationTypeChange} />);

    const singleProductRadio = screen.getByDisplayValue('SingleProduct');
    fireEvent.click(singleProductRadio);

    expect(mockOnRecommendationTypeChange).toHaveBeenCalledWith('SingleProduct');
  });

  test('Chama onRecommendationTypeChange quando "Múltiplos Produtos" é selecionado', () => {
    const mockOnRecommendationTypeChange = jest.fn();
    
    render(<RecommendationType onRecommendationTypeChange={mockOnRecommendationTypeChange} />);

    const multipleProductsRadio = screen.getByDisplayValue('MultipleProducts');
    fireEvent.click(multipleProductsRadio);

    expect(mockOnRecommendationTypeChange).toHaveBeenCalledWith('MultipleProducts');
  });

  test('Radio buttons têm o mesmo name para exclusão mútua', () => {
    render(<RecommendationType onRecommendationTypeChange={jest.fn()} />);

    const radioButtons = screen.getAllByRole('radio');
    radioButtons.forEach(radio => {
      expect(radio).toHaveAttribute('name', 'recommendationType');
    });
  });

  test('Radio buttons têm valores corretos', () => {
    render(<RecommendationType onRecommendationTypeChange={jest.fn()} />);

    const singleProductRadio = screen.getByDisplayValue('SingleProduct');
    const multipleProductsRadio = screen.getByDisplayValue('MultipleProducts');

    expect(singleProductRadio).toBeInTheDocument();
    expect(multipleProductsRadio).toBeInTheDocument();
  });

  test('Renderiza labels corretamente', () => {
    render(<RecommendationType onRecommendationTypeChange={jest.fn()} />);

    const singleProductLabel = screen.getByText('Produto Único');
    const multipleProductsLabel = screen.getByText('Múltiplos Produtos');

    expect(singleProductLabel).toBeInTheDocument();
    expect(multipleProductsLabel).toBeInTheDocument();
  });
});
