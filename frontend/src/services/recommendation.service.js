const getRecommendations = (
  formData = { selectedPreferences: [], selectedFeatures: [], selectedRecommendationType: '' },
  products
) => {
  if (!products || products.length === 0) {
    return [];
  }

  const { selectedPreferences = [], selectedFeatures = [], selectedRecommendationType } = formData;
  
  if (selectedPreferences.length === 0 && selectedFeatures.length === 0) {
    return products;
  }

  const filteredProducts = products.filter(product => {
    let matchesPreferences = true;
    let matchesFeatures = true;

    if (selectedPreferences.length > 0) {
      matchesPreferences = selectedPreferences.some(pref => 
        product.preferences?.includes(pref)
      );
    }

    if (selectedFeatures.length > 0) {
      matchesFeatures = selectedFeatures.some(feature => 
        product.features?.includes(feature)
      );
    }

    return matchesPreferences && matchesFeatures;
  });

  if (selectedRecommendationType === 'SingleProduct') {
    return getBestProduct(filteredProducts, selectedPreferences, selectedFeatures);
  }

  return filteredProducts;
};

const getBestProduct = (products, selectedPreferences, selectedFeatures) => {
  if (products.length === 0) return [];
  if (products.length === 1) return products;

  const productsWithScore = products.map(product => {
    let score = 0;
    
    if (selectedPreferences.length > 0) {
      const matchingPreferences = selectedPreferences.filter(pref => 
        product.preferences?.includes(pref)
      );
      score += matchingPreferences.length * 2;
    }
    
    if (selectedFeatures.length > 0) {
      const matchingFeatures = selectedFeatures.filter(feature => 
        product.features?.includes(feature)
      );
      score += matchingFeatures.length * 1;
    }
    
    return { ...product, score };
  });

  const bestProduct = productsWithScore.sort((a, b) => b.score - a.score)[0];
  
  const { score, ...productWithoutScore } = bestProduct;
  return [productWithoutScore];
};

export default { getRecommendations };
