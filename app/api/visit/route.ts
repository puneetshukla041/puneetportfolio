import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Visitor from '@/models/Visitor';

// --- HELPER: Parse User Agent ---
// This simple function guesses the OS and Browser
const parseUserAgent = (ua: string | null) => {
  if (!ua) return { device: 'Unknown', browser: 'Unknown' };
  
  const uaString = ua.toLowerCase();
  
  // Detect OS (Device)
  let device = 'Desktop';
  if (uaString.includes('android')) device = 'Android';
  else if (uaString.includes('iphone') || uaString.includes('ipad')) device = 'iOS';
  else if (uaString.includes('windows')) device = 'Windows';
  else if (uaString.includes('mac') && !uaString.includes('iphone')) device = 'Mac';
  else if (uaString.includes('linux')) device = 'Linux';

  // Detect Browser
  let browser = 'Unknown';
  if (uaString.includes('chrome') && !uaString.includes('edg')) browser = 'Chrome';
  else if (uaString.includes('safari') && !uaString.includes('chrome')) browser = 'Safari';
  else if (uaString.includes('firefox')) browser = 'Firefox';
  else if (uaString.includes('edg')) browser = 'Edge';

  return { device, browser };
};

// GET Route
export async function GET() {
  try {
    await dbConnect();
    const visitorDoc = await Visitor.findOne({ name: 'portfolio_counter' });
    return NextResponse.json({ 
      count: visitorDoc ? visitorDoc.count : 0,
      recentVisits: visitorDoc ? visitorDoc.recentVisits : []
    }, { headers: { 'Cache-Control': 'no-store, max-age=0' } });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'DB Error' }, { status: 500 });
  }
}

// POST Route
export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    // 1. Get Location (with Localhost fallback)
    let city = req.headers.get('x-vercel-ip-city');
    let country = req.headers.get('x-vercel-ip-country');
    if (!city || !country) { city = 'Gurugram'; country = 'India'; }

    // 2. NEW: Get Device & Browser info
    const userAgent = req.headers.get('user-agent');
    const { device, browser } = parseUserAgent(userAgent);

    // 3. Update DB
    const updatedVisitor = await Visitor.findOneAndUpdate(
      { name: 'portfolio_counter' },
      { 
        $inc: { count: 1 },
        $push: { 
          recentVisits: { 
            // Save the new fields here
            $each: [{ city, country, device, browser, date: new Date() }], 
            $position: 0, 
            $slice: 50 
          } 
        }
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    return NextResponse.json({ success: true, count: updatedVisitor.count });
  } catch (error) {
    console.error("DB Error:", error);
    return NextResponse.json({ success: false, error: 'DB Error' }, { status: 500 });
  }
}