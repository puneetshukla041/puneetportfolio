import React from 'react';
import Header from '@/components/Header';
import Section1 from '@/components/developer/section1';
import Section2 from '@/components/developer/section2';
import Section3 from '@/components/developer/section3';
import Section4 from '@/components/developer/section4';

const Page = () => {
  return (
    <main className="relative bg-neutral-950 min-h-screen">
      <Header />

      {/* Home */}
      <div id="section-1">
        <Section1 />
      </div>

      {/* Experience */}
      <div id="section-2">
        <Section2 />
      </div>

      {/* Projects (section 3 + section 4 both here) */}
      <div id="section-3">
        <Section3 />
        <Section4 />
      </div>

      {/* placeholder for future hire me section */}
      <div id="section-5" />
    </main>
  );
};

export default Page;
