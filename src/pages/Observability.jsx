import React from 'react';
import Header from '../components/Header';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip as RechartsTooltip, BarChart, Bar } from 'recharts';
import { AlertTriangle, Server, Eye, Filter } from 'lucide-react';

const Observability = () => {
  const latencyData = [
    { time: '10:00', Llama3: 120, GPT4o: 450, Claude: 320 },
    { time: '10:05', Llama3: 130, GPT4o: 600, Claude: 330 },
    { time: '10:10', Llama3: 125, GPT4o: 480, Claude: 310 },
    { time: '10:15', Llama3: 140, GPT4o: 800, Claude: 400 }, // Spike!
    { time: '10:20', Llama3: 122, GPT4o: 500, Claude: 315 },
    { time: '10:25', Llama3: 118, GPT4o: 520, Claude: 300 },
  ];

  const errorData = [
    { endpoint: '/v1/dsp-tuning', errors: 24 },
    { endpoint: '/v1/audio/transcriptions', errors: 52 },
    { endpoint: '/v1/embeddings', errors: 5 },
    { endpoint: '/v1/specs-validation', errors: 12 },
  ];

  return (
    <div className="main-content">
      <Header title="Observability & Telemetry" />
      <div className="page-container">
        
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-4">
            <div className="badge badge-success flex items-center gap-1"><Server size={14} /> Systems Operational</div>
            <div className="badge badge-warning flex items-center gap-1"><AlertTriangle size={14} /> 1 Warning (GPT-4o Audio Tuning Latency)</div>
          </div>
          <button className="btn btn-outline"><Filter size={16} /> Filter by Model</button>
        </div>

        <div className="grid-cols-2 mb-6">
          {/* Latency Chart */}
          <div className="glass-panel p-6">
            <h3 className="mb-4 text-main flex items-center gap-2" style={{ textTransform: 'uppercase' }}><Eye size={18} /> API Latency (ms) - Last 30 mins</h3>
            <div style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={latencyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="time" stroke="#9ca3af" fontSize={12} />
                  <YAxis stroke="#9ca3af" fontSize={12} />
                  <RechartsTooltip contentStyle={{ backgroundColor: '#14161c', borderColor: '#323741' }} />
                  <Line type="monotone" dataKey="Llama3" stroke="#EB0000" strokeWidth={3} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="GPT4o" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="Claude" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Error Rates */}
          <div className="glass-panel p-6">
            <h3 className="mb-4 text-main flex items-center gap-2" style={{ textTransform: 'uppercase' }}><AlertTriangle size={18} /> Error Rates by Endpoint</h3>
            <div style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={errorData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                  <XAxis type="number" stroke="#9ca3af" fontSize={12} />
                  <YAxis dataKey="endpoint" type="category" stroke="#9ca3af" fontSize={12} width={150} />
                  <RechartsTooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} contentStyle={{ backgroundColor: '#14161c', borderColor: '#323741' }} />
                  <Bar dataKey="errors" fill="#EB0000" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="glass-panel" style={{ overflow: 'hidden' }}>
          <div style={{ padding: '24px', borderBottom: '1px solid var(--panel-border)' }}>
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
                <td>2026-04-20 10:15:22</td>
                <td><span className="text-warning" style={{ fontWeight: 600 }}>WARN</span></td>
                <td>Gateway</td>
                <td>Upstream GPT-4o latency on audio file /test_rockster.wav exceeded 700ms (800ms)</td>
              </tr>
              <tr>
                <td>2026-04-20 10:14:10</td>
                <td><span className="text-success" style={{ fontWeight: 600 }}>INFO</span></td>
                <td>VectorDB</td>
                <td>Successfully indexed 45 new chunks to Pinecone (ULTIMA 40 Params)</td>
              </tr>
              <tr>
                <td>2026-04-20 10:05:01</td>
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
