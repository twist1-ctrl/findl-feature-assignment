
import Header from "../components/Header";
import React, { useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import FeatureList from "../components/FeatureList";
import { useCurrentUser } from "../App";
import Modal from "../components/Modal";
import NewRequestForm from "../components/NewRequestForm";
import RequestsSummaryContainer from "../components/RequestsSummaryContainer";



const FeaturesPage: React.FC = () => {
  const { user } = useCurrentUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [features, setFeatures] = useState<any[]>([]);
  const [featuresLoaded, setFeaturesLoaded] = useState(false);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);

  // Initial fetch
  React.useEffect(() => {
    const url = debouncedSearch.trim()
      ? `${import.meta.env.VITE_API_URL}/features?search=${encodeURIComponent(debouncedSearch)}`
      : `${import.meta.env.VITE_API_URL}/features`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setFeatures(data);
        setFeaturesLoaded(true);
      });
  }, [debouncedSearch, featuresLoaded]);

  const handleAddFeature = (feature: any) => {
    setFeatures(prev => [feature, ...prev]);
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header user={user} />
      <main className="w-full">
        <div className="w-6/12 mx-auto py-8 flex flex-col">
          <div className="w-full flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold">בקשות פיצ'רים</h1>
              <p className="text-gray-700 mt-1">נהל והצבע על בקשות לפיצ'רים חדשים</p>
            </div>
           
            <button
              className="px-6 py-2 rounded font-semibold transition flex items-center gap-2 text-white bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] hover:brightness-105"
              onClick={() => setIsModalOpen(true)}
            >
              <span>+</span>
              בקשה חדשה
            </button>
          </div>
          <div className="w-full">
            <RequestsSummaryContainer features={features}/>
            {/* Search bar */}
            <div className="w-full flex items-center mt-6 mb-4">
              <div className="relative w-full">
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="חיפוש בקשה..."
                  className="w-full rounded-xl border border-gray-200 bg-white py-3 pr-4 pl-12 text-right text-gray-900 text-base focus:outline-none focus:ring-2 focus:ring-primary transition shadow-sm placeholder-gray-400"
                  style={{fontFamily: 'inherit'}}
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" fill="none"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 20l-3.5-3.5" />
                  </svg>
                </span>
              </div>
            </div>
            <FeatureList features={features} setFeatures={setFeatures} />
          </div>
          <div >
          
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
