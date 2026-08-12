// frontend/src/components/LiveChatWidget.jsx
import React, { useEffect, useRef, useState } from 'react';
import {
  FaCommentDots,
  FaTimes,
  FaPaperPlane,
  FaWhatsapp,
  FaCalendarCheck,
  FaPhone,
  FaClock,
} from 'react-icons/fa';
import { useI18n } from '../i18n/I18nProvider';

/**
 * LiveChatWidget
 * Persistent floating chat bubble that opens a panel with:
 *   - Scripted greeting + 4 quick replies (Book, Emergency, Hours, WhatsApp)
 *   - Free-text input that acknowledges and "forwards to a team member"
 *   - A "Continue on WhatsApp" CTA that opens wa.me/250793929136
 *
 * Match V2.0's stack: react-icons, pure Tailwind transitions, no GSAP.
 * Animation is a simple CSS transform/opacity for portability.
 *
 * Mount once globally from App.jsx.
 */
const WHATSAPP_URL = 'https://wa.me/250793929136';

function LiveChatWidget() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: t('chat.greeting'), time: 'now' },
  ]);
  const [input, setInput] = useState('');
  const [hasInteracted, setHasInteracted] = useState(false);
  const scrollRef = useRef(null);
  const panelRef = useRef(null);

  // Quick replies. Order is intentional: WhatsApp last so it shows after
  // a user has already engaged with the bot at least once.
  const quickReplies = [
    { id: 'book', label: t('chat.quick.book'), icon: <FaCalendarCheck /> },
    { id: 'emergency', label: t('chat.quick.emergency'), icon: <FaPhone /> },
    { id: 'hours', label: t('chat.quick.hours'), icon: <FaClock /> },
    { id: 'whatsapp', label: t('chat.quick.whatsapp'), icon: <FaWhatsapp />, external: true },
  ];

  // Response table per quick-reply id. Built inline so we can re-translate
  // on locale change without reloading the panel.
  const botResponses = {
    book: t('chat.resp.book'),
    emergency: t('chat.resp.emergency'),
    hours: t('chat.resp.hours'),
  };

  // Auto-scroll on new message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open]);

  // Reset greeting when language changes so the user immediately sees
  // the new greeting instead of the old one.
  useEffect(() => {
    setMessages([{ from: 'bot', text: t('chat.greeting'), time: 'now' }]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t]);

  const handleQuickReply = (reply) => {
    if (reply.external) {
      // Open WhatsApp in a new tab — the bot still says something so
      // the chat thread doesn't look broken if the user returns.
      window.open(WHATSAPP_URL, '_blank', 'noopener,noreferrer');
      setHasInteracted(true);
      setMessages((m) => [
        ...m,
        { from: 'user', text: reply.label, time: 'now' },
        {
          from: 'bot',
          text: `${t('chat.whatsappCta')} → ${t('chat.whatsappHint')}`,
          time: 'now',
        },
      ]);
      return;
    }
    setHasInteracted(true);
    setMessages((m) => [
      ...m,
      { from: 'user', text: reply.label, time: 'now' },
    ]);
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        { from: 'bot', text: botResponses[reply.id] || t('chat.resp.fallback'), time: 'now' },
      ]);
    }, 600);
  };

  const handleSend = (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setHasInteracted(true);
    setMessages((m) => [...m, { from: 'user', text, time: 'now' }]);
    setInput('');
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        { from: 'bot', text: t('chat.resp.fallback'), time: 'now' },
      ]);
    }, 700);
  };

  return (
    <>
      {/* Bubble. Bottom-right; on mobile leaves room for the sticky
          emergency bar by sitting above it. */}
      <button
        type="button"
        aria-label={t('chat.ariaOpen')}
        onClick={() => setOpen((o) => !o)}
        className={`fixed z-[60] bottom-24 right-4 md:bottom-6 md:right-6 w-14 h-14 rounded-full bg-[#3B6B66] hover:bg-[#2d5450] text-white shadow-2xl shadow-teal-900/30 flex items-center justify-center transition-transform duration-300 ${
          open ? 'scale-90 opacity-0 pointer-events-none' : 'scale-100 opacity-100'
        }`}
      >
        {!open && (
          <span className="absolute inset-0 rounded-full bg-[#3B6B66] animate-ping opacity-25" />
        )}
        <FaCommentDots className="text-2xl relative" />
      </button>

      {/* Panel. Fixed bottom-right, 380px wide on desktop, full-bleed on
          small screens. Slide-up via simple transform on mount. */}
      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label={t('chat.ariaOpen')}
          className="fixed z-[60] inset-x-2 bottom-20 md:inset-auto md:bottom-24 md:right-6 md:w-[380px] h-[560px] max-h-[80vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-[#3B6B66]/15 animate-[chatPop_0.3s_cubic-bezier(0.22,1,0.36,1)_both]"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#3B6B66] to-[#1E6B43] px-5 py-4 text-white flex items-center gap-3 shrink-0">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold">
                SP
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-[#1E6B43]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm truncate">
                {t('chat.headerName')}
              </div>
              <div className="text-xs text-white/80 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                {t('chat.headerStatus')}
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t('chat.ariaClose')}
              className="text-white/80 hover:text-white hover:bg-white/10 p-1.5 rounded-lg transition"
            >
              <FaTimes size={18} />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#F8FAFC]"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={
                    m.from === 'user'
                      ? 'bg-[#3B6B66] text-white rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-[80%] text-sm shadow-sm'
                      : 'bg-white text-[#0F172A] rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-[85%] text-sm shadow-sm border border-gray-100'
                  }
                >
                  {m.text}
                </div>
              </div>
            ))}

            {/* Quick replies appear with the first bot message. They
                re-appear later only if the user keeps them on screen. */}
            {messages.length === 1 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {quickReplies.map((q) => (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => handleQuickReply(q)}
                    className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full transition-colors border ${
                      q.external
                        ? 'text-white bg-[#1E6B43] border-[#1E6B43] hover:bg-[#155a35]'
                        : 'text-[#3B6B66] bg-white border-[#3B6B66]/30 hover:bg-[#3B6B66] hover:text-white'
                    }`}
                  >
                    <span className="text-[11px]">{q.icon}</span>
                    {q.label}
                  </button>
                ))}
              </div>
            )}

            {/* After the first interaction, show a permanent WhatsApp
                call-to-action so the user always has a way to reach a
                human. */}
            {hasInteracted && messages.length > 1 && (
              <div className="pt-2">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-white bg-[#1E6B43] hover:bg-[#155a35] px-3.5 py-2 rounded-full transition-colors"
                >
                  <FaWhatsapp />
                  {t('chat.whatsappCta')}
                </a>
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={handleSend}
            className="border-t border-gray-100 p-3 bg-white flex items-center gap-2 shrink-0"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t('chat.inputPh')}
              aria-label={t('chat.inputPh')}
              className="flex-1 px-3.5 py-2.5 bg-gray-100 rounded-full outline-none text-sm focus:ring-2 focus:ring-[#3B6B66]/30"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              aria-label={t('chat.send')}
              className="w-10 h-10 rounded-full bg-[#3B6B66] text-white flex items-center justify-center disabled:opacity-40 hover:bg-[#2d5450] transition-colors"
            >
              <FaPaperPlane size={14} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default LiveChatWidget;
