import React, { useEffect, useState } from "react";
import FeatureCard from "./FeatureCard";
import axios from "axios";

interface Feature {
  id: number;
  title: string;
  description: string;
  status: string;
  createdAt: string;
  creator: {
    name: string;
    avatar?: string;
  };
  votes: { id: number }[];
  reactions: { id: number }[];
}

const FeatureList: React.FC = () => {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/features`)
      .then(res => {
        setFeatures(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load features");
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="flex flex-col gap-4 w-full max-w-2xl mx-auto">
      {features.map(feature => (
        <FeatureCard
          key={feature.id}
          title={feature.title}
          description={feature.description}
          status={feature.status}
          createdAt={feature.createdAt}
          creator={feature.creator}
          votes={feature.votes}
          reactions={feature.reactions}
        />
      ))}
    </div>
  );
};

export default FeatureList;
