
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
      className={`flex flex-col w-full border-b border-gray-200 cursor-pointer select-none ${open ? 'bg-gray-100' : 'bg-white'}`}
      style={{ borderRadius: 0 }}
      onClick={() => setOpen((v) => !v)}
      tabIndex={0}
      role="button"
      aria-expanded={open}
    >
      <div className="flex items-center w-full px-4 py-3 min-h-[64px]">
        {/* Votes on right */}
        <div className="flex flex-col items-center justify-center min-w-[70px] pr-2">
          <div
            className={
              `rounded-lg w-12 h-16 flex flex-col items-center justify-center border ${open ? '' : 'bg-gray-50 border-gray-200'}`
            }
            style={open ? {
              background: 'linear-gradient(90deg, #6366F1 0%, #8B5CF6 100%)',
              border: 'none'
            } : {}}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={open ? '#fff' : '#A3A3A3'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-1">
              <polyline points="6 15 12 9 18 15" />
            </svg>
            <span className={`font-bold text-lg ${open ? 'text-white' : 'text-gray-800'}`}>{votes.length}</span>
          </div>
        </div>
        {/* Main content */}
        <div className="flex-1 flex flex-col justify-center pr-4">
          <div className="flex items-center justify-between w-full">
            <h2 className="font-bold text-base text-gray-900 truncate max-w-[400px]">{title}</h2>
          </div>
          <div className="text-gray-500 text-sm mt-1 truncate max-w-[500px] pr-1 pb-1">
            {description}
          </div>
          <div className="flex items-center gap-4 text-xs text-gray-400 mt-2">
            <div className="flex items-center gap-1">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray-400"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2v-5a2 2 0 00-2-2H5a2 2 0 00-2 2v5a2 2 0 002 2z" /></svg>
              <span>{timeAgo(createdAt)}</span>
            </div>
            <div className="flex items-center gap-1">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray-400"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8a2 2 0 012-2h2m10-4H7a2 2 0 00-2 2v0a2 2 0 002 2h10a2 2 0 002-2v0a2 2 0 00-2-2z" /></svg>
              <span>{reactions.length}</span>
              <span>תגובות</span>
            </div>
          </div>
        </div>
      </div>
      {/* Accordion Content - smooth transition */}
      <div
        className={`overflow-hidden transition-all duration-300 bg-white px-8 ${open ? 'max-h-96 py-6 opacity-100' : 'max-h-0 py-0 opacity-0'}`}
        style={{ pointerEvents: open ? 'auto' : 'none' }}
        onClick={e => e.stopPropagation()}
      >
        {open && (
          <div className="flex flex-col gap-6">
            {/* Description */}
            <div className="text-gray-700 text-base mb-2 whitespace-pre-line">
              {description}
            </div>
            {/* Vote button and supporters */}
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-6 py-2 rounded-lg bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white font-bold text-lg shadow hover:brightness-105 transition">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 15 12 9 18 15" />
                </svg>
                הצבע!
              </button>
              <div className="flex items-center gap-2 text-gray-700 font-bold text-lg">
                <span>{votes.length}</span>
                <span className="text-sm font-normal text-gray-500">משתמשים תומכים בבקשה זו</span>
              </div>
            </div>
            {/* Info bar */}
            <div className="flex items-center gap-6 bg-gray-50 rounded-xl p-4 mt-2">
              <div className="flex flex-col items-center flex-1">
                <span className="text-xs text-gray-500 mb-1">תגובות</span>
                <div className="flex items-center gap-1">
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray-400"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8a2 2 0 012-2h2m10-4H7a2 2 0 00-2 2v0a2 2 0 002 2h10a2 2 0 002-2v0a2 2 0 00-2-2z" /></svg>
                  <span className="font-bold text-base text-gray-700">{reactions.length}</span>
                </div>
              </div>
              <div className="flex flex-col items-center flex-1">
                <span className="text-xs text-gray-500 mb-1">תאריך</span>
                <div className="flex items-center gap-1">
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray-400"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2v-5a2 2 0 00-2-2H5a2 2 0 00-2 2v5a2 2 0 002 2z" /></svg>
                  <span className="font-bold text-base text-gray-700">{new Date(createdAt).toLocaleDateString('he-IL', { day: 'numeric', month: 'long' })}</span>
                </div>
              </div>
              <div className="flex flex-col items-center flex-1">
                <span className="text-xs text-gray-500 mb-1">נוצר ע"י</span>
                <div className="flex items-center gap-1">
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray-400"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 12v2m0-6v2" /></svg>
                  <span className="font-bold text-base text-gray-700">{creator.name}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeatureCard;
