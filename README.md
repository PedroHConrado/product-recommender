# 🚀 Sistema de Recomendação de Produtos

<div align="center">
  
![React](https://img.shields.io/badge/React-18.0+-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.0+-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-86.95%25-C21325?style=for-the-badge&logo=jest&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18.3+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

</div>

## 📋 Sobre o Projeto

Sistema inteligente de recomendação de produtos desenvolvido em React.js. O sistema permite aos usuários selecionar suas preferências e funcionalidades desejadas, retornando recomendações personalizadas com base em um algoritmo de scoring avançado.

### ✨ Funcionalidades Principais

- 🎯 **Algoritmo de Recomendação Inteligente**: Sistema de scoring baseado em preferências e funcionalidades
- 🎨 **Interface Moderna**: UI responsiva com efeitos 3D e animações suaves
- 🔄 **Scroll Automático**: Navegação intuitiva para os resultados
- 📱 **Design Responsivo**: Adaptável para diferentes tamanhos de tela
- 🧪 **Testes Robustos**: Cobertura de 86.95% com 87 testes unitários
- ⚡ **Performance Otimizada**: Carregamento rápido e experiência fluida

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React.js** - Biblioteca para construção de interfaces
- **Tailwind CSS** - Framework CSS utilitário
- **Axios** - Cliente HTTP para requisições
- **Custom Hooks** - Lógica reutilizável e organizada

### Backend
- **json-server** - Simulação de API RESTful
- **Node.js** - Ambiente de execução JavaScript

### Testes & Qualidade
- **Jest** - Framework de testes
- **React Testing Library** - Testes de componentes
- **86.95%** de cobertura de código
- **87 testes** unitários

## 📁 Estrutura do Projeto

```
monorepo/
├── 📁 backend/                 # Servidor API
│   ├── db.json                # Base de dados (json-server)
│   └── package.json           # Dependências do backend
├── 📁 frontend/               # Aplicação React
│   ├── 📁 src/
│   │   ├── 📁 components/     # Componentes React
│   │   │   ├── 📁 Form/       # Formulário de preferências
│   │   │   │   ├── Form.js
│   │   │   │   ├── 📁 Fields/ # Campos do formulário
│   │   │   │   └── 📁 SubmitButton/
│   │   │   ├── 📁 RecommendationList/  # Lista de recomendações
│   │   │   ├── 📁 Header/     # Cabeçalho
│   │   │   ├── 📁 Hero/       # Seção hero
│   │   │   └── 📁 shared/     # Componentes reutilizáveis
│   │   ├── 📁 hooks/          # Custom hooks
│   │   │   ├── useForm.js
│   │   │   ├── useProducts.js
│   │   │   └── useRecommendations.js
│   │   ├── 📁 services/       # Serviços de API
│   │   │   ├── product.service.js
│   │   │   └── recommendation.service.js
│   │   └── 📁 mocks/          # Dados de teste
│   └── 📁 tests/              # Testes unitários (87 testes)
├── install.sh                 # Script de instalação
├── package.json               # Dependências do monorepo
└── README.md                  # Este arquivo
```

## 🎯 Como Funciona o Sistema

### 1. **Seleção de Preferências**
O usuário seleciona suas preferências através de checkboxes intuitivos:
- Preferências de negócio (ex: "Aumentar vendas", "Gerar leads")
- Funcionalidades desejadas (ex: "Email Marketing", "CRM")
- Tipo de recomendação (Produto único ou múltiplos)

### 2. **Algoritmo de Scoring**
O sistema utiliza um algoritmo inteligente que:
- Atribui **peso maior** para preferências (3 pontos)
- Atribui **peso menor** para funcionalidades (1 ponto)
- Calcula score total para cada produto
- Retorna recomendações ordenadas por relevância

### 3. **Exibição de Resultados**
- **Produto Único**: Retorna o produto com maior score
- **Múltiplos Produtos**: Lista todos os produtos compatíveis
- **Interface 3D**: Cards com efeitos visuais atrativos
- **Scroll Automático**: Navegação suave para os resultados

## 🚀 Instalação e Uso

### Pré-requisitos

- **Node.js** versão 18.3 ou superior
- **Yarn** ou **npm** para gerenciar dependências

### Instalação Rápida

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/sistema-recomendacao.git

# Entre no diretório
cd sistema-recomendacao

# Execute o script de instalação
./install.sh

# Inicie a aplicação
yarn start
```

### Instalação Manual

```bash
# Instale as dependências
yarn install

# Inicie o backend (json-server)
yarn start:backend

# Em outro terminal, inicie o frontend
yarn start:frontend

# Ou inicie ambos simultaneamente
yarn dev
```

## 📜 Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `yarn start` | Inicia frontend e backend simultaneamente |
| `yarn start:frontend` | Inicia apenas o frontend (porta 3000) |
| `yarn start:backend` | Inicia apenas o backend (porta 3001) |
| `yarn dev` | Modo desenvolvimento com hot-reload |
| `yarn test` | Executa todos os testes |
| `yarn test:coverage` | Executa testes com relatório de cobertura |
| `yarn build` | Gera build de produção |

## 🧪 Testes e Qualidade

### Cobertura de Testes
- **📊 86.95%** de cobertura total
- **🧪 87 testes** unitários
- **✅ 13 suítes** de testes
- **🎯 100%** de cobertura nos componentes principais

### Arquivos Testados
- ✅ **Components**: Form, RecommendationList, Fields, SubmitButton
- ✅ **Hooks**: useForm, useProducts, useRecommendations
- ✅ **Services**: product.service, recommendation.service
- ✅ **Shared**: Checkbox, utilitários

### Executar Testes
```bash
# Executar todos os testes
yarn test

# Executar com cobertura
yarn test:coverage

# Executar testes específicos
yarn test -- --testNamePattern="Form"
```

## 🎨 Recursos Visuais

### Interface Moderna
- **Design System**: Componentes consistentes e reutilizáveis
- **Tailwind CSS**: Classes utilitárias para estilização rápida
- **Responsividade**: Adaptável para desktop, tablet e mobile

### Efeitos Visuais
- **Cards 3D**: Efeitos hover com transformações suaves
- **Animações**: Transições fluidas entre estados
- **Scroll Automático**: Navegação intuitiva para resultados
- **Loading States**: Feedback visual durante carregamento

## 🔧 Arquitetura Técnica

### Padrões Utilizados
- **Custom Hooks**: Lógica reutilizável e testável
- **Service Layer**: Separação de responsabilidades
- **Component Composition**: Componentes modulares
- **Props Drilling**: Fluxo de dados controlado

### Estrutura de Dados
```javascript
// Exemplo de produto
{
  id: 1,
  name: "RD Station Marketing",
  preferences: ["Aumentar vendas", "Gerar leads"],
  features: ["Email Marketing", "Landing Pages"],
  description: "Plataforma completa de marketing digital",
  benefits: ["Automação", "Segmentação", "Analytics"]
}
```

## 🚀 Funcionalidades Implementadas

### ✅ Concluído
- [x] Sistema de recomendação com algoritmo de scoring
- [x] Interface de usuário responsiva e moderna
- [x] Formulário de seleção de preferências
- [x] Exibição de resultados com efeitos visuais
- [x] Scroll automático para resultados
- [x] Testes unitários abrangentes
- [x] Integração com API REST (json-server)
- [x] Tratamento de erros e estados de loading

### 🔄 Possíveis Melhorias Futuras
- [ ] Implementação de filtros avançados
- [ ] Sistema de favoritos
- [ ] Comparação entre produtos
- [ ] Histórico de recomendações
- [ ] Integração com APIs externas
- [ ] Modo escuro/claro
- [ ] Internacionalização (i18n)

## 📈 Performance e Otimizações

- **Lazy Loading**: Carregamento otimizado de componentes
- **Memoização**: Prevenção de re-renderizações desnecessárias
- **Bundle Splitting**: Divisão do código para carregamento eficiente
- **Caching**: Armazenamento inteligente de dados

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor, siga estas diretrizes:

1. **Fork** o projeto
2. **Crie** uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. **Commit** suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. **Push** para a branch (`git push origin feature/nova-funcionalidade`)
5. **Abra** um Pull Request

## 📝 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

## 👤 Autor

**Desenvolvido com ❤️ por [Seu Nome]**

- GitHub: [@seu-usuario](https://github.com/seu-usuario)
- LinkedIn: [Seu Nome](https://linkedin.com/in/seu-nome)
- Email: seu.email@exemplo.com

---

<div align="center">
  <strong>⭐ Se este projeto foi útil para você, considere dar uma estrela! ⭐</strong>
</div>
