import Header from "../components/Header";
import React from "react";
import FeatureList from "../components/FeatureList";
import { useCurrentUser } from "../App";

const FeaturesPage: React.FC = () => {
  const { user, isLoading, isError } = useCurrentUser();
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
            <button className="px-6 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition flex items-center gap-2">
              <span>+</span>
              בקשה חדשה
            </button>
          </div>
          <div className="w-full">
            <FeatureList />
          </div>
        </div>
      </main>
    </div>
  );
};

export default FeaturesPage;
