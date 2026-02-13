
import React from "react";
import FeatureDetails from "./FeatureDetails";

interface FeatureCardProps {
  featureId: number;
  title: string;
  description: string;
  status: string;
  createdAt: string;
  creator: {
    name: string;
    avatar?: string;
    id?: string;
  };
  votes: { id: number, userId?: string }[];
  reactions: { id: number }[];
  className?: string;
  onVoteSuccess?: (featureId: number, vote: { id: number, userId?: string }) => void;
}

const statusColors: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-800",
  APPROVED: "bg-green-100 text-green-800",
  REJECTED: "bg-red-100 text-red-800",
  IN_PROGRESS: "bg-blue-100 text-blue-800",
  COMPLETED: "bg-gray-100 text-gray-800",
};
import { useState } from "react";
import axios from "axios";
import { useCurrentUser } from "../App";
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
  featureId,
  title,
  description,
  status,
  createdAt,
  creator,
  votes,
  reactions,
  className = "",
  onVoteSuccess,
}) => {
  const [open, setOpen] = useState(false);
  const { user } = useCurrentUser();
  const [voteLoading, setVoteLoading] = useState(false);
  const [voteError, setVoteError] = useState("");
  const [localVotes, setLocalVotes] = useState(votes);
  return (
    <div
      className={`flex flex-col w-full border-b border-gray-200 cursor-pointer select-none`}
      style={{
        borderRadius: 0,
        background: open
          ? 'linear-gradient(90deg, #F4F6FB 0%, #E6E9F5 100%)'
          : '#fff'
      }}
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
          <div className="text-gray-500 text-sm mt-1 pr-1 pb-1 overflow-hidden text-ellipsis whitespace-nowrap max-w-[500px]">
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
            {/* Vote button and supporters - flex row, RTL order: button right, count left */}
            <div className="flex flex-row items-center gap-2 bg-gray-50 rounded-2xl px-6 py-3 w-full justify-start" style={{ borderRadius: 10 }}>
              <button
                className={`flex items-center gap-2 px-6 py-2 rounded-lg font-bold text-lg shadow transition disabled:opacity-60 ${localVotes.some(v => v.userId === user?.id)
                  ? 'text-white' : 'bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white hover:brightness-105'}`}
                style={localVotes.some(v => v.userId === user?.id)
                  ? { background: 'linear-gradient(90deg, #059669 0%, #047857 100%)' }
                  : {}}
                disabled={voteLoading || !user || user.id === creator.id || localVotes.some(v => v.userId === user.id)}
                onClick={async (e) => {
                  e.stopPropagation();
                  setVoteLoading(true);
                  setVoteError("");
                  try {
                    const res = await axios.post(`${import.meta.env.VITE_API_URL}/votes`, {
                      featureId,
                      userId: user.id,
                    });
                    if (res.data && !res.data.error) {
                      const newVote = { id: res.data.id, userId: user.id };
                      setLocalVotes([...localVotes, newVote]);
                      if (onVoteSuccess) {
                        onVoteSuccess(featureId, newVote);
                      }
                    } else {
                      setVoteError(res.data.error || "שגיאה בהצבעה");
                    }
                  } catch (err) {
                    setVoteError("שגיאה בהצבעה");
                  } finally {
                    setVoteLoading(false);
                  }
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 15 12 9 18 15" />
                </svg>
                {localVotes.some(v => v.userId === user?.id)
                  ? 'הצבעת!'
                  : voteLoading ? 'מגיש...' : 'הצבע!'}
              </button>
              <span className="font-bold text-lg text-gray-700">{localVotes.length}</span>
              <span className="text-sm font-normal text-gray-500">משתמשים תומכים בבקשה זו</span>
            </div>
            {voteError && <div className="text-red-500 text-sm mt-2">{voteError}</div>}
            {/* Info bar - grid of 3 cards, all right-aligned */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-1 mt-2 w-full">
              {/* תגובות */}
              <div className="flex items-center bg-gray-50 rounded-2xl px-6 py-4 min-h-[64px] w-full text-right justify-start">
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="ml-2 text-gray-400"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8a2 2 0 012-2h2m10-4H7a2 2 0 00-2 2v0a2 2 0 002 2h10a2 2 0 002-2v0a2 2 0 00-2-2z" /></svg>
                <div className="flex flex-col items-start w-full text-right">
                  <span className="text-xs text-gray-400">תגובות</span>
                  <span className="font-bold text-base text-gray-700">{reactions.length}</span>
                </div>
              </div>
              {/* תאריך */}
              <div className="flex items-center bg-gray-50 rounded-2xl px-6 py-4 min-h-[64px] w-full text-right justify-start">
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="ml-2 text-gray-400"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2v-5a2 2 0 00-2-2H5a2 2 0 00-2 2v5a2 2 0 002 2z" /></svg>
                <div className="flex flex-col items-start w-full text-right">
                  <span className="text-xs text-gray-400">תאריך</span>
                  <span className="font-bold text-base text-gray-700">{new Date(createdAt).toLocaleDateString('he-IL', { day: 'numeric', month: 'long' })}</span>
                </div>
              </div>
              {/* יוצר */}
              <div className="flex items-center bg-gray-50 rounded-2xl px-6 py-4 min-h-[64px] w-full text-right justify-start">
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="ml-2 text-gray-400"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 12v2m0-6v2" /></svg>
                <div className="flex flex-col items-start w-full text-right">
                  <span className="text-xs text-gray-400">נוצר ע"י</span>
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
