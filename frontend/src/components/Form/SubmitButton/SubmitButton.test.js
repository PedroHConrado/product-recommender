import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SubmitButton from './SubmitButton';

describe('SubmitButton', () => {
  test('Renderiza botão com texto fornecido', () => {
    render(<SubmitButton text="Enviar Formulário" />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Enviar Formulário');
  });

  test('Renderiza botão com tipo submit', () => {
    render(<SubmitButton text="Enviar" />);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'submit');
  });

  test('Aplica classes CSS corretas', () => {
    render(<SubmitButton text="Enviar" />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass(
      'w-full',
      'max-w-xs',
      'md:w-64',
      'bg-gray-200',
      'hover:bg-gray-300',
      'font-bold',
      'py-2',
      'px-4',
      'rounded'
    );
  });

  test('Renderiza sem texto quando não fornecido', () => {
    render(<SubmitButton />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('');
  });

  test('Renderiza com texto vazio', () => {
    render(<SubmitButton text="" />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('');
  });

  test('Renderiza com texto longo', () => {
    const longText = 'Este é um texto muito longo para testar como o botão se comporta';
    render(<SubmitButton text={longText} />);

    const button = screen.getByRole('button');
    expect(button).toHaveTextContent(longText);
  });

  test('Renderiza com caracteres especiais', () => {
    const specialText = 'Clique & Envie → Agora!';
    render(<SubmitButton text={specialText} />);

    const button = screen.getByRole('button');
    expect(button).toHaveTextContent(specialText);
  });
});
