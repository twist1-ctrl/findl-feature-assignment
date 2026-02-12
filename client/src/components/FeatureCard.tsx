
import React from "react";
import FeatureDetails from "./FeatureDetails";

interface FeatureCardProps {
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
  className?: string;
}

const statusColors: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-800",
  APPROVED: "bg-green-100 text-green-800",
  REJECTED: "bg-red-100 text-red-800",
  IN_PROGRESS: "bg-blue-100 text-blue-800",
  COMPLETED: "bg-gray-100 text-gray-800",
};
import { useState } from "react";
function timeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  status,
  createdAt,
  creator,
  votes,
  reactions,
  className = "",
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`relative flex flex-col w-full rounded-lg shadow border-l-4 transition-all duration-200 cursor-pointer ${
        open
          ? "bg-white border-blue-600 dark:bg-gray-900 dark:border-blue-400"
          : "bg-gray-50 border-transparent hover:border-blue-300 dark:bg-gray-800"
      } ${className}`}
    >
      {/* Header - always visible, click toggles open/close */}
      <div
        className="flex items-center justify-between gap-2 px-6 pt-4 pb-2 select-none"
        onClick={() => setOpen((v) => !v)}
        style={{ cursor: "pointer" }}
      >
        <div className="flex items-center gap-3">
          {creator.avatar && (
            <img src={creator.avatar} alt={creator.name} className="w-8 h-8 rounded-full object-cover" />
          )}
          <div>
            <h2 className="text-lg font-semibold leading-tight">{title}</h2>
            <div className="text-xs text-gray-500 flex gap-2 items-center">
              <span>by {creator.name}</span>
              <span>· {timeAgo(createdAt)}</span>
            </div>
          </div>
        </div>
        <span className={`px-2 py-1 rounded text-xs font-bold ${statusColors[status] || "bg-gray-100 text-gray-800"}`}>
          {status}
        </span>
      </div>
      {/* Content - only lower part expands */}
      <div className="px-6 pb-4">
        <p className={`text-gray-700 text-sm mb-2 ${open ? "line-clamp-none" : "line-clamp-2"}`}>{description}</p>
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span>{votes.length} votes</span>
          <span>{reactions.length} comments</span>
        </div>
        {open && (
          <>
            <div className="mt-4">
              <button
                className="px-3 py-1 rounded bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition"
                onClick={e => { e.stopPropagation(); /* TODO: handle vote */ }}
              >
                Vote ({votes.length})
              </button>
            </div>
            <FeatureDetails
              description={description}
              status={status}
              createdAt={createdAt}
              creator={creator}
              votes={votes}
              reactions={reactions}
            />
          </>
        )}
      </div>
      {/* Side color bar for open state */}
      {open && (
        <div className="absolute left-0 top-0 h-full w-1 bg-blue-600 rounded-l-lg" />
      )}
    </div>
  );
};

export default FeatureCard;
