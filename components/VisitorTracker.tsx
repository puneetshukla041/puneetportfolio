// components/VisitorTracker.tsx
'use client';

import { useEffect } from 'react';

export default function VisitorTracker() {
  useEffect(() => {
    // 1. Check if this browser has visited before
    const hasVisited = localStorage.getItem('portfolio_visit_v1');

    if (!hasVisited) {
      // 2. If NO flag, call the API
      const updateCount = async () => {
        try {
          await fetch('/api/visit', { method: 'POST' });
          // 3. Set the flag so we don't count this device again
          localStorage.setItem('portfolio_visit_v1', 'true');
        } catch (error) {
          console.error('Tracking error:', error);
        }
      };

      updateCount();
    }
  }, []);

  return null; // This component is invisible
}