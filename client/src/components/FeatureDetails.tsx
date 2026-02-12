import React from "react";

interface FeatureDetailsProps {
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

const FeatureDetails: React.FC<FeatureDetailsProps> = ({
  description,
  status,
  createdAt,
  creator,
  votes,
  reactions,
}) => {
  return (
    <div className="p-4 border-t mt-2">
      <div className="mb-2 text-sm text-gray-700">{description}</div>
      <div className="flex flex-wrap gap-4 text-xs text-gray-500 mb-2">
        <span>סטטוס: {status}</span>
        <span>נוצר בתאריך: {new Date(createdAt).toLocaleDateString()}</span>
        <span>יוצר: {creator.name}</span>
        <span>הצבעות: {votes.length}</span>
        <span>תגובות: {reactions.length}</span>
      </div>
      {/* כאן אפשר להוסיף עוד פרטים, תגובות, כפתורים וכו' */}
    </div>
  );
};

export default FeatureDetails;
