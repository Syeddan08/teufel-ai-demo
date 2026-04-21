import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Speaker, Database, Activity, ShieldCheck, Headphones } from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { path: '/', label: 'KPI Dashboard', icon: <LayoutDashboard className="nav-icon" size={20} /> },
    { path: '/evaluation', label: 'Model Evaluation', icon: <Headphones className="nav-icon" size={20} /> },
    { path: '/rag', label: 'Secure RAG Pipeline', icon: <Database className="nav-icon" size={20} /> },
    { path: '/observability', label: 'Observability', icon: <Activity className="nav-icon" size={20} /> },
    { path: '/governance', label: 'Governance & Compliance', icon: <ShieldCheck className="nav-icon" size={20} /> },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="teufel-logo">
          <span className="teufel-logo-t">T</span>EUFEL
        </div>
      </div>
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
