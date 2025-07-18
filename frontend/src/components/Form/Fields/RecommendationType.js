import Checkbox from '../../shared/Checkbox';

function RecommendationType({ onRecommendationTypeChange }) {
  return (
    <div className="flex flex-col items-center space-y-4 w-full px-4">
      <h2 className="text-white text-3xl md:text-5xl font-bold leading-tight text-center">Tipo de Recomendação</h2>
      <div className="flex flex-col md:flex-row gap-4 md:gap-8">
        <div className="flex">
          <Checkbox
            type="radio"
            name="recommendationType"
            value="SingleProduct"
            onChange={() => onRecommendationTypeChange('SingleProduct')}
            className="mr-1"
          />
          <label htmlFor="SingleProduct" className="text-white text-xl">Produto Único</label>
        </div>
        <div className="flex">
          <Checkbox
            type="radio"
            name="recommendationType"
            value="MultipleProducts"
            onChange={() => onRecommendationTypeChange('MultipleProducts')}
            className="mr-1"
          />
          <label htmlFor="MultipleProducts" className="text-white text-xl">Múltiplos Produtos</label>
        </div>
      </div>
    </div>
  );
}

export default RecommendationType;
