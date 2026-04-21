import React, { useState } from 'react';
import Header from '../components/Header';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip as RechartsTooltip, BarChart, Bar, Legend, Label } from 'recharts';
import { AlertTriangle, Server, Eye, Filter, Check } from 'lucide-react';

const ALL_MODELS = [
  { key: 'Llama3',  label: 'Llama 3 (Local)',    color: '#EB0000' },
  { key: 'GPT4o',   label: 'GPT-4o (Azure)',      color: '#10b981' },
  { key: 'Claude',  label: 'Claude 3.5 Sonnet',   color: '#3b82f6' },
];

const Observability = () => {
  const [activeModels, setActiveModels] = useState(['Llama3', 'GPT4o', 'Claude']);
  const [filterOpen, setFilterOpen] = useState(false);

  const latencyData = [
    { time: '10:00', Llama3: 120, GPT4o: 450, Claude: 320 },
    { time: '10:05', Llama3: 130, GPT4o: 600, Claude: 330 },
    { time: '10:10', Llama3: 125, GPT4o: 480, Claude: 310 },
    { time: '10:15', Llama3: 140, GPT4o: 800, Claude: 400 },
    { time: '10:20', Llama3: 122, GPT4o: 500, Claude: 315 },
    { time: '10:25', Llama3: 118, GPT4o: 520, Claude: 300 },
  ];

  const errorData = [
    { endpoint: '/v1/dsp-tuning', errors: 24 },
    { endpoint: '/v1/audio/transcriptions', errors: 52 },
    { endpoint: '/v1/embeddings', errors: 5 },
    { endpoint: '/v1/specs-validation', errors: 12 },
  ];

  const toggleModel = (key) => {
    setActiveModels(prev =>
      prev.includes(key)
        ? prev.filter(m => m !== key)
        : [...prev, key]
    );
  };

  return (
    <div className="main-content">
      <Header title="Observability & Telemetry" />
      <div className="page-container">

        <div className="flex justify-between items-center" style={{ position: 'relative' }}>
          <div className="flex gap-4">
            <div className="badge badge-success flex items-center gap-1"><Server size={14} /> Systems Operational</div>
            <div className="badge badge-warning flex items-center gap-1"><AlertTriangle size={14} /> 1 Warning (GPT-4o Audio Tuning Latency)</div>
          </div>

          {/* Filter dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              className="btn btn-outline"
              onClick={() => setFilterOpen(o => !o)}
              style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <Filter size={16} /> Filter by Model
            </button>
            {filterOpen && (
              <div className="glass-panel" style={{
                position: 'absolute', right: 0, top: 'calc(100% + 8px)', zIndex: 50,
                minWidth: '220px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px',
                border: '1px solid var(--panel-border)', boxShadow: '0 8px 32px rgba(0,0,0,0.5)'
              }}>
                <div className="text-muted text-sm" style={{ fontWeight: 600, textTransform: 'uppercase', marginBottom: '4px' }}>
                  Toggle Models
                </div>
                {ALL_MODELS.map(m => (
                  <button
                    key={m.key}
                    onClick={() => toggleModel(m.key)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '10px',
                      background: 'transparent', border: 'none', cursor: 'pointer',
                      padding: '6px 8px', borderRadius: '6px',
                      color: '#f9fafb', textAlign: 'left', width: '100%',
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <div style={{
                      width: '16px', height: '16px', borderRadius: '4px', flexShrink: 0,
                      background: activeModels.includes(m.key) ? m.color : 'rgba(255,255,255,0.1)',
                      border: `2px solid ${m.color}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'background 0.15s'
                    }}>
                      {activeModels.includes(m.key) && <Check size={10} color="#fff" strokeWidth={3} />}
                    </div>
                    <span style={{ fontSize: '0.875rem' }}>{m.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="grid-cols-2" style={{ flex: 1 }}>
          {/* Latency Chart */}
          <div className="glass-panel p-6" style={{ display: 'flex', flexDirection: 'column' }}>
            <h3 className="mb-4 text-main flex items-center gap-2" style={{ textTransform: 'uppercase' }}><Eye size={18} /> API Latency (ms) — Last 30 mins</h3>
            <div style={{ flex: 1, width: '100%', minHeight: 400 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={latencyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="time" stroke="#9ca3af" fontSize={12} />
                  <YAxis stroke="#9ca3af" fontSize={12}>
                    <Label value="Latency (ms)" angle={-90} position="insideLeft" fill="#9ca3af" fontSize={11} offset={10} />
                  </YAxis>
                  <RechartsTooltip contentStyle={{ backgroundColor: '#14161c', borderColor: '#323741' }} />
                  <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '14px', color: '#f9fafb' }} />
                  {ALL_MODELS.map(m => activeModels.includes(m.key) && (
                    <Line
                      key={m.key}
                      name={m.label}
                      type="monotone"
                      dataKey={m.key}
                      stroke={m.color}
                      strokeWidth={m.key === 'Llama3' ? 3 : 2}
                      dot={{ r: 4 }}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Error Rates */}
          <div className="glass-panel p-6" style={{ display: 'flex', flexDirection: 'column' }}>
            <h3 className="mb-4 text-main flex items-center gap-2" style={{ textTransform: 'uppercase' }}><AlertTriangle size={18} /> Error Rates by Endpoint</h3>
            <div style={{ flex: 1, width: '100%', minHeight: 400 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={errorData} layout="vertical" margin={{ right: 20, bottom: 24 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                  <XAxis type="number" stroke="#9ca3af" fontSize={12}>
                    <Label value="Errors / Hour" position="insideBottom" offset={-12} fill="#9ca3af" fontSize={11} />
                  </XAxis>
                  <YAxis dataKey="endpoint" type="category" stroke="#9ca3af" fontSize={12} width={150} />
                  <RechartsTooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} contentStyle={{ backgroundColor: '#14161c', borderColor: '#323741' }} />
                  <Bar dataKey="errors" name="Errors / Hour" fill="#EB0000" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="glass-panel" style={{ overflow: 'hidden' }}>
          <div style={{ padding: '32px', borderBottom: '1px solid var(--panel-border)' }}>
            <h3 className="text-main" style={{ textTransform: 'uppercase' }}>Recent System Logs</h3>
          </div>
          <table className="data-table" style={{ fontSize: '0.85rem' }}>
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Level</th>
                <th>Service</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody style={{ fontFamily: 'monospace' }}>
              <tr>
                <td>2026-04-21 10:15:22</td>
                <td><span className="text-warning" style={{ fontWeight: 600 }}>WARN</span></td>
                <td>Gateway</td>
                <td>Upstream GPT-4o latency on audio file /test_rockster.wav exceeded 700ms (800ms)</td>
              </tr>
              <tr>
                <td>2026-04-21 10:14:10</td>
                <td><span className="text-success" style={{ fontWeight: 600 }}>INFO</span></td>
                <td>VectorDB</td>
                <td>Successfully indexed 45 new chunks to Pinecone (ULTIMA 40 Params)</td>
              </tr>
              <tr>
                <td>2026-04-21 10:05:01</td>
                <td><span className="text-danger" style={{ fontWeight: 600 }}>ERROR</span></td>
                <td>TranscriptionService</td>
                <td>Failed to process audio blob: BT-MIC-DROP.wav - Invalid format</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default Observability;
