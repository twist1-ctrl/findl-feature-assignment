
import Header from "../components/Header";
import React, { useState } from "react";
import FeatureList from "../components/FeatureList";
import { useCurrentUser } from "../App";
import Modal from "../components/Modal";
import NewRequestForm from "../components/NewRequestForm";



const FeaturesPage: React.FC = () => {
  const { user, isLoading, isError } = useCurrentUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [features, setFeatures] = useState<any[]>([]);
  const [featuresLoaded, setFeaturesLoaded] = useState(false);

  // Initial fetch
  React.useEffect(() => {
    if (!featuresLoaded) {
      fetch(`${import.meta.env.VITE_API_URL}/features`)
        .then(res => res.json())
        .then(data => {
          setFeatures(data);
          setFeaturesLoaded(true);
        });
    }
  }, [featuresLoaded]);

  const handleAddFeature = (feature: any) => {
    setFeatures(prev => [feature, ...prev]);
  };

  return (
    <div dir="rtl" className="bg-secondary min-h-screen flex flex-col">
      <Header user={user} />
      <main className="w-full">
        <div className="w-6/12 mx-auto py-8 flex flex-col">
          <div className="w-full flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold">בקשות פיצ'רים</h1>
              <p className="text-gray-700 mt-1">נהל והצבע על בקשות פיצ'רים...</p>
            </div>
            <button
              className="px-6 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition flex items-center gap-2"
              onClick={() => setIsModalOpen(true)}
            >
              <span>+</span>
              בקשה חדשה
            </button>
          </div>
          <div className="w-full">
            <FeatureList features={features} setFeatures={setFeatures} />
          </div>
        </div>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <NewRequestForm onClose={() => setIsModalOpen(false)} onAddFeature={handleAddFeature} />
        </Modal>
      </main>
    </div>
  );
};

export default FeaturesPage;
