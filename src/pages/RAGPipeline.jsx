import React, { useState, useRef, useEffect } from 'react';
import Header from '../components/Header';
import { Send, Database, FileText, ArrowRight, BrainCircuit, ShieldCheck, Box } from 'lucide-react';

const RAGPipeline = () => {
  const [messages, setMessages] = useState([
    { role: 'ai', content: 'SYSTEM READY: Secure connection established to Teufel Product Database. You can query technical manuals or spec sheets (e.g. ULTIMA 40 Surround, ROCKSTER AIR 2).', context: null }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input;
    setMessages(prev => [...prev, { role: 'user', content: userText, context: null }]);
    setInput('');
    setIsTyping(true);

    // Mock dynamic response generator based on input keywords
    setTimeout(() => {
      let aiResponseText = '';
      let contextBlocks = [];

      if (userText.toLowerCase().includes('ultima')) {
        aiResponseText = `Based on the internal documentation for the ULTIMA 40 Surround "5.1-Set", the system features 3-way floorstanding speakers with a continuous power handling of 120W per channel. It is fully compatible with any standard AV receiver.`;
        contextBlocks = [
          { score: 0.98, source: 'ULTIMA_40_Surround_Specs.pdf', snippet: 'Power handling: 120 Watts continuous, 200 Watts peak. 3-way system.' },
          { score: 0.92, source: 'Teufel_Product_Specs_Q3.xlsx', snippet: 'AV Receiver compatibility: 4-8 Ohm impedance rating guaranteed.' }
        ];
      } else if (userText.toLowerCase().includes('consono')) {
        aiResponseText = `The CONSONO 35 Mk3 operates efficiently with a crossover frequency of 150 Hz. The included subwoofer handles everything below that range for seamless deep bass up to 43 Hz.`;
        contextBlocks = [
          { score: 0.94, source: 'CONSONO_35_Mk3_Manual.pdf', snippet: 'Satellite crossover frequency must be set to 150 Hz at the receiver.' }
        ];
      } else {
        aiResponseText = `Based on the internal documentation for the ROCKSTER Series, the Bluetooth module supports Bluetooth 5.0 with aptX® and aptX® HD for high-resolution audio streaming. The swappable battery guarantees up to 58 hours of playtime at medium volume settings.`;
        contextBlocks = [
          { score: 0.96, source: 'ROCKSTER_AIR_2_Manual_v3.pdf', snippet: 'Battery performance: Up to 58 hours of playtime at medium volume (approx. 65 dB). High power swappable LiFePO4 battery.' },
          { score: 0.89, source: 'Teufel_Product_Specs_Q3.xlsx', snippet: 'Connectivity: Bluetooth 5.0 integrated circuit supporting SBC, AAC, aptX®, and aptX® HD.' }
        ];
      }

      setMessages(prev => [...prev, { 
        role: 'ai', 
        content: aiResponseText, 
        context: contextBlocks
      }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="main-content">
      <Header title="Secure RAG Pipeline / Knowledge Base" />
      <div className="page-container" style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - var(--header-height))', padding: '32px' }}>
        
        {/* Architecture Diagram */}
        <div className="glass-panel mb-6" style={{ padding: '20px' }}>
          <div className="text-muted text-sm mb-4" style={{ fontWeight: 600, textTransform: 'uppercase' }}>System Architecture Flow</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: '0 20px', overflowX: 'auto' }}>
            
            <div className="flex flex-col items-center gap-2">
              <div className="avatar" style={{ background: 'rgba(255,255,255,0.1)' }}><Box size={20} color="var(--primary)" /></div>
              <span className="text-sm" style={{ fontWeight: 600 }}>Teufel Data</span>
            </div>
            
            <ArrowRight size={20} className="text-muted" />
            
            <div className="flex flex-col items-center gap-2">
              <div className="avatar" style={{ background: 'rgba(255,255,255,0.1)' }}><Database size={20} color="var(--accent-blish)" /></div>
              <span className="text-sm" style={{ fontWeight: 600 }}>Embeddings & VectorDB</span>
            </div>
            
            <ArrowRight size={20} className="text-muted" />

            <div className="flex flex-col items-center gap-2">
              <div className="avatar" style={{ background: 'rgba(255,255,255,0.1)' }}><ShieldCheck size={20} color="var(--success)" /></div>
              <span className="text-sm" style={{ fontWeight: 600 }}>MCP / UCP Context</span>
            </div>

            <ArrowRight size={20} className="text-muted" />
            
            <div className="flex flex-col items-center gap-2">
              <div className="avatar" style={{ background: 'rgba(255,255,255,0.1)' }}><BrainCircuit size={20} color="var(--primary)" /></div>
              <span className="text-sm" style={{ fontWeight: 600 }}>LLM Generation</span>
            </div>

            <ArrowRight size={20} className="text-muted" />

            <div className="flex flex-col items-center gap-2">
              <div className="avatar" style={{ background: 'rgba(255,255,255,0.1)' }}><FileText size={20} color="#f9fafb" /></div>
              <span className="text-sm" style={{ fontWeight: 600 }}>Response</span>
            </div>

          </div>
        </div>

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
                  <span style={{ color: 'var(--primary)', fontWeight: 600 }}>[SYS]</span> Querying Model Context Protocol (MCP)... Extracting embeddings...
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            
            <form onSubmit={handleSend} className="chat-input-area border-t" style={{ borderColor: 'var(--panel-border)' }}>
              <input 
                type="text" 
                className="chat-input"
                placeholder="Query: How long is the battery life of the ROCKSTER AIR 2?"
                value={input}
                onChange={e => setInput(e.target.value)}
              />
              <button type="submit" className="btn btn-primary" disabled={isTyping || !input.trim()}><Send size={18} /></button>
            </form>
          </div>

          <div className="glass-panel" style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
            <h3 className="mb-4 text-main flex items-center gap-2" style={{ textTransform: 'uppercase' }}><Database size={20} /> Pipeline Telemetry</h3>
            
            <div className="mb-6">
              <div className="text-muted text-sm mb-2" style={{ textTransform: 'uppercase', fontWeight: 600 }}>Active Protocols</div>
              <div className="flex gap-2 mb-2">
                <span className="badge badge-success">MCP Enabled</span>
                <span className="badge badge-success">UCP Compliant</span>
              </div>
              <div className="text-muted" style={{ fontSize: '0.75rem', lineHeight: 1.5 }}>
                The Model Context Protocol (MCP) securely bridges the prompt with live internal Teufel data sources. Overlaid with the Universal Control Plane (UCP) for precise data residency and access audits.
              </div>
            </div>

            <hr style={{ borderColor: 'var(--panel-border)', margin: '24px 0' }} />
            
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
          </div>
        </div>

      </div>
    </div>
  );
};

export default RAGPipeline;
