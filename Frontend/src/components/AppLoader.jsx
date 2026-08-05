// frontend/src/components/AppLoader.jsx
import React from 'react';
import Loader from './Loader';

/**
 * AppLoader
 * The full-screen loader shown while the app boots or any top-level
 * resource is being fetched. Always pairs with the static preloader
 * in index.html so there's no white flash.
 *
 * Usage in App.jsx:
 *   const [ready, setReady] = useState(false);
 *   if (!ready) return <AppLoader label="Loading Sangwa…" />;
 */
function AppLoader({ label = 'Loading Sangwa…' }) {
  return (
    <div
      className="min-h-screen bg-[#F8FAFC] flex items-center justify-center"
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <Loader size="lg" label={label} />
    </div>
  );
}

export default AppLoader;
