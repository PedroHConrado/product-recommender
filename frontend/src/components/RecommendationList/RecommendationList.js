function RecommendationList({ recommendations }) {
  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6">
      <h2 className="text-white text-3xl md:text-5xl font-bold leading-tight text-center mt-12 md:mt-24">Lista de Recomendações</h2>

      {recommendations.length === 0 && (
        <p className="text-white text-center text-lg">Nenhuma recomendação encontrada.</p>
      )}

      <div className="flex flex-col md:flex-row justify-center items-center md:items-stretch space-y-6 md:space-y-0 md:space-x-6">
        {recommendations.map((recommendation, index) => (
          <div 
            key={index} 
            className="w-full max-w-md md:w-[440px] flex flex-col bg-zinc-900 p-4 md:p-6 rounded-lg border border-white/10 
                       transform transition-all duration-300 ease-in-out
                       shadow-lg  hover:shadow-zinc-300/20
                       hover:-translate-y-2 hover:scale-105
                       cursor-pointer group"
        
          >
            <h3 className="text-xl md:text-2xl text-white font-bold mb-4 md:mb-5 text-center">
              {recommendation.name}
            </h3>
            
            <p className="text-gray-300 mb-4 leading-relaxed group-hover:text-gray-100 transition-colors duration-300">
              {recommendation.description}
            </p>
            
            {recommendation.benefits && recommendation.benefits.length > 0 && (
              <div>
                <ul className="space-y-1">
                  {recommendation.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="text-gray-300 flex items-start group-hover:text-gray-100 transition-colors duration-300">
                      <span className="text-green-400 mr-2 group-hover:text-green-300 transition-colors duration-300">✓</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecommendationList;
