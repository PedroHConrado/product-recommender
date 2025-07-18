import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Features from './Features';

describe('Features', () => {
  const mockFeatures = [
    'Gestão de leads e oportunidades',
    'Automação de fluxos de trabalho de vendas',
    'Rastreamento de interações com clientes'
  ];

  test('Renderiza título corretamente', () => {
    render(
      <Features
        features={mockFeatures}
        onFeatureChange={jest.fn()}
      />
    );

    expect(screen.getByText('Funcionalidades')).toBeInTheDocument();
  });

  test('Renderiza todas as funcionalidades como checkboxes', () => {
    render(
      <Features
        features={mockFeatures}
        onFeatureChange={jest.fn()}
      />
    );

    mockFeatures.forEach(feature => {
      expect(screen.getByText(feature)).toBeInTheDocument();
    });

    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(mockFeatures.length);
  });

  test('Chama onFeatureChange quando checkbox é clicado', () => {
    const mockOnFeatureChange = jest.fn();
    
    render(
      <Features
        features={mockFeatures}
        onFeatureChange={mockOnFeatureChange}
      />
    );

    const firstCheckbox = screen.getAllByRole('checkbox')[0];
    fireEvent.click(firstCheckbox);

    expect(mockOnFeatureChange).toHaveBeenCalledWith([mockFeatures[0]]);
  });

  test('Adiciona funcionalidade quando não estava selecionada', () => {
    const mockOnFeatureChange = jest.fn();
    
    render(
      <Features
        features={mockFeatures}
        selectedFeatures={[]}
        onFeatureChange={mockOnFeatureChange}
      />
    );

    const firstCheckbox = screen.getAllByRole('checkbox')[0];
    fireEvent.click(firstCheckbox);

    expect(mockOnFeatureChange).toHaveBeenCalledWith([mockFeatures[0]]);
  });

  test('Remove funcionalidade quando já estava selecionada', () => {
    const mockOnFeatureChange = jest.fn();
    
    render(
      <Features
        features={mockFeatures}
        selectedFeatures={[mockFeatures[0], mockFeatures[1]]}
        onFeatureChange={mockOnFeatureChange}
      />
    );

    const firstCheckbox = screen.getAllByRole('checkbox')[0];
    fireEvent.click(firstCheckbox);

    expect(mockOnFeatureChange).toHaveBeenCalledWith([mockFeatures[1]]);
  });

  test('Checkboxes mostram estado correto baseado em selectedFeatures', () => {
    const selectedFeatures = [mockFeatures[0]];
    
    render(
      <Features
        features={mockFeatures}
        selectedFeatures={selectedFeatures}
        onFeatureChange={jest.fn()}
      />
    );

    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes[0]).toBeChecked();
    expect(checkboxes[1]).not.toBeChecked();
    expect(checkboxes[2]).not.toBeChecked();
  });

  test('Funciona com selectedFeatures vazio', () => {
    render(
      <Features
        features={mockFeatures}
        selectedFeatures={[]}
        onFeatureChange={jest.fn()}
      />
    );

    const checkboxes = screen.getAllByRole('checkbox');
    checkboxes.forEach(checkbox => {
      expect(checkbox).not.toBeChecked();
    });
  });

  test('Funciona sem selectedFeatures (padrão)', () => {
    render(
      <Features
        features={mockFeatures}
        onFeatureChange={jest.fn()}
      />
    );

    const checkboxes = screen.getAllByRole('checkbox');
    checkboxes.forEach(checkbox => {
      expect(checkbox).not.toBeChecked();
    });
  });
});
