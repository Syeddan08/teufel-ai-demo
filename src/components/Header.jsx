import React from 'react';
import { Bell, Settings, Search } from 'lucide-react';

const Header = ({ title }) => {
  return (
    <header className="top-header">
      <div className="page-title">{title}</div>
      <div className="header-actions">
        <button className="text-muted"><Search size={20} /></button>
        <button className="text-muted"><Bell size={20} /></button>
        <button className="text-muted"><Settings size={20} /></button>
        <div className="user-profile ml-4">
          <div className="avatar">SD</div>
          <div className="text-sm">
            <div style={{ fontWeight: 600 }}>Syed Dan</div>
            <div className="text-muted" style={{ fontSize: '0.75rem' }}>AI Consultant</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
