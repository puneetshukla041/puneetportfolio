import React from 'react';
import Header from '@/components/Header';
import Section1 from '@/components/developer/section1';
import Section2 from '@/components/developer/section2';
import Section3 from '@/components/developer/section3';
const Page = () => {
  return (
    <main className="relative bg-neutral-950 min-h-screen">
      <Header />

      {/* Home Section -> Maps to Header "Home" */}
      
      <div id="section-1">
        <Section1 />
      </div>

      {/* Experience Section -> Maps to Header "Experience" */}
      <div id="section-2">
        <Section2 />
      </div>
       <Section3 />
      {/* Placeholder IDs for future sections to prevent errors if clicked
          (You can replace these divs with the actual components later) */}
      <div id="section-3" /> {/* Projects */}
      <div id="section-4" /> {/* Skills */}
      <div id="section-5" /> {/* Hire Me */}
   
    </main>
  );
};

export default Page;