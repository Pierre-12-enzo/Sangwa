// frontend/src/components/Loader.jsx
import React from 'react';

/**
 * Loader
 * Sangwa-branded loader built around an animated ECG/heartbeat line.
 * The trace draws itself left → right, then loops. A small heart at
 * the leading edge pulses on each loop, giving a literal "heartbeat"
 * that ties to the "Modern Medicine with a Compassionate Heart"
 * tagline — without leaning on the generic medical-cross cliché.
 *
 * Sizes:
 *   - sm  (40px tall)   inline / button
 *   - md  (88px tall)   section / card
 *   - lg  (140px tall)  full-screen boot
 *
 * fullScreen mode wraps the trace in a blurred dimmed page overlay
 * for blocking operations.
 */

const HEIGHTS = { sm: 40, md: 88, lg: 140 };
const STROKE = { sm: 2, md: 3, lg: 4 };
const HEART = { sm: 8, md: 14, lg: 22 };

// A normalized ECG path. The QRS spike sits roughly 60% across, with a
// gentle P-wave before it and a soft T-wave after. The viewBox handles
// all sizing, so this path works at every size without math.
const ECG_PATH =
  'M 0 30 ' +
  'L 18 30 ' +
  'L 24 22 ' +
  'L 30 30 ' +
  'L 48 30 ' +
  'L 54 8 ' +
  'L 60 52 ' +
  'L 66 18 ' +
  'L 72 30 ' +
  'L 100 30';

function Loader({ size = 'md', fullScreen = false, label = 'Loading…' }) {
  const h = HEIGHTS[size] ?? HEIGHTS.md;
  const stroke = STROKE[size] ?? STROKE.md;
  const heart = HEART[size] ?? HEART.md;
  const id = React.useId();
  const gradId = `loader-grad-${id}`;
  const pathId = `loader-path-${id}`;

  // Two paths stacked:
  // 1. A faint static "track" line — the resting heart rhythm
  // 2. The bright animated "pulse" line that traces over it
  // Plus a heart that travels with the leading edge of the pulse.
  const trace = (
    <div
      role="status"
      aria-live="polite"
      aria-label={label}
      className="inline-flex flex-col items-center gap-4"
    >
      <div
        className="loader-stage"
        style={{ width: h * 3.2, height: h }}
      >
        <svg
          viewBox="0 0 100 60"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 w-full h-full"
        >
          <defs>
            <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3B6B66" />
              <stop offset="60%" stopColor="#1E6B43" />
              <stop offset="100%" stopColor="#E06D20" />
            </linearGradient>
          </defs>

          {/* Faint resting line */}
          <path
            d={ECG_PATH}
            fill="none"
            stroke="#3B6B66"
            strokeWidth={stroke * 0.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.18"
          />

          {/* Animated pulse line — traced via stroke-dasharray */}
          <path
            id={pathId}
            d={ECG_PATH}
            fill="none"
            stroke={`url(#${gradId})`}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="loader-trace"
            pathLength="100"
            strokeDasharray="100"
            strokeDashoffset="100"
          />
        </svg>

        {/* Heart that travels with the leading edge of the trace.
            Its x-position is keyed off the same 1.6s animation. */}
        <div
          className="loader-heart"
          style={{
            width: heart,
            height: heart,
            top: '50%',
            marginTop: -heart / 2,
            fontSize: heart,
            lineHeight: 1,
          }}
          aria-hidden="true"
        >
          {/* Heart shape built from two divs for color control */}
          <span className="loader-heart__shape" />
        </div>
      </div>

      {label && size !== 'sm' && (
        <p className="text-sm font-semibold text-[#0F172A]/70 tracking-wide">
          {label}
        </p>
      )}
    </div>
  );

  if (!fullScreen) return trace;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#F8FAFC]/85 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={label}
    >
      {trace}
    </div>
  );
}

export default Loader;
