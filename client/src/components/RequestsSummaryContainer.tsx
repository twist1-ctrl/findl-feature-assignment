import React from "react";
import RequestsSummary from "./RequestsSummary";

interface RequestsSummaryContainerProps {
  features: any[];
}

const RequestsSummaryContainer: React.FC<RequestsSummaryContainerProps> = ({ features }) => {
  // Logic: completed = status COMPLETED, pending = status PENDING/IN_PROGRESS, total = all
  const completedCount = features.filter(f => f.status === 'COMPLETED').length;
  const pendingCount = features.filter(f => f.status === 'PENDING' || f.status === 'IN_PROGRESS').length;
  const totalCount = features.length;

  // For demo: percentChange is random or 0, in real use should come from API
  // Here, just as an example, we use 12 for positive change
  const percentChange = 12;

  return (
    <RequestsSummary
      completedCount={completedCount}
      pendingCount={pendingCount}
      totalCount={totalCount}
      percentChange={percentChange}
    />
  );
};

export default RequestsSummaryContainer;
