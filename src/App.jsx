import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import ModelEvaluation from './pages/ModelEvaluation';
import RAGPipeline from './pages/RAGPipeline';
import Observability from './pages/Observability';
import Governance from './pages/Governance';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/evaluation" element={<ModelEvaluation />} />
          <Route path="/rag" element={<RAGPipeline />} />
          <Route path="/observability" element={<Observability />} />
          <Route path="/governance" element={<Governance />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
