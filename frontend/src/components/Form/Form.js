import { Preferences, Features, RecommendationType } from './Fields';
import { SubmitButton } from './SubmitButton';
import useProducts from '../../hooks/useProducts';
import useForm from '../../hooks/useForm';
import useRecommendations from '../../hooks/useRecommendations';

function Form({ onRecommendationsChange }) {
  const { preferences, features, products } = useProducts();
  const { formData, handleChange } = useForm({
    selectedPreferences: [],
    selectedFeatures: [],
    selectedRecommendationType: '',
  });

  const { getRecommendations } = useRecommendations(products);

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataRecommendations = getRecommendations(formData);


    if (onRecommendationsChange) {
      onRecommendationsChange(dataRecommendations);
    }
  };

  return (
    <form
      className="mt-6 md:mt-10 flex flex-col items-center space-y-6 md:space-y-8 px-2 md:px-4"
      onSubmit={handleSubmit}
    >
      {preferences.length > 0 && features.length > 0 ? (
        <>
          <main className="flex flex-col md:flex-row gap-6 md:gap-12 mx-auto max-w-4xl w-full px-2 md:px-4">
            <Preferences
              preferences={preferences}
              onPreferenceChange={(selected) =>
                handleChange('selectedPreferences', selected)
              }
            />
            <Features
              features={features}
              onFeatureChange={(selected) =>
                handleChange('selectedFeatures', selected)
              }
            />
          </main>
          <RecommendationType
            onRecommendationTypeChange={(selected) =>
              handleChange('selectedRecommendationType', selected)
            }
          />
          <SubmitButton text="Obter recomendação" />
        </>
      ) : (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          <span className="text-white text-lg ml-4">Carregando formulário...</span>
        </div>
      )}
    </form>
  );
}

export default Form;
