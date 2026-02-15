import React from "react";
import FeatureCard from "./FeatureCard";

interface Feature {
  id: number;
  title: string;
  description: string;
  status: string;
  createdAt: string;
  creator: {
    name: string;
    avatar?: string;
    id?: string;
  };
  votes: { id: number; userId?: string }[];
  reactions: { id: number }[];
}

interface FeatureListProps {
  features: Feature[];
  setFeatures: React.Dispatch<React.SetStateAction<Feature[]>>;
}

const FeatureList: React.FC<FeatureListProps> = ({ features, setFeatures }) => {
  // עדכון מספר המצביעים במערך הראשי
  const handleVoteSuccess = (featureId: number, vote: { id: number; userId?: string }) => {
    setFeatures((prev: Feature[]) => prev.map((f: Feature) => f.id === featureId ? { ...f, votes: [...f.votes, vote] } : f));
  };
  return (
    <div className="flex flex-col w-full">
      {features.map((feature: Feature) => (
        <FeatureCard
          key={feature.id}
          featureId={feature.id}
          title={feature.title}
          description={feature.description}
          status={feature.status}
          createdAt={feature.createdAt}
          creator={feature.creator}
          votes={feature.votes}
          reactions={feature.reactions}
          onVoteSuccess={handleVoteSuccess}
        />
      ))}
    </div>
  );
};

export default FeatureList;
