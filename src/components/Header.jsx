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
          <div className="avatar" style={{ overflow: 'hidden', padding: 0, background: 'transparent' }}>
            <img src="/teufel-ai-demo/profile.jpg" alt="Syed Danish Hassan" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div className="text-sm">
            <div style={{ fontWeight: 600 }}>Syed Danish Hassan</div>
            <div className="text-muted" style={{ fontSize: '0.75rem' }}>Technical AI Inhouse Consultant</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
