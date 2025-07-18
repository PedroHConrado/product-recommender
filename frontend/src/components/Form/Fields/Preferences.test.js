import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Preferences from './Preferences';

describe('Preferences', () => {
  const mockPreferences = [
    'Integração fácil com ferramentas de e-mail',
    'Personalização de funis de vendas',
    'Relatórios avançados de desempenho de vendas'
  ];

  test('Renderiza título corretamente', () => {
    render(
      <Preferences
        preferences={mockPreferences}
        onPreferenceChange={jest.fn()}
      />
    );

    expect(screen.getByText('Preferências')).toBeInTheDocument();
  });

  test('Renderiza todas as preferências como checkboxes', () => {
    render(
      <Preferences
        preferences={mockPreferences}
        onPreferenceChange={jest.fn()}
      />
    );

    mockPreferences.forEach(preference => {
      expect(screen.getByText(preference)).toBeInTheDocument();
    });

    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(mockPreferences.length);
  });

  test('Chama onPreferenceChange quando checkbox é clicado', () => {
    const mockOnPreferenceChange = jest.fn();
    
    render(
      <Preferences
        preferences={mockPreferences}
        onPreferenceChange={mockOnPreferenceChange}
      />
    );

    const firstCheckbox = screen.getAllByRole('checkbox')[0];
    fireEvent.click(firstCheckbox);

    expect(mockOnPreferenceChange).toHaveBeenCalledWith([mockPreferences[0]]);
  });

  test('Adiciona preferência quando não estava selecionada', () => {
    const mockOnPreferenceChange = jest.fn();
    
    render(
      <Preferences
        preferences={mockPreferences}
        selectedPreferences={[]}
        onPreferenceChange={mockOnPreferenceChange}
      />
    );

    const firstCheckbox = screen.getAllByRole('checkbox')[0];
    fireEvent.click(firstCheckbox);

    expect(mockOnPreferenceChange).toHaveBeenCalledWith([mockPreferences[0]]);
  });

  test('Remove preferência quando já estava selecionada', () => {
    const mockOnPreferenceChange = jest.fn();
    
    render(
      <Preferences
        preferences={mockPreferences}
        selectedPreferences={[mockPreferences[0], mockPreferences[1]]}
        onPreferenceChange={mockOnPreferenceChange}
      />
    );

    const firstCheckbox = screen.getAllByRole('checkbox')[0];
    fireEvent.click(firstCheckbox);

    expect(mockOnPreferenceChange).toHaveBeenCalledWith([mockPreferences[1]]);
  });

  test('Checkboxes mostram estado correto baseado em selectedPreferences', () => {
    const selectedPreferences = [mockPreferences[0]];
    
    render(
      <Preferences
        preferences={mockPreferences}
        selectedPreferences={selectedPreferences}
        onPreferenceChange={jest.fn()}
      />
    );

    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes[0]).toBeChecked();
    expect(checkboxes[1]).not.toBeChecked();
    expect(checkboxes[2]).not.toBeChecked();
  });

  test('Funciona com selectedPreferences vazio', () => {
    render(
      <Preferences
        preferences={mockPreferences}
        selectedPreferences={[]}
        onPreferenceChange={jest.fn()}
      />
    );

    const checkboxes = screen.getAllByRole('checkbox');
    checkboxes.forEach(checkbox => {
      expect(checkbox).not.toBeChecked();
    });
  });

  test('Funciona sem selectedPreferences (padrão)', () => {
    render(
      <Preferences
        preferences={mockPreferences}
        onPreferenceChange={jest.fn()}
      />
    );

    const checkboxes = screen.getAllByRole('checkbox');
    checkboxes.forEach(checkbox => {
      expect(checkbox).not.toBeChecked();
    });
  });
});
