import Header from "../components/Header";
import React from "react";


import FeatureList from "../components/FeatureList";

const FeaturesPage: React.FC = () => {
  return (
    <>
      <Header />
      <main className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-6">Feature Requests</h1>
        <FeatureList />
      </main>
    </>
  );
};

export default FeaturesPage;
