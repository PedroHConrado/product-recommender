import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Checkbox from './Checkbox';

describe('Checkbox', () => {
  test('Renderiza checkbox com texto', () => {
    render(<Checkbox>Texto do checkbox</Checkbox>);

    const checkbox = screen.getByRole('checkbox');
    const text = screen.getByText('Texto do checkbox');

    expect(checkbox).toBeInTheDocument();
    expect(text).toBeInTheDocument();
  });

  test('Passa props para o input', () => {
    render(
      <Checkbox value="test-value" checked={true} onChange={jest.fn()}>
        Texto do checkbox
      </Checkbox>
    );

    const checkbox = screen.getByRole('checkbox');
    
    expect(checkbox).toHaveAttribute('value', 'test-value');
    expect(checkbox).toBeChecked();
  });

  test('Renderiza sem texto', () => {
    render(<Checkbox />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
  });

  test('Aplica classes CSS corretas', () => {
    render(<Checkbox>Texto</Checkbox>);

    const label = screen.getByRole('checkbox').parentElement;
    const text = screen.getByText('Texto');

    expect(label).toHaveClass('flex', 'items-center', 'cursor-pointer');
    expect(text).toHaveClass('text-white', 'ml-3', 'leading-relaxed', 'flex-1', 'whitespace-nowrap', 'overflow-hidden', 'text-ellipsis');
  });

  test('Passa props adicionais para o input', () => {
    render(
      <Checkbox 
        data-testid="custom-checkbox" 
        disabled={true}
        name="test-name"
      >
        Texto
      </Checkbox>
    );

    const checkbox = screen.getByTestId('custom-checkbox');
    
    expect(checkbox).toBeDisabled();
    expect(checkbox).toHaveAttribute('name', 'test-name');
  });

  test('Estrutura HTML está correta', () => {
    render(<Checkbox>Texto do checkbox</Checkbox>);

    const label = screen.getByText('Texto do checkbox').closest('label');
    const checkbox = screen.getByRole('checkbox');

    expect(label).toHaveClass('flex', 'items-center');
    expect(label).toContainElement(checkbox);
  });
});
