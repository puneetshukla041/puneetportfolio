'use client';

import { useEffect, useRef } from 'react';

export default function VisitorTracker() {
  const hasFired = useRef(false);

  useEffect(() => {
    // Prevent double-firing in dev mode
    if (hasFired.current) return;
    hasFired.current = true;

    // Check if session already counted
    if (sessionStorage.getItem('portfolio_visit_session')) return;

    const trackVisit = async () => {
      let exactLocation = null;

      // --- STEP 1: Ask for GPS Permission ---
      if ('geolocation' in navigator) {
        try {
          // This triggers the browser popup: "Allow / Block"
          const position = await new Promise<GeolocationPosition>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 4000 });
          });

          const { latitude, longitude } = position.coords;

          // --- STEP 2: Convert GPS to City Name ---
          // Use free API to turn coords -> "Gurugram"
          const geoRes = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          );
          const geoData = await geoRes.json();
          
          if (geoData.city) {
            exactLocation = {
              city: geoData.city,                  // e.g. Gurugram
              country: geoData.countryName,        // e.g. India
              region: geoData.principalSubdivision // e.g. Haryana
            };
          }
        } catch (e) {
          // User clicked "Block" or GPS failed. 
          // We ignore this and let the backend use IP address instead.
          console.log('GPS denied or failed, falling back to IP.');
        }
      }

      // --- STEP 3: Send Data to Backend ---
      try {
        await fetch('/api/visit', { 
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            // Send the precise location if we have it (otherwise null)
            manualLocation: exactLocation 
          }) 
        });
        
        // Mark session as visited
        sessionStorage.setItem('portfolio_visit_session', 'true');
      } catch (error) {
        console.error('Tracking error:', error);
      }
    };

    trackVisit();
  }, []);

  return null;
}