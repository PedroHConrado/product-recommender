import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RecommendationList from './RecommendationList';

describe('RecommendationList', () => {
  test('Exibe mensagem quando não há recomendações', () => {
    render(<RecommendationList recommendations={[]} />);
    
    expect(screen.getByText('Nenhuma recomendação encontrada.')).toBeInTheDocument();
  });

  test('Exibe título da lista', () => {
    render(<RecommendationList recommendations={[]} />);
    
    expect(screen.getByText('Lista de Recomendações')).toBeInTheDocument();
  });

  test('Renderiza recomendações quando fornecidas', () => {
    const mockRecommendations = [
      {
        id: 1,
        name: 'RD Station CRM',
        category: 'Vendas',
        description: 'Sistema de gestão de vendas',
        benefits: ['Gestão de leads', 'Automação de vendas']
      },
      {
        id: 2,
        name: 'RD Station Marketing',
        category: 'Marketing',
        description: 'Plataforma de marketing digital',
        benefits: ['Campanhas de email', 'Análise de ROI']
      }
    ];

    render(<RecommendationList recommendations={mockRecommendations} />);

    expect(screen.getByText('RD Station CRM')).toBeInTheDocument();
    expect(screen.getByText('RD Station Marketing')).toBeInTheDocument();
    expect(screen.getByText('Sistema de gestão de vendas')).toBeInTheDocument();
    expect(screen.getByText('Plataforma de marketing digital')).toBeInTheDocument();
  });

  test('Renderiza benefícios quando fornecidos', () => {
    const mockRecommendations = [
      {
        id: 1,
        name: 'RD Station CRM',
        category: 'Vendas',
        description: 'Sistema de gestão de vendas',
        benefits: ['Gestão de leads', 'Automação de vendas']
      }
    ];

    render(<RecommendationList recommendations={mockRecommendations} />);

    expect(screen.getByText('Gestão de leads')).toBeInTheDocument();
    expect(screen.getByText('Automação de vendas')).toBeInTheDocument();
  });

  test('Não renderiza benefícios quando não fornecidos', () => {
    const mockRecommendations = [
      {
        id: 1,
        name: 'RD Station CRM',
        category: 'Vendas',
        description: 'Sistema de gestão de vendas'
      }
    ];

    render(<RecommendationList recommendations={mockRecommendations} />);

    expect(screen.getByText('RD Station CRM')).toBeInTheDocument();
    expect(screen.getByText('Sistema de gestão de vendas')).toBeInTheDocument();
  });

  test('Renderiza benefícios vazios corretamente', () => {
    const mockRecommendations = [
      {
        id: 1,
        name: 'RD Station CRM',
        category: 'Vendas',
        description: 'Sistema de gestão de vendas',
        benefits: []
      }
    ];

    render(<RecommendationList recommendations={mockRecommendations} />);

    expect(screen.getByText('RD Station CRM')).toBeInTheDocument();
    expect(screen.getByText('Sistema de gestão de vendas')).toBeInTheDocument();
  });

  test('Renderiza múltiplas recomendações', () => {
    const mockRecommendations = [
      {
        id: 1,
        name: 'Produto 1',
        category: 'Categoria 1',
        description: 'Descrição 1',
        benefits: ['Benefício 1']
      },
      {
        id: 2,
        name: 'Produto 2',
        category: 'Categoria 2',
        description: 'Descrição 2',
        benefits: ['Benefício 2']
      },
      {
        id: 3,
        name: 'Produto 3',
        category: 'Categoria 3',
        description: 'Descrição 3',
        benefits: ['Benefício 3']
      }
    ];

    render(<RecommendationList recommendations={mockRecommendations} />);

    expect(screen.getByText('Produto 1')).toBeInTheDocument();
    expect(screen.getByText('Produto 2')).toBeInTheDocument();
    expect(screen.getByText('Produto 3')).toBeInTheDocument();
  });
});
