import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from '../../../i18n';

interface Suggestion {
  title: string;
  desc: string;
}

interface Message {
  sender: 'user' | 'ia';
  text: string;
  itinerary?: {
    location: string;
    duration: string;
    highlights: string[];
    price: string;
  };
}

const AeriaConcierge: React.FC = () => {
  const { t } = useTranslation();
  const conciergeData = t('Aeria.concierge') as {
    greeting: string;
    label: string;
    status: string;
    addTrip: string;
    typing: string;
    quickQueries: string;
    placeholder: string;
    addedSuccess: string;
    ariaLabel: string;
    suggestions: Array<{ title: string; desc: string }>;
    responses: { [key: string]: { text: string; location: string; duration: string; highlights: string[]; price: string } };
  };
  const [expanded, setExpanded] = useState(false);
  const [query, setQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'ia', text: conciergeData.greeting }
  ]);
  const [showItineraryAdded, setShowItineraryAdded] = useState(false);

  const widgetRef = useRef<HTMLDivElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const suggestions: Suggestion[] = conciergeData.suggestions;

  // Auto-scroll to the end of the chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (widgetRef.current && !widgetRef.current.contains(e.target as Node)) {
        setExpanded(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const triggerIaResponse = (destination: string) => {
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);

      let answer: Message;
      if (destination.toLowerCase().includes('bali')) {
        answer = {
          sender: 'ia',
          text: conciergeData.responses.bali.text,
          itinerary: {
            location: conciergeData.responses.bali.location,
            duration: conciergeData.responses.bali.duration,
            highlights: conciergeData.responses.bali.highlights,
            price: conciergeData.responses.bali.price
          }
        };
      } else if (destination.toLowerCase().includes('kyoto') || destination.toLowerCase().includes('kioto')) {
        answer = {
          sender: 'ia',
          text: conciergeData.responses.kyoto.text,
          itinerary: {
            location: conciergeData.responses.kyoto.location,
            duration: conciergeData.responses.kyoto.duration,
            highlights: conciergeData.responses.kyoto.highlights,
            price: conciergeData.responses.kyoto.price
          }
        };
      } else {
        answer = {
          sender: 'ia',
          text: conciergeData.responses.santorini.text,
          itinerary: {
            location: conciergeData.responses.santorini.location,
            duration: conciergeData.responses.santorini.duration,
            highlights: conciergeData.responses.santorini.highlights,
            price: conciergeData.responses.santorini.price
          }
        };
      }

      setMessages(prev => [...prev, answer]);
    }, 1800);
  };

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { sender: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setQuery('');
    triggerIaResponse(text);
  };

  return (
    <div ref={widgetRef} className="fixed bottom-6 right-6 z-50 font-sans flex flex-col items-end">
      {expanded && (
        <div className="bg-white/95 backdrop-blur-xl rounded-[2rem] shadow-[0_20px_50px_rgba(109,40,217,0.3)] border border-purple-100 p-5 mb-4 w-80 md:w-[360px] max-h-[500px] flex flex-col justify-between overflow-hidden animate-in scale-95 duration-200">

          {/* Concierge Header with animated status dot */}
          <div className="flex items-center justify-between border-b border-purple-50 pb-3 mb-3 shrink-0">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-purple-600 uppercase tracking-[0.2em]">{conciergeData.label}</span>
                <span className="text-[10px] text-neutral-400 font-medium">{conciergeData.status}</span>
              </div>
            </div>
            <button onClick={() => setExpanded(false)} className="text-neutral-400 hover:text-neutral-600 text-sm font-bold">✕</button>
          </div>

          {/* Chat Message History */}
          <div className="flex-1 overflow-y-auto flex flex-col gap-3 pr-1 scrollbar-thin scrollbar-thumb-purple-100 scrollbar-track-transparent">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}>

                {/* Standard Text Bubble */}
                <div className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-purple-600 text-white rounded-tr-none font-medium'
                    : 'bg-neutral-50 text-neutral-800 border border-neutral-100 rounded-tl-none font-medium'
                }`}>
                  {m.text}
                </div>

                {/* Interactive Glass Itinerary Card if present */}
                {m.itinerary && (
                  <div className="mt-2.5 w-full bg-gradient-to-br from-purple-500/5 to-purple-600/10 border border-purple-500/20 rounded-2xl p-4 shadow-xl flex flex-col gap-3">
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col">
                        <span className="text-[10px] tracking-wider uppercase font-extrabold text-purple-600">{m.itinerary.duration}</span>
                        <h5 className="text-sm font-extrabold text-neutral-900">{m.itinerary.location}</h5>
                      </div>
                      <span className="bg-amber-400 text-purple-950 rounded-full px-2.5 py-0.5 font-bold text-[10px] shadow-sm">
                        {m.itinerary.price}
                      </span>
                    </div>

                    <ul className="flex flex-col gap-1.5 border-t border-purple-500/10 pt-2.5">
                      {m.itinerary.highlights.map((h, i) => (
                        <li key={i} className="text-[10px] text-neutral-700 flex items-start gap-1.5 font-medium">
                          <span className="text-purple-500">✦</span> {h}
                        </li>
                      ))}
                    </ul>

                    {/* Add-to-Itinerary button with feedback */}
                    <button
                      onClick={() => {
                        setShowItineraryAdded(true);
                        setTimeout(() => setShowItineraryAdded(false), 2000);
                      }}
                      className="w-full bg-purple-600 hover:bg-purple-700 active:scale-95 text-white font-extrabold text-[10px] uppercase tracking-[0.2em] py-2 rounded-xl transition-all shadow-md mt-1"
                    >
                      {conciergeData.addTrip}
                    </button>
                  </div>
                )}
              </div>
            ))}

            {/* "AI typing..." bubble */}
            {isTyping && (
              <div className="flex items-center gap-1.5 bg-neutral-50 border border-neutral-100 px-3 py-2 rounded-2xl rounded-tl-none self-start">
                <span className="text-[10px] text-neutral-500 font-semibold italic animate-pulse">{conciergeData.typing}</span>
                <div className="flex gap-0.5 items-center">
                  <span className="w-1 h-1 rounded-full bg-neutral-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1 h-1 rounded-full bg-neutral-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1 h-1 rounded-full bg-neutral-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick destination selector at the bottom */}
          {messages.length < 3 && !isTyping && (
            <div className="flex flex-col gap-1.5 border-t border-purple-50 pt-3 mt-3 shrink-0">
              <span className="text-[9px] tracking-[0.2em] uppercase font-bold text-neutral-400 px-1">{conciergeData.quickQueries}</span>
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(s.title)}
                    className="shrink-0 bg-purple-50 hover:bg-purple-100/80 border border-purple-200/40 text-purple-700 px-3 py-1.5 rounded-full text-[10px] font-bold transition-all hover:scale-105"
                  >
                    ✈ {s.title.split(',')[0]}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Message Input Field */}
          <div className="flex gap-2 border-t border-purple-50 pt-3 mt-3 shrink-0">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(query)}
              placeholder={conciergeData.placeholder}
              className="flex-1 border border-neutral-200 rounded-full px-4 py-2 text-xs focus:outline-none focus:border-purple-500 transition-colors bg-neutral-50"
            />
            <button
              onClick={() => handleSendMessage(query)}
              className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center hover:bg-purple-700 transition-all shadow-md shrink-0 active:scale-95"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="translate-x-0.5"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            </button>
          </div>
        </div>
      )}

      {/* Floating Itinerary Added notification */}
      {showItineraryAdded && (
        <div className="fixed bottom-24 right-6 bg-emerald-500 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-2xl border border-emerald-400 flex items-center gap-2 animate-bounce z-50">
          <span className="w-5 h-5 rounded-full bg-white text-emerald-500 flex items-center justify-center font-extrabold text-[10px]">✓</span>
          {conciergeData.addedSuccess}
        </div>
      )}

      {/* Main floating widget button (reacts with scale and rotate) */}
      <button
        onClick={() => setExpanded(!expanded)}
        className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-500 hover:scale-110 active:scale-95 ${
          expanded ? 'bg-neutral-900 text-white rotate-45' : 'bg-purple-600 text-white hover:bg-purple-700'
        }`}
        aria-label={conciergeData.ariaLabel}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="transition-transform">
          {expanded ? (
            <path d="M18 6L6 18M6 6l12 12" />
          ) : (
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          )}
        </svg>
      </button>
    </div>
  );
};

export default AeriaConcierge;