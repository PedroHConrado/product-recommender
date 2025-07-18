import { useState, useRef } from 'react';
import Form from './components/Form/Form';
import RecommendationList from './components/RecommendationList/RecommendationList';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';

function App() {
  const [recommendations, setRecommendations] = useState([]);
  const recommendationsRef = useRef(null);

  const handleRecommendations = (newRecommendations) => {
    setRecommendations(newRecommendations);
    
    setTimeout(() => {
      if (recommendationsRef.current) {
        recommendationsRef.current.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 100);
  };

  return (
    <div className="bg-black min-h-screen flex flex-col">
      <Header />
      <main className="w-full">
        <Hero />  
        <Form onRecommendationsChange={handleRecommendations}/>
        <div ref={recommendationsRef}>
          <RecommendationList recommendations={recommendations} />
        </div>
      </main>
    </div>
  );
}

export default App;
