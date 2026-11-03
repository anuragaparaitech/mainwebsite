import { useEffect, useRef, useState } from 'react';
import useEscape from '../hooks/useEscape';
import { SUGGESTED_QUERIES, getReply } from '../services/chat';

const BOT_BUBBLE = "bg-surface-container-low p-4 rounded border border-outline-variant/30 text-on-surface font-body-md text-body-md";
const USER_BUBBLE =
  'ml-auto max-w-[85%] bg-secondary text-on-secondary p-4 rounded font-body-md text-body-md';

export default function ChatDrawer({ open, onClose }) {
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState('');
  const [busy, setBusy] = useState(false);
  const endRef = useRef(null);
  const inputRef = useRef(null);

  useEscape(onClose, open);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, busy]);

  const send = async (text) => {
    const message = text.trim();
    if (!message || busy) return;
    setMessages((m) => [...m, { role: 'user', text: message }]);
    setDraft('');
    setBusy(true);
    try {
      const reply = await getReply(message);
      setMessages((m) => [...m, { role: 'bot', text: reply }]);
    } finally {
      setBusy(false);
    }
  };

  return (
    <aside
      className={`fixed inset-y-0 right-0 z-50 w-full sm:w-[420px] bg-surface-container-lowest border-l border-outline-variant/40 shadow-2xl flex flex-col justify-between transform transition-transform duration-300 ease-in-out ${open ? '' : 'translate-x-full'}`}
      id="ai-agent-drawer"
      aria-hidden={!open}
      aria-label="AparaiTech AI Agent chat"
    >
      <div className="p-6 border-b border-outline-variant/30 flex items-center justify-between bg-surface-container-low/60">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded bg-secondary text-on-secondary flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px]">
              smart_toy
            </span>
          </div>
          <div>
            <h3 className="font-title-md text-title-md text-on-surface">
              AparaiTech AI Agent
            </h3>
            <p className="font-mono-tag text-mono-tag text-on-surface-variant">
              Enterprise Technical Assistant
            </p>
          </div>
        </div>
        <button aria-label="Close Chat" className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors" onClick={onClose} type="button">
          <span className="material-symbols-outlined text-[20px]">
            close
          </span>
        </button>
      </div>
      <div className="flex-1 p-6 overflow-y-auto space-y-4">
        <div className="bg-surface-container-low p-4 rounded border border-outline-variant/30 text-on-surface font-body-md text-body-md">
          <p>
            Greetings. I am AparaiTech's Enterprise Solutions AI. How may I assist your engineering evaluation or platform queries today?
          </p>
        </div>
        {messages.map((m, i) => (
          <div key={i} className={m.role === 'user' ? USER_BUBBLE : BOT_BUBBLE}>
            <p>{m.text}</p>
          </div>
        ))}
        {busy && (
          <div className={BOT_BUBBLE} aria-live="polite">
            <p>Typing…</p>
          </div>
        )}
        <div className="space-y-2 pt-2">
          <p className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">
            Suggested Queries
          </p>
          <div className="flex flex-wrap gap-2">
            {SUGGESTED_QUERIES.map((q) => (
              <button
                key={q}
                className="px-3 py-1.5 rounded-full border border-secondary text-secondary font-body-sm text-body-sm hover:bg-surface-container-low transition-colors"
                type="button"
                onClick={() => send(q)}
              >
                {q}
              </button>
            ))}
          </div>
        </div>
        <div ref={endRef} />
      </div>
      <div className="p-4 border-t border-outline-variant/30 bg-surface-container-lowest">
        <form
          className="flex items-center gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            send(draft);
          }}
        >
          <input
            ref={inputRef}
            className="flex-1 px-4 py-2.5 rounded bg-surface border border-outline-variant text-on-surface font-body-sm text-body-sm focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary"
            placeholder="Type enterprise query..."
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            aria-label="Type your question"
          />
          <button className="w-10 h-10 rounded bg-secondary text-on-secondary flex items-center justify-center hover:bg-secondary-container transition-colors" type="submit" aria-label="Send message">
            <span className="material-symbols-outlined text-[18px]">
              send
            </span>
          </button>
        </form>
      </div>
    </aside>
  );
}
