import React, { useState } from 'react';
import Header from '../components/Header';
import { Send, Database, FileText } from 'lucide-react';

const RAGPipeline = () => {
  const [messages, setMessages] = useState([
    { role: 'ai', content: 'SYSTEM READY: Secure connection established to Teufel Product Database. You can query technical manuals or spec sheets (e.g. ULTIMA 40 Surround, ROCKSTER AIR 2).', context: null }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages(prev => [...prev, { role: 'user', content: input, context: null }]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'ai', 
        content: `Based on the internal documentation for the ROCKSTER AIR 2, the Bluetooth module supports Bluetooth 5.0 with aptX® and aptX® HD for high-resolution audio streaming. The swappable battery guarantees up to 58 hours of playtime at medium volume settings.`, 
        context: [
          { score: 0.96, source: 'ROCKSTER_AIR_2_Manual_v3.pdf', snippet: 'Battery performance: Up to 58 hours of playtime at medium volume (approx. 65 dB). High power swappable LiFePO4 battery.' },
          { score: 0.89, source: 'Teufel_Product_Specs_Q3.xlsx', snippet: 'Connectivity: Bluetooth 5.0 integrated circuit supporting SBC, AAC, aptX®, and aptX® HD codecs.' }
        ]
      }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="main-content">
      <Header title="Secure RAG Pipeline / Knowledge Base" />
      <div className="page-container" style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - var(--header-height))', padding: '32px' }}>
        
        <div style={{ display: 'flex', gap: '24px', flex: 1, overflow: 'hidden' }}>
          {/* Chat Section */}
          <div className="glass-panel" style={{ flex: 2, display: 'flex', flexDirection: 'column' }}>
            <div className="chat-messages" style={{ flex: 1 }}>
              {messages.map((msg, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start', gap: '8px' }}>
                  <div className={`message ${msg.role === 'user' ? 'msg-user' : 'msg-ai'}`}>
                    {msg.content}
                  </div>
                  {msg.context && (
                    <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: 'var(--radius-sm)', maxWidth: '85%', borderLeft: '3px solid var(--primary)' }}>
                      <div className="text-muted text-sm mb-2" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, textTransform: 'uppercase' }}>
                        <Database size={14} /> Retrieved Knowledge Chunks
                      </div>
                      {msg.context.map((ctx, idx) => (
                        <div key={idx} style={{ marginBottom: '8px', fontSize: '0.85rem' }}>
                          <span className="badge badge-success" style={{ marginRight: '8px' }}>{ctx.score.toFixed(2)}</span>
                          <span style={{ color: 'var(--accent-blish)', fontWeight: 600 }}>{ctx.source}</span>:<br/>"{ctx.snippet}"
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {isTyping && (
                <div className="message msg-ai text-muted text-sm" style={{ alignSelf: 'flex-start' }}>
                  <span style={{ color: 'var(--primary)', fontWeight: 600 }}>[SYS]</span> Extracting vector embeddings...
                </div>
              )}
            </div>
            
            <form onSubmit={handleSend} className="chat-input-area">
              <input 
                type="text" 
                className="chat-input"
                placeholder="Query: How long is the battery life of the ROCKSTER AIR 2?"
                value={input}
                onChange={e => setInput(e.target.value)}
              />
              <button type="submit" className="btn btn-primary"><Send size={18} /></button>
            </form>
          </div>

          <div className="glass-panel" style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
            <h3 className="mb-4 text-main flex items-center gap-2" style={{ textTransform: 'uppercase' }}><Database size={20} /> Pipeline Telemetry</h3>
            
            <div className="mb-6">
              <div className="text-muted text-sm mb-2" style={{ textTransform: 'uppercase', fontWeight: 600 }}>Active Vector DB Node</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>Pinecone <span style={{ color: 'var(--success)' }}>[EU-CENTRAL-1]</span></div>
            </div>
            
            <div className="mb-6">
              <div className="text-muted text-sm mb-2" style={{ textTransform: 'uppercase', fontWeight: 600 }}>Embeddings Engine</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>text-embedding-3-small</div>
            </div>

            <div className="mb-6">
              <div className="text-muted text-sm mb-2" style={{ textTransform: 'uppercase', fontWeight: 600 }}>Total Documents Indexed</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>38,401 <span className="text-sm text-muted">chunks</span></div>
            </div>

            <hr style={{ borderColor: 'var(--panel-border)', margin: '24px 0' }} />

            <h4 className="mb-4 text-main" style={{ textTransform: 'uppercase' }}>Indexed Source Material</h4>
            <ul style={{ listStyle: 'none', gap: '12px', display: 'flex', flexDirection: 'column' }}>
              <li className="flex items-center gap-2 text-sm text-muted"><FileText size={16} color="var(--primary)" /> ROCKSTER AIR 2 Specs (PDF)</li>
              <li className="flex items-center gap-2 text-sm text-muted"><FileText size={16} color="var(--primary)" /> ULTIMA 40 Surround Alignments (Docs)</li>
              <li className="flex items-center gap-2 text-sm text-muted"><FileText size={16} color="var(--primary)" /> MOTIV® GO 2 BT Profiles (Excel)</li>
              <li className="flex items-center gap-2 text-sm text-muted"><FileText size={16} color="var(--primary)" /> CONSONO 35 Mk3 Legacy Manual</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
};

export default RAGPipeline;
