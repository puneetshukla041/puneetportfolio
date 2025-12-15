// components/VisitorTracker.tsx
'use client';

import { useEffect, useRef } from 'react';

export default function VisitorTracker() {
  // Check to ensure we don't fire twice in React Strict Mode (Development)
  const hasFired = useRef(false);

  useEffect(() => {
    if (hasFired.current) return;
    hasFired.current = true;

    // 1. Use sessionStorage instead of localStorage.
    //    localStorage = Remembers FOREVER (Blocks you even after DB reset).
    //    sessionStorage = Remembers only for this TAB.
    const hasVisitedSession = sessionStorage.getItem('portfolio_visit_session');

    if (!hasVisitedSession) {
      const updateCount = async () => {
        try {
          await fetch('/api/visit', { method: 'POST' });
          
          // 2. Mark this SPECIFIC TAB as visited.
          //    If the user closes the tab and comes back -> It counts as a new visit.
          sessionStorage.setItem('portfolio_visit_session', 'true');
        } catch (error) {
          console.error('Tracking error:', error);
        }
      };

      updateCount();
    }
  }, []);

  return null;
}