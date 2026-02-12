import React from "react";


interface HeaderProps {
  user?: { avatar?: string; name?: string };
}

const Header: React.FC<HeaderProps> = ({ user }) => {
  return (
    <header className="w-full bg-white shadow-sm py-4 px-6 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-xl font-bold text-primary">Feature Request System</span>
      </div>
      
        {user && (
          <img
            src={user.avatar || `https://ui-avatars.com/api/?name=${user?.name}&background=0D8ABC&color=fff`}
            alt={user?.name || 'User Avatar'}
            className="w-10 h-10 rounded-full object-cover border border-gray-300"
          />
        )}
    
    </header>
  );
};

export default Header;
