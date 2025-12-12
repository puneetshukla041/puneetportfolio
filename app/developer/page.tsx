// app/developer/page.tsx
import React from 'react';
import Header from '@/components/Header';
import Section1 from '@/components/developer/section1';
import Section2 from '@/components/developer/section2';
import Section3 from '@/components/developer/section3';
import Section4 from '@/components/developer/section4';
// Importing based on your variable naming convention
import Section5 from '@/components/developer/section6'; 
import Section6 from '@/components/developer/section5';

// Import the tracker
import VisitorTracker from '@/components/VisitorTracker';

const Page = () => {
  return (
    <main className="relative bg-black min-h-screen">
      {/* Tracker runs invisibly in the background */}
      <VisitorTracker />
      
      <Header />

      {/* Home */}
      <div id="section-1">
        <Section1 />
      </div>

      {/* Experience */}
      <div id="section-2">
        <Section2 />
      </div>

      {/* Skills */}
      <div id="section-3">
        <Section3 />
      </div>

      {/* Projects - Part 1 */}
      <div id="section-4">
        <Section4 />
      </div>

      {/* Projects - Part 2 */}
      <div id="section-5">
        <Section5 />
      </div>

      {/* Hire Me */}
      <div id="section-6">
        <Section6 />
      </div>
    </main>
  );
};

export default Page;