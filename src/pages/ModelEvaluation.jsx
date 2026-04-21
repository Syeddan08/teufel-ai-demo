import React from 'react';
import Header from '../components/Header';
import { CheckCircle2, XCircle, BarChart2 } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const ModelEvaluation = () => {
  const radarData = [
    { subject: 'Audio Eval', GPT4o: 95, Claude35: 80, Llama3: 65, fullMark: 100 },
    { subject: 'Coding', GPT4o: 92, Claude35: 98, Llama3: 88, fullMark: 100 },
    { subject: 'Latency', GPT4o: 70, Claude35: 85, Llama3: 95, fullMark: 100 },
    { subject: 'Cost Eff.', GPT4o: 60, Claude35: 75, Llama3: 98, fullMark: 100 },
    { subject: 'Reasoning', GPT4o: 96, Claude35: 95, Llama3: 82, fullMark: 100 },
  ];

  return (
    <div className="main-content">
      <Header title="AI Model Evaluation Metrics" />
      <div className="page-container">
        
        <div className="grid-cols-2" style={{ flex: 1 }}>
          <div className="glass-panel" style={{ padding: '32px', display: 'flex', flexDirection: 'column' }}>
            <h3 className="mb-4 text-main">Capability Matrix</h3>
            <p className="text-muted text-sm mb-6">Radar evaluation comparing frontier models across key Teufel requirements (e.g. Audio Processing, Cost Efficiency).</p>
            <div style={{ flex: 1, minHeight: 400 }}>
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                  <PolarGrid stroke="rgba(255,255,255,0.1)" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#9ca3af', fontSize: 12 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar name="GPT-4o" dataKey="GPT4o" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                  <Radar name="Claude 3.5 Sonnet" dataKey="Claude35" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                  <Radar name="Llama 3 (8B)" dataKey="Llama3" stroke="#e62020" fill="#e62020" fillOpacity={0.3} />
                  <Tooltip contentStyle={{ backgroundColor: '#16191f', borderColor: '#2d323c' }} />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="glass-panel" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '32px', borderBottom: '1px solid var(--panel-border)' }}>
              <h3 className="text-main">Benchmark Comparison</h3>
            </div>
            <div style={{ flex: 1, padding: '16px' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Model</th>
                  <th>Latency (p95)</th>
                  <th>Cost / 1M Tokens</th>
                  <th>Audio Acc. (WER)</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div style={{ fontWeight: 600 }}>GPT-4o</div>
                    <div className="text-muted" style={{ fontSize: '0.75rem' }}>OpenAI</div>
                  </td>
                  <td>540ms</td>
                  <td>$5.00</td>
                  <td><span className="badge badge-success">4.2%</span></td>
                  <td><span className="badge badge-blue">Production</span></td>
                </tr>
                <tr>
                  <td>
                    <div style={{ fontWeight: 600 }}>Claude 3.5 Sonnet</div>
                    <div className="text-muted" style={{ fontSize: '0.75rem' }}>Anthropic</div>
                  </td>
                  <td>320ms</td>
                  <td>$3.00</td>
                  <td><span className="badge badge-warning">8.5%</span></td>
                  <td><span className="badge badge-success">Piloting</span></td>
                </tr>
                <tr>
                  <td>
                    <div style={{ fontWeight: 600 }}>Llama 3 (8B)</div>
                    <div className="text-muted" style={{ fontSize: '0.75rem' }}>Meta (Self-Hosted)</div>
                  </td>
                  <td>120ms</td>
                  <td>$0.40</td>
                  <td><span className="badge badge-danger">15.1%</span></td>
                  <td><span className="badge badge-warning">Evaluating</span></td>
                </tr>
              </tbody>
            </table>
            </div>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '32px' }}>
            <h3 className="mb-4 text-main">Consultant Recommendation</h3>
            <p className="text-muted" style={{ lineHeight: 1.6 }}>
              For latency-sensitive internal applications (like code completion or simple chat), <strong>Llama 3 self-hosted</strong> provides the best cost-to-performance ratio. However, for specialized Teufel audio analysis applications, <strong>GPT-4o</strong> severely outperforms competitors with a 4.2% Word Error Rate (WER) and native multimodal processing. <strong>Claude 3.5 Sonnet</strong> is recommended as a strong fallback for complex reasoning tasks balancing cost and speed.
            </p>
        </div>

      </div>
    </div>
  );
};

export default ModelEvaluation;
