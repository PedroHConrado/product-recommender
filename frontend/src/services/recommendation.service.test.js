import recommendationService from './recommendation.service';
import mockProducts from '../mocks/mockProducts';

describe('recommendationService', () => {
  describe('Teste de Produto Único (SingleProduct)', () => {
    test('Retorna recomendação correta para SingleProduct com base nas preferências selecionadas', () => {
      const formData = {
        selectedPreferences: ['Integração com chatbots'],
        selectedFeatures: ['Chat ao vivo e mensagens automatizadas'],
        selectedRecommendationType: 'SingleProduct',
      };

      const recommendations = recommendationService.getRecommendations(
        formData,
        mockProducts
      );

      expect(recommendations).toHaveLength(1);
      expect(recommendations[0].name).toBe('RD Conversas');
    });

    test('Retorna produto com maior pontuação para SingleProduct', () => {
      const formData = {
        selectedPreferences: [
          'Automação de marketing', 
          'Integração fácil com ferramentas de e-mail', 
        ],
        selectedFeatures: [
          'Rastreamento de comportamento do usuário',
        ],
        selectedRecommendationType: 'SingleProduct',
      };

      const recommendations = recommendationService.getRecommendations(
        formData,
        mockProducts
      );

      expect(recommendations).toHaveLength(1);
      expect(recommendations[0].name).toBe('RD Station Marketing');
    });

    test('Retorna primeiro produto em caso de empate para SingleProduct', () => {
      const formData = {
        selectedPreferences: [
          'Automação de marketing', 
          'Integração com chatbots', 
        ],
        selectedFeatures: [],
        selectedRecommendationType: 'SingleProduct',
      };

      const recommendations = recommendationService.getRecommendations(
        formData,
        mockProducts
      );

      expect(recommendations).toHaveLength(1);
      expect(recommendations[0].name).toBe('RD Station Marketing');
    });
  });

  describe('Teste de Múltiplos Produtos (MultipleProducts)', () => {
    test('Retorna recomendações corretas para MultipleProducts', () => {
      const formData = {
        selectedPreferences: [
          'Integração fácil com ferramentas de e-mail', 
          'Automação de marketing', 
        ],
        selectedFeatures: [
          'Rastreamento de interações com clientes',
          'Rastreamento de comportamento do usuário', 
        ],
        selectedRecommendationType: 'MultipleProducts',
      };

      const recommendations = recommendationService.getRecommendations(
        formData,
        mockProducts
      );

      expect(recommendations).toHaveLength(2);
      expect(recommendations.map((product) => product.name)).toEqual([
        'RD Station CRM',
        'RD Station Marketing',
      ]);
    });

    test('Retorna todos os produtos que fazem match para MultipleProducts', () => {
      const formData = {
        selectedPreferences: ['Automação de marketing'],
        selectedFeatures: [],
        selectedRecommendationType: 'MultipleProducts',
      };

      const recommendations = recommendationService.getRecommendations(
        formData,
        mockProducts
      );

      expect(recommendations).toHaveLength(1);
      expect(recommendations[0].name).toBe('RD Station Marketing');
    });
  });

  describe('Casos Edge e Validações', () => {
    test('Retorna array vazio quando não há produtos', () => {
      const formData = {
        selectedPreferences: ['Qualquer preferência'],
        selectedFeatures: ['Qualquer funcionalidade'],
        selectedRecommendationType: 'SingleProduct',
      };

      const recommendations = recommendationService.getRecommendations(
        formData,
        []
      );

      expect(recommendations).toEqual([]);
    });

    test('Retorna array vazio quando products é null', () => {
      const formData = {
        selectedPreferences: ['Qualquer preferência'],
        selectedFeatures: ['Qualquer funcionalidade'],
        selectedRecommendationType: 'SingleProduct',
      };

      const recommendations = recommendationService.getRecommendations(
        formData,
        null
      );

      expect(recommendations).toEqual([]);
    });

    test('Retorna todos os produtos quando não há seleções', () => {
      const formData = {
        selectedPreferences: [],
        selectedFeatures: [],
        selectedRecommendationType: 'SingleProduct',
      };

      const recommendations = recommendationService.getRecommendations(
        formData,
        mockProducts
      );

      expect(recommendations).toHaveLength(mockProducts.length);
    });

    test('Funciona com formData parcial (sem selectedFeatures)', () => {
      const formData = {
        selectedPreferences: ['Automação de marketing'],
        selectedRecommendationType: 'SingleProduct',
      };

      const recommendations = recommendationService.getRecommendations(
        formData,
        mockProducts
      );

      expect(recommendations).toHaveLength(1);
      expect(recommendations[0].name).toBe('RD Station Marketing');
    });

    test('Funciona com formData vazio', () => {
      const recommendations = recommendationService.getRecommendations(
        {},
        mockProducts
      );

      expect(recommendations).toHaveLength(mockProducts.length);
    });

    test('Retorna array vazio quando nenhum produto faz match', () => {
      const formData = {
        selectedPreferences: ['Preferência inexistente'],
        selectedFeatures: ['Funcionalidade inexistente'],
        selectedRecommendationType: 'SingleProduct',
      };

      const recommendations = recommendationService.getRecommendations(
        formData,
        mockProducts
      );

      expect(recommendations).toEqual([]);
    });
  });

  describe('Lógica de Pontuação', () => {
    test('Preferências têm peso maior que funcionalidades', () => {
      const formData = {
        selectedPreferences: [
          'Automação de marketing', 
          'Integração fácil com ferramentas de e-mail', 
        ],
        selectedFeatures: [
          'Gestão de leads e oportunidades', 
        ],
        selectedRecommendationType: 'SingleProduct',
      };

      const recommendations = recommendationService.getRecommendations(
        formData,
        mockProducts
      );

      expect(recommendations).toHaveLength(1);
      expect(recommendations[0].name).toBe('RD Station CRM');
    });
  });
});
