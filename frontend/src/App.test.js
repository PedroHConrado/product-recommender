import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

jest.mock('./components/Form/Form', () => {
  return function MockForm({ onRecommendationsChange }) {
    return (
      <div data-testid="form">
        <button onClick={() => onRecommendationsChange && onRecommendationsChange([{ id: 1, name: 'Test Product' }])}>
          Test Submit
        </button>
      </div>
    );
  };
});

jest.mock('./components/RecommendationList/RecommendationList', () => {
  return function MockRecommendationList({ recommendations }) {
    return (
      <div data-testid="recommendation-list">
        {recommendations.map(rec => (
          <div key={rec.id} data-testid="recommendation-item">
            {rec.name}
          </div>
        ))}
      </div>
    );
  };
});

jest.mock('./components/Header/Header', () => {
  return function MockHeader() {
    return <div data-testid="header">Header</div>;
  };
});

jest.mock('./components/Hero/Hero', () => {
  return function MockHero() {
    return <div data-testid="hero">Hero</div>;
  };
});

describe('App', () => {
  test('Renderiza todos os componentes principais', () => {
    render(<App />);

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('hero')).toBeInTheDocument();
    expect(screen.getByTestId('form')).toBeInTheDocument();
    expect(screen.getByTestId('recommendation-list')).toBeInTheDocument();
  });

  test('Inicializa com recommendations vazio', () => {
    render(<App />);

    const recommendationList = screen.getByTestId('recommendation-list');
    expect(recommendationList).toBeInTheDocument();
    expect(screen.queryByTestId('recommendation-item')).not.toBeInTheDocument();
  });

  test('Atualiza recommendations quando Form chama onRecommendationsChange', async () => {
    render(<App />);

    const submitButton = screen.getByText('Test Submit');
    
    await act(async () => {
      submitButton.click();
    });

    expect(screen.getByTestId('recommendation-item')).toBeInTheDocument();
    expect(screen.getByText('Test Product')).toBeInTheDocument();
  });

  test('Aplica classes CSS corretas', () => {
    const { container } = render(<App />);
    const mainDiv = container.firstChild;

    expect(mainDiv).toHaveClass('bg-black', 'min-h-screen', 'flex', 'flex-col');
  });

  test('Estrutura HTML está correta', () => {
    render(<App />);

    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
    
    expect(main).toContainElement(screen.getByTestId('hero'));
    expect(main).toContainElement(screen.getByTestId('form'));
    expect(main).toContainElement(screen.getByTestId('recommendation-list'));
  });
});
