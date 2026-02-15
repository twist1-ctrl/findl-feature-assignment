import React from "react";

interface RequestsSummaryProps {
  completedCount: number;
  pendingCount: number;
  totalCount: number;
  percentChange?: number; // percent change from last month, positive or negative
}

const RequestsSummary: React.FC<RequestsSummaryProps> = ({
  completedCount,
  pendingCount,
  totalCount,
  percentChange = 0,
}) => {
  return (
    <div className="w-full flex flex-col md:flex-row gap-4 mt-4">
      {/* Total requests */}
      <div className="flex-1 bg-white rounded-2xl border-2 border-[#4367e9] p-6 flex flex-col justify-between min-w-[180px] min-h-[100px] shadow-sm relative">
        <div className="flex items-center justify-start mb-2">
       
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#4367e9" strokeWidth="2" className="ml-1"><circle cx="12" cy="12" r="10" stroke="#4367e9" strokeWidth="2" fill="none"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3" stroke="#4367e9"/></svg>
          <span className="text-xs text-gray-500">סה"כ בקשות</span>
        </div>
        <div className="flex flex-col justify-between">
          <div className="text-2xl font-bold text-gray-900 text-rtl rtl:text-right rtl:text-right mb-2">{totalCount}</div>
          {percentChange !== undefined && (
            <div className={`flex items-center text-xs font-bold ml-2 ${percentChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {percentChange >= 0 ? '+' : ''}{percentChange}%
              {percentChange >= 0 ? (
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="ml-1"><polyline points="6 15 12 9 18 15" /></svg>
              ) : (
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="ml-1"><polyline points="18 9 12 15 6 9" /></svg>
              )}
              <span className="text-xs font-normal text-gray-500 ml-1">מהחודש שעבר</span>
            </div>
          )}
        </div>
      </div>
      {/* Pending for handling */}
      <div className="flex-1 bg-white rounded-2xl border border-gray-100 p-6 flex flex-col justify-between min-w-[180px] min-h-[100px] shadow-sm">
        <div className="flex items-center justify-start mb-2">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#4367e9" strokeWidth="2" className="ml-1"><circle cx="12" cy="12" r="10" stroke="#4367e9" strokeWidth="2" fill="none"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3" stroke="#4367e9"/></svg>
          <span className="text-xs text-gray-500">ממתינות לטיפול</span>
        </div>
        <div className="text-2xl font-bold text-gray-900 text-rtl rtl:text-right rtl:text-right mb-2">{pendingCount}</div>
      </div>
      {/* Completed this month */}
      <div className="flex-1 bg-white rounded-2xl border border-gray-100 p-6 flex flex-col justify-between min-w-[180px] min-h-[100px] shadow-sm">
        <div className="flex items-center justify-start mb-2">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#4367e9" strokeWidth="2" className="ml-1"><circle cx="12" cy="12" r="10" stroke="#4367e9" strokeWidth="2" fill="none"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" stroke="#4367e9"/></svg>
          <span className="text-xs text-gray-500">הושלמו החודש</span>
        </div>
        <div className="text-2xl font-bold text-gray-900 text-rtl rtl:text-right rtl:text-right mb-2">{completedCount}</div>
      </div>
    </div>
  );
};

export default RequestsSummary;
