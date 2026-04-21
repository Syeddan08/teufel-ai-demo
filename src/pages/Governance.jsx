import React, { useState } from 'react';
import Header from '../components/Header';
import { CheckSquare, Shield, FileWarning, HelpCircle, Download, CheckCircle2, X } from 'lucide-react';

const Toast = ({ message, onClose }) => (
  <div style={{
    position: 'fixed', bottom: '32px', right: '32px', zIndex: 9999,
    background: 'linear-gradient(135deg, #0d1117 0%, #161b22 100%)',
    border: '1px solid #10b981',
    borderRadius: '12px', padding: '16px 20px',
    display: 'flex', alignItems: 'flex-start', gap: '12px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
    maxWidth: '360px', animation: 'fadeInUp 0.3s ease',
  }}>
    <CheckCircle2 size={22} color="#10b981" style={{ flexShrink: 0, marginTop: '1px' }} />
    <div style={{ flex: 1 }}>
      <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#f9fafb', marginBottom: '4px' }}>
        Audit Report Generated
      </div>
      <div style={{ fontSize: '0.8rem', color: '#9ca3af', lineHeight: 1.5 }}>
        {message}
      </div>
    </div>
    <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', padding: '0', flexShrink: 0 }}>
      <X size={16} />
    </button>
  </div>
);

const Governance = () => {
  const [toast, setToast] = useState(null);
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      // Generate a realistic text blob as a downloadable file
      const reportContent = `TEUFEL AI GOVERNANCE AUDIT REPORT
Generated: ${new Date().toISOString().slice(0,10)}
====================================

1. EU AI Act — COMPLIANT (Limited Risk)
   ✓ Transparency obligations implemented
   ✓ Data quality governance enforced
   ✓ Human oversight controls active

2. GDPR — COMPLIANT
   ✓ OpenAI: Zero Data Retention API configured
   ✓ Anthropic: BAA signed, no retention
   ✓ PII scrubber: ACTIVE
   ✓ Log retention: 30 days (NIS2 Default)

3. NIS2 — AUDIT PENDING
   ⚠ Supply chain risk mapping in progress
   ⚠ Network & Information Security Directive review due Q2 2026

End of Report.`;

      const blob = new Blob([reportContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Audit_Report_Teufel_2026.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setIsExporting(false);
      setToast('Audit_Report_Teufel_2026.txt has been downloaded successfully.');
      setTimeout(() => setToast(null), 5000);
    }, 1200);
  };

  return (
    <div className="main-content">
      <Header title="Governance & Compliance Checker" />
      <div className="page-container">

        <div className="flex gap-4">
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
            <div className="badge badge-warning mb-1">Audit Pending</div>
            <div className="text-muted text-center" style={{ fontSize: '0.7rem', lineHeight: 1.3 }}>
              Network & Info Security Directive.<br/>Requires supply chain risk mapping.
            </div>
          </div>
        </div>

        <div className="grid-cols-2" style={{ flex: 1 }}>
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

            <div className="mb-4">
              <div className="mb-1" style={{ fontWeight: 500 }}>Log Retention Period</div>
              <select className="chat-input" style={{ width: '100%', cursor: 'pointer' }} defaultValue="30">
                <option value="7">7 Days</option>
                <option value="14">14 Days</option>
                <option value="30">30 Days (NIS2 Default)</option>
                <option value="90">90 Days</option>
              </select>
            </div>

            <button
              className="btn btn-primary mt-4"
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', opacity: isExporting ? 0.7 : 1 }}
              onClick={handleExport}
              disabled={isExporting}
            >
              <Download size={16} />
              {isExporting ? 'Generating Report...' : 'Export Audit Report'}
            </button>
          </div>
        </div>

      </div>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
};

export default Governance;
