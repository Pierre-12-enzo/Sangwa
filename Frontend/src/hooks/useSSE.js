// src/hooks/useSSE.js
import { useEffect, useRef, useState } from 'react';

/**
 * Build the SSE URL robustly — never double-prefixes /api.
 */
function buildEventsUrl(channels, token) {
    // Prefer explicit env var; fall back to current origin (so Vite proxy handles it in dev)
    const rawBase = import.meta.env.VITE_API_URL || '';

    // If we have a full URL, use it; otherwise hit current origin and let Vite proxy handle /api
    let base;
    if (rawBase) {
        // Strip any trailing slash and any trailing /api
        base = rawBase.replace(/\/+$/, '').replace(/\/api$/, '');
    } else {
        base = '';
    }

    const path = `/api/events?channels=${encodeURIComponent(channels)}&token=${encodeURIComponent(token)}`;
    return `${base}${path}`;
}

/**
 * useSSE — subscribes to a Server-Sent Events stream.
 *
 * @param {string|null} channels - Comma-separated channel list
 * @param {object} handlers - { onOpen, onError, onEvent: (eventName, data) => {} }
 * @param {object} options - { enabled: boolean }
 */
export function useSSE(channels, handlers = {}, options = {}) {
    const { enabled = true } = options;
    const [status, setStatus] = useState('idle');
    const handlersRef = useRef(handlers);
    const sourceRef = useRef(null);

    // Keep latest handlers without re-triggering effect
    useEffect(() => {
        handlersRef.current = handlers;
    });

    useEffect(() => {
        if (!enabled || !channels) {
            setStatus('idle');
            return;
        }

        const token = localStorage.getItem('sangwa_token');
        if (!token) {
            setStatus('error');
            return;
        }

        const url = buildEventsUrl(channels, token);
        console.log('🔌 SSE connecting to:', url); // 👈 helpful for debugging

        setStatus('connecting');
        const source = new EventSource(url, { withCredentials: true });
        sourceRef.current = source;

        source.onopen = () => {
            setStatus('open');
            handlersRef.current.onOpen?.();
        };

        source.onerror = (err) => {
            setStatus('error');
            handlersRef.current.onError?.(err);
        };

        const namedEvents = [
            'connected',
            'queue:changed',
            'booking:confirmed',
            'booking:cancelled'
        ];
        namedEvents.forEach((name) => {
            source.addEventListener(name, (event) => {
                let data = event.data;
                try {
                    data = JSON.parse(event.data);
                } catch { }
                handlersRef.current.onEvent?.(name, data);
            });
        });

        source.onmessage = (event) => {
            let data = event.data;
            try {
                data = JSON.parse(event.data);
            } catch { }
            handlersRef.current.onEvent?.('message', data);
        };

        return () => {
            source.close();
            sourceRef.current = null;
            setStatus('closed');
        };
    }, [channels, enabled]);

    const close = () => {
        sourceRef.current?.close();
        setStatus('closed');
    };

    return { status, close };
}

export default useSSE;