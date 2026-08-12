// frontend/src/components/ScrollToTop.jsx
import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';

function ScrollToTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setVisible(window.scrollY > 400);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    if (!visible) return null;

    return (
        <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-24 md:bottom-20 right-4 md:right-6 z-40 w-12 h-12 rounded-full bg-[#3B6B66] text-white shadow-lg hover:bg-[#2d5450] transition-all duration-300 hover:scale-105 flex items-center justify-center"
            aria-label="Back to top"
        >
            <FaArrowUp className="text-sm" />
        </button>
    );
}

export default ScrollToTop;