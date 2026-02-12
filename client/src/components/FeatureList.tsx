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

const FeatureList: React.FC<{ features: any[]; setFeatures: (f: any[]) => void }> = ({ features }) => {
  return (
    <div className="flex flex-col w-full">
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
