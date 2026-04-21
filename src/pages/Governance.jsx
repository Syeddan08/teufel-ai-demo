import React from 'react';
import Header from '../components/Header';
import { CheckSquare, Shield, FileWarning, HelpCircle } from 'lucide-react';

const Governance = () => {
  return (
    <div className="main-content">
      <Header title="Governance & Compliance Checker" />
      <div className="page-container">
        
        <div className="flex gap-4 mb-6">
          <div className="glass-panel p-6 flex flex-col items-center justify-center gap-2" style={{ flex: 1 }}>
            <Shield size={32} color="#10b981" />
            <div className="text-xl" style={{ fontWeight: 600 }}>EU AI Act</div>
            <div className="badge badge-success">Compliant (Limited Risk)</div>
          </div>
          <div className="glass-panel p-6 flex flex-col items-center justify-center gap-2" style={{ flex: 1 }}>
            <Shield size={32} color="#10b981" />
            <div className="text-xl" style={{ fontWeight: 600 }}>GDPR</div>
            <div className="badge badge-success">Data Residency Configured</div>
          </div>
          <div className="glass-panel p-6 flex flex-col items-center justify-center gap-2" style={{ flex: 1 }}>
            <FileWarning size={32} color="#f59e0b" />
            <div className="text-xl" style={{ fontWeight: 600 }}>NIS2</div>
            <div className="badge badge-warning">Audit Pending</div>
          </div>
        </div>

        <div className="grid-cols-2">
          {/* AI Act Checklist */}
          <div className="glass-panel p-6">
            <h3 className="mb-4 text-main flex items-center gap-2"><CheckSquare size={20} /> EU AI Act Compliance Checklist</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <li className="flex gap-3">
                <input type="checkbox" checked readOnly style={{ accentColor: 'var(--primary)', width: '18px', height: '18px', marginTop: '2px' }} />
                <div>
                  <div style={{ fontWeight: 600 }}>Transparency Obligations</div>
                  <div className="text-muted text-sm mt-1">Users are explicitly informed they are interacting with an AI (Required for chatbots/RAG).</div>
                </div>
              </li>
              <li className="flex gap-3">
                <input type="checkbox" checked readOnly style={{ accentColor: 'var(--primary)', width: '18px', height: '18px', marginTop: '2px' }} />
                <div>
                  <div style={{ fontWeight: 600 }}>Data Quality & Governance</div>
                  <div className="text-muted text-sm mt-1">Vector DB strictly partitioned. Only validated internal Teufel documentation is indexed.</div>
                </div>
              </li>
              <li className="flex gap-3">
                <input type="checkbox" checked readOnly style={{ accentColor: 'var(--primary)', width: '18px', height: '18px', marginTop: '2px' }} />
                <div>
                  <div style={{ fontWeight: 600 }}>Human Oversight</div>
                  <div className="text-muted text-sm mt-1">Capability to manually override AI outputs or terminate active sessions is implemented.</div>
                </div>
              </li>
            </ul>
          </div>

          {/* GDPR / Privacy Settings */}
          <div className="glass-panel p-6">
            <h3 className="mb-4 text-main flex items-center gap-2"><HelpCircle size={20} /> Data Privacy & Retention Policy</h3>
            
            <div className="mb-4">
              <div className="mb-1" style={{ fontWeight: 500 }}>Provider Data Agreements</div>
              <div className="text-muted text-sm p-3 glass-panel" style={{ background: 'rgba(0,0,0,0.2)' }}>
                <strong>OpenAI:</strong> Zero Data Retention API configured. Prompts are not used for model training.<br/>
                <strong>Anthropic:</strong> BAA signed. No retention.
              </div>
            </div>

            <div className="mb-4">
              <div className="mb-1" style={{ fontWeight: 500 }}>Internal Logging Policy (PII Scrubbing)</div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted">Regex-based PII scrubber</span>
                <span className="badge badge-success">ACTIVE</span>
              </div>
            </div>

            <div>
              <div className="mb-1" style={{ fontWeight: 500 }}>Log Retention Period</div>
              <select className="chat-input" style={{ width: '100%', cursor: 'pointer' }} defaultValue="30">
                <option value="7">7 Days</option>
                <option value="14">14 Days</option>
                <option value="30">30 Days (NIS2 Default)</option>
                <option value="90">90 Days</option>
              </select>
            </div>
            
            <button className="btn btn-outline mt-4" style={{ width: '100%' }}>Export Audit Report</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Governance;
