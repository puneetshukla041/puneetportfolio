'use client';

import { useEffect, useRef } from 'react';

export default function VisitorTracker() {
  // Prevent React Strict Mode from double-firing in dev
  const hasFired = useRef(false);

  useEffect(() => {
    if (hasFired.current) return;
    hasFired.current = true;

    // 1. Check Session Storage (Resets when tab is closed)
    const hasVisitedSession = sessionStorage.getItem('portfolio_visit_session');

    if (!hasVisitedSession) {
      const updateCount = async () => {
        try {
          // The API automatically detects Device/Browser from headers now
          await fetch('/api/visit', { method: 'POST' });
          
          // 2. Mark this session as visited
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