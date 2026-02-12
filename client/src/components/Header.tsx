import React from "react";

const Header: React.FC = () => {
  return (
    <header className="w-full bg-white shadow-sm py-4 px-6 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-xl font-bold text-primary">Feature Request System</span>
      </div>
          {/* You can add a login button/user icon here in the future */}
    </header>
  );
};

export default Header;
